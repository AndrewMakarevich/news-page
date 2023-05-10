import { Inject } from '@nestjs/common';
import { NODEMAILER_TRANSPORTER_PROVIDER_NAME } from '../nodemailer.const';
import { Transporter, SendMailOptions } from 'nodemailer';

export class NodeMailerService {
  constructor(
    @Inject(NODEMAILER_TRANSPORTER_PROVIDER_NAME)
    private nodemailerTransporter: Transporter,
  ) {}

  sendMail(options: SendMailOptions) {
    this.nodemailerTransporter.sendMail(options);
  }
}
