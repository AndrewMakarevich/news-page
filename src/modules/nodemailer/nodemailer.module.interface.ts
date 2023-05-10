import SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface ICreateTransportParameters {
  transport?: string | SMTPTransport | SMTPTransport.Options;
  defaults?: SMTPTransport.Options;
}
