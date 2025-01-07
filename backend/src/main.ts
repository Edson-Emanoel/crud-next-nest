import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { pessoaFilterNomeExists } from './pessoa/filters/filterPessoaNomeExists';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalFilters(
    new pessoaFilterNomeExists
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
