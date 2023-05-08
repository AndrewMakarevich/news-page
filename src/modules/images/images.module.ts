import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Images } from './model/images.model';
import { ImagesController } from './controller/images.controller';
import { ImagesService } from './service/images.service';
import { ImagesRepository } from './repository/images.repository';

@Module({
  imports: [SequelizeModule.forFeature([Images])],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesRepository],
})
export class ImagesModule {}
