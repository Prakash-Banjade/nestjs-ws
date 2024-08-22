import { Injectable } from '@nestjs/common';
import { UpdateConversationDto } from './dto/update-conversation.dto';

type Conversation = {
  id: number;
}

@Injectable()
export class ConversationsService {
  conversations: Conversation[] = [];

  create() {
    const newConversation: Conversation = {
      id: this.conversations.length + 1,
    }

    this.conversations = [...this.conversations, newConversation];

    return newConversation;
  }

  findAll() {
    return `This action returns all conversations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
