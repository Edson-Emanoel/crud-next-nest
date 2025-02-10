import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [DbModule, PessoaModule, CategoriaModule],
  controllers: [],
  providers: [],
})

export class AppModule {}