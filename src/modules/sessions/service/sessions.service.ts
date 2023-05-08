import { Injectable } from '@nestjs/common';
import { SessionsRepository as SessionsRepositoryClass } from '../repository/sessions.repository';

@Injectable()
export class SessionsService {
  constructor(private SessionsRepository: SessionsRepositoryClass) {}
}
