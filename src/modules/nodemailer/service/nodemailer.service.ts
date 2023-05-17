import { Inject, InternalServerErrorException } from '@nestjs/common';
import { NODEMAILER_TRANSPORTER_PROVIDER_NAME } from '../nodemailer.const';
import { Transporter, SendMailOptions } from 'nodemailer';

export class NodeMailerService {
  constructor(
    @Inject(NODEMAILER_TRANSPORTER_PROVIDER_NAME)
    private nodemailerTransporter: Transporter,
  ) {}

  sendMail(options: SendMailOptions) {
    return this.nodemailerTransporter.sendMail(options).catch((err) => {
      throw new InternalServerErrorException(
        `Can't send activation letter. Details: ${err.message}`,
      );
    });
  }
}
