import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { ConversationsGateway } from './conversations.gateway';

@Module({
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationsGateway],
})
export class ConversationsModule {}
