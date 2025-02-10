import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';

@Module({
  imports: [DbModule],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule {}