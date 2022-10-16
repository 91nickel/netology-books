import {
    Controller,
    Body, Query, Param,
    HttpException,
    Delete, Get, Patch, Post, Render, Res, Req, Put,
}                                        from '@nestjs/common';
import { SupportRequestService }         from "./support-request.service";
import { SupportRequestClientService }   from "./support-request-client.service";
import { SupportRequestEmployeeService } from "./support-request-employee.service";
import {
    CreateSupportRequestDto, ListSupportRequestsDto, MarkAsReadMessagesDto, SendMessageDto
}                                        from "./dto/support-request.dto";

@Controller()
export class SupportRequestController {

    constructor(
        private readonly supportRequestService: SupportRequestService,
        private readonly supportRequestClientService: SupportRequestClientService,
        private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
    ) {
    }

    @Get('api/client/support-requests/')
    getSupportRequestsFromClient(@Query() query: Pick<ListSupportRequestsDto, 'limit' | 'offset' | 'isActive'>) {
        /*
        TODO: ��������� ������������ � ����� client �������� ������ ��������� ��� �������� ������������.
            ������ ������
            [
              {
                "id": string,
                "createdAt": string,
                "isActive": boolean,
                "hasNewMessages": boolean
              }
            ]
            �������� ������ ������������� � ����� client.
            401 - ���� ������������ �� ����������������;
            403 - ���� ���� ������������ �� ��������.
        */
        console.log('SupportRequestController.getSupportRequestsFromClient', query);
        return `SupportRequestController.getSupportRequestsFromClient(${JSON.stringify(query)})`;
    }

    @Get('api/manager/support-requests/')
    getSupportRequestsFromManager(@Query() query: Pick<ListSupportRequestsDto, 'limit' | 'offset' | 'isActive'>) {
        /*
        TODO: ��������� ������������ � ����� manager �������� ������ ��������� �� ��������.
            ������ ������
            [
              {
                "id": string,
                "createdAt": string,
                "isActive": boolean,
                "hasNewMessages": boolean,
                "client": {
                  "id": string,
                  "name": string,
                  "email": string,
                  "contactPhone": string
                }
              }
            ]
            �������� ������ ������������� � ����� manager.
            401 - ���� ������������ �� ����������������;
            403 - ���� ���� ������������ �� ��������.
        */
        console.log('SupportRequestController.getSupportRequestsFromManager', query);
        return `SupportRequestController.getSupportRequestsFromManager(${JSON.stringify(query)})`;
    }

    @Get('api/common/support-requests/:id/messages')
    getMessagesByRequestId(@Param('id') id: string) {
        /*
        TODO: ��������� ������������ � ����� manager ��� client �������� ��� ��������� �� ����.
            [
              {
                "id": string,
                "createdAt": string,
                "text": string,
                "readAt": string,
                "author": {
                  "id": string,
                  "name": string
                }
              }
            ]
            �������� ������ ������������� � ����� manager � ������������ � ����� client, ������� ������ ���������.
            401 - ���� ������������ �� ����������������;
            403 - ���� ���� ������������ �� ��������.
        */
        console.log('SupportRequestController.getMessagesByRequestId', id);
        return `SupportRequestController.getMessagesByRequestId(${id})`;
    }

    @Post('api/client/support-requests/')
    createSupportRequest(@Body() body: Pick<CreateSupportRequestDto, 'text'>) {
        /*
        TODO: ��������� ������������ � ����� client ������� ��������� � ������������.
            ������ ������
            [
              {
                "id": string,
                "createdAt": string,
                "isActive": boolean,
                "hasNewMessages": boolean
              }
            ]
            �������� ������ ������������� � ����� client.
            401 - ���� ������������ �� ����������������;
            403 - ���� ���� ������������ �� ��������.
        */
        console.log('SupportRequestController.createSupportRequest', body);
        return `SupportRequestController.createSupportRequest(${JSON.stringify(body)})`;
    }

    @Post('api/common/support-requests/:id/messages')
    sendMessage(@Body() body: Pick<SendMessageDto, 'text'>) {
        /*
        TODO: ��������� ������������ � ����� manager ��� client ���������� ��������� � ���.
            ������ ������
            [
              {
                "id": string,
                "createdAt": string,
                "text": string,
                "readAt": string,
                "author": {
                  "id": string,
                  "name": string
                }
              }
            ]
            �������� ������ ������������� � ����� manager � ������������ � ����� client, ������� ������ ���������.
            401 - ���� ������������ �� ����������������;
            403 - ���� ���� ������������ �� ��������.
        */
        console.log('SupportRequestController.sendMessage', body);
        return `SupportRequestController.sendMessage(${JSON.stringify(body)})`;
    }

    @Post('api/common/support-requests/:id/messages')
    emitEventRead(@Param('id') id: string, @Body() body: Pick<MarkAsReadMessagesDto, 'createdBefore'>) {
        /*
        TODO: ��������� ������������ � ����� manager ��� client ���������� �������, ��� ��������� ���������.
            ������ ������
            {
              "success": true
            }
            �������� ������ ������������� � ����� manager � ������������ � ����� client, ������� ������ ���������.
            401 - ���� ������������ �� ����������������;
            403 - ���� ���� ������������ �� ��������.
        */
        console.log('SupportRequestController.sendMessage', id, body);
        return `SupportRequestController.sendMessage(${id}, ${JSON.stringify(body)})`;
    }

    listenSupportRequest() {
        /*
        TODO: ��������� ������������ � ����� manager ��� client �������� ����� ��������� � ���� ����� WebSocket.
            �������
            message: subscribeToChat payload: chatId
            ������ ������
            {
              "id": string,
              "createdAt": string,
              "text": string,
              "readAt": string,
              "author": {
                "id": string,
                "name": string
              }
            }
            �������� ������ ������������� � ����� manager � ������������ � ����� client, ������� ������ ���������.
        */
        console.log('SupportRequestController.listenSupportRequest');
        return `SupportRequestController.listenSupportRequest()`;
    }
}
