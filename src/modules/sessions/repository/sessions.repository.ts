import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sessions } from '../model/sessions.model';

@Injectable()
export class SessionsRepository {
  constructor(@InjectModel(Sessions) private SessionsModel: Sessions) {
  }

  addSession(){
    
  }
}
