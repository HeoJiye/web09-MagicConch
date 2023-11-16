import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { ChatService } from './chat.service';
import { ChattingMessageResponseDto } from './dto/chatting-messag-response.dto';
import { ChattingRoomResponseDto } from './dto/chatting-room-response.dto';
import { CreateChattingMessageDto } from './dto/create-chatting-message.dto';
import { UpdateChattingRoomDto } from './dto/update-chatting-room.dto';

@UseGuards(AuthGuard)
@Controller('chat')
@ApiTags('✅Chatting API')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('ai')
  @ApiOperation({ summary: '채팅방 목록 조회 API' })
  @ApiOkResponse({
    description: '채팅방 목록 조회 성공',
    type: [ChattingRoomResponseDto],
  })
  @ApiUnauthorizedResponse({ description: '인증 받지 않은 사용자' })
  async findRooms(@Req() req: Request): Promise<ChattingRoomResponseDto[]> {
    return await this.chatService.findRoomsById(req.cookies.magicConch);
  }

  @Get('ai/:id')
  @ApiOperation({ summary: '채팅 메시지 목록 조회 API' })
  @ApiParam({ type: 'uuid', name: 'id' })
  @ApiOkResponse({
    description: '채팅 메시지 목록 조회 성공',
    type: [ChattingMessageResponseDto],
  })
  @ApiUnauthorizedResponse({ description: '인증 받지 않은 사용자' })
  async findMessages(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ChattingMessageResponseDto[]> {
    return await this.chatService.findMessagesById(id);
  }

  @Post('ai/:id')
  @ApiOperation({ summary: '채팅 메시지 생성 API' })
  @ApiParam({ type: 'uuid', name: 'id' })
  @ApiBody({ type: [CreateChattingMessageDto] })
  @ApiOkResponse({ description: '채팅 메시지 생성 성공' })
  @ApiUnauthorizedResponse({ description: '인증 받지 않은 사용자' })
  @ApiInternalServerErrorResponse()
  async createMessages(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() CreateChattingMessageDto: CreateChattingMessageDto[],
  ): Promise<void> {
    return await this.chatService.createMessage(id, CreateChattingMessageDto);
  }

  @Patch('ai/:id')
  @ApiOperation({ summary: '채팅방 제목 수정 API' })
  @ApiParam({ type: 'uuid', name: 'id' })
  @ApiBody({ type: UpdateChattingRoomDto })
  @ApiOkResponse({ description: '채팅방 제목 수정 성공' })
  @ApiNotFoundResponse({ description: '존재하지 않는 채팅방 ID' })
  @ApiInternalServerErrorResponse()
  async updateRoom(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateChattingRoomDto: UpdateChattingRoomDto,
  ): Promise<void> {
    await this.chatService.updateRoom(id, updateChattingRoomDto);
  }

  @Delete('ai/:id')
  @ApiOperation({ summary: '채팅방 삭제 API' })
  @ApiParam({ type: 'uuid', name: 'id' })
  @ApiOkResponse({ description: '채팅방 삭제 성공' })
  @ApiInternalServerErrorResponse()
  async removeRoom(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.chatService.removeRoom(id);
  }
}
