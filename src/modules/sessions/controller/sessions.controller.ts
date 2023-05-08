import { Controller } from '@nestjs/common';
import { SessionsService as SessionsServiceClass } from '../service/sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private SessionsService: SessionsServiceClass) {}
}
