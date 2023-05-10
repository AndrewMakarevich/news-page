import { Module, DynamicModule } from '@nestjs/common';
import { createTransport, TransportOptions } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { NODEMAILER_TRANSPORTER_PROVIDER_NAME } from './nodemailer.const';
import { ICreateTransportParameters } from './nodemailer.module.interface';
import { NodeMailerService } from './service/nodemailer.service';

@Module({ providers: [NodeMailerService], exports: [NodeMailerService] })
export class NodeMailerModule {
  static forRoot({
    transport,
    defaults,
  }: ICreateTransportParameters): DynamicModule {
    return {
      module: NodeMailerModule,
      global: true,
      providers: [
        NodeMailerService,
        {
          provide: NODEMAILER_TRANSPORTER_PROVIDER_NAME,
          useFactory: async () => {
            return createTransport(transport, defaults);
          },
        },
      ],
    };
  }
}
