import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { PessoaModule } from './pessoa/pessoa.module';

@Module({
  imports: [DbModule, PessoaModule],
  controllers: [],
  providers: [],
})

export class AppModule {}