import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { errorPessoaNome } from "../errors/errorPessoaExists";
import { Response } from "express";

@Catch(errorPessoaNome)
export class pessoaFilterNomeExists implements ExceptionFilter{
      catch(exception: any, host: ArgumentsHost) {
          const ctx = host.switchToHttp();
          const res = ctx.getResponse<Response>();

          res.status(409).json({
            statusCode: 409,
            message: exception.message
          })
      }

}