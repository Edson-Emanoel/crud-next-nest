import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { errorNotFound } from 'src/errors/errorNotFound';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { errorPessoaNome } from './errors/errorPessoaExists';

@Injectable()
export class PessoaService {
  constructor(private readonly prismaService: PrismaService){}

  async create(createPessoaDto: CreatePessoaDto) {

    const pessoaExiste = await this.prismaService.pessoa.findUnique({
      where: { nome: createPessoaDto.nome }
    })

    if(pessoaExiste){
      throw new errorPessoaNome(createPessoaDto.nome)
    }

    return this.prismaService.pessoa.create({
      data: createPessoaDto
    });
  }

  findAll() {
    return this.prismaService.pessoa.findMany();
  }

  async findOne(id: number) {
    const pessoa = await this.prismaService.pessoa.findUnique({
      where: { id }
    })

    if(!pessoa){
      throw new errorNotFound('Pessoa', 'id', id)
    }

    return this.prismaService.pessoa.findUnique({
      where: { id }
    });
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {

    const pessoa = await this.prismaService.pessoa.findUnique({
      where: { id }
    })

    if(!pessoa){
      throw new errorNotFound('Pessoa', 'id', id)
    }

    return this.prismaService.pessoa.update({
      where: { id },
      data: updatePessoaDto
    });
  }

  async remove(id: number) {

    const pessoa = await this.prismaService.pessoa.findUnique({
      where: { id }
    })

    if(!pessoa){
      throw new errorNotFound('Pessoa', 'id', id)
    }

    return this.prismaService.pessoa.delete({
      where: {id}
    });
  }
}