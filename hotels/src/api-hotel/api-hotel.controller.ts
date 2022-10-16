import {
    Controller,
    Body, Query, Param,
    HttpException,
    Delete, Get, Patch, Post, Render, Res, Req, Put,
}                             from '@nestjs/common';
import { CreateHotelDto }     from "../hotel/dto/create-hotel.dto";
import { CreateHotelRoomDto } from "../hotel-room/dto/create-hotel-room.dto";
import { HotelService }       from "../hotel/hotel.service";
import { HotelRoomService }   from "../hotel-room/hotel-room.service";
import { UserService }        from "../user/user.service";
import { SearchHotelRoomDto } from "../hotel-room/dto/search-hotel-room.dto";

// TODO: �������� API ��� ������ �������.
// ���� ������������ �� ���������������� ��� ��� ���� client,
// �� ��� ������ ������ ������ �������������� ���� isEnabled: true.

@Controller('api')
export class ApiHotelController {

    constructor(
        private readonly hotelService: HotelService,
        private readonly hotelRoomService: HotelRoomService,
        private readonly userService: UserService,
    ) {
    }

    @Get('common/hotel-rooms')
    getRooms(@Query() query: SearchHotelRoomDto) {
        // TODO: �������� ���� �������������, ������� ���������������������.
        console.log('ApiHotelController.getRooms');
        return `ApiHotelController.getRooms(${JSON.stringify(query)})`;
    }

    @Get('/api/common/hotel-rooms/:id')
    getRoom(@Param('id') id: string) {
        /*
            TODO: ��������� ��������� ���������� � ������. {
                ������ ������
                {
                  "id": string,
                  "title": string,
                  "description": string,
                  "images": [string],
                  "hotel": {
                    "id": string,
                    "title": string,
                    "description": string
                  }
                }
         */
        console.log('ApiHotelController.getRoom', id);
        return `ApiHotelController.getRoom ${id}`;
    }

    @Get('/api/admin/hotels/')
    getHotels(@Query('limit') limit, @Query('offset') offset) {
        /*
            TODO: ���������� ��������� ���������������.
                ������ ������:
                {
                    "id": string,
                    "title": string,
                    "description": string
                }
                �������� ������ ������������������� ������������� � ����� admin.
                401 - ���� ������������ �� ����������������;
                403 - ���� ���� ������������ �� admin.
        */
        console.log('ApiHotelController.getHotels', {limit: limit, offset: offset});
        return `ApiHotelController.getHotels(${JSON.stringify({limit: limit, offset: offset})})}`;
    }

    @Post('/api/admin/hotels/')
    createHotel(@Body() body: CreateHotelDto) {
        /*
            TODO: ���������� ��������� ���������������.
                ������ ������:
                {
                    "id": string,
                    "title": string,
                    "description": string
                }
                �������� ������ ������������������� ������������� � ����� admin.
                401 - ���� ������������ �� ����������������;
                403 - ���� ���� ������������ �� admin.
        */
        console.log('ApiHotelController.createHotel', body);
        return `ApiHotelController.createHotel ${JSON.stringify(body)}`;
    }

    @Put('/api/admin/hotels/:id')
    updateHotel(@Param('id') id, @Body() body: Partial<CreateHotelDto>) {
        /*
        TODO: ��������� �������� ��������� ���������������.
            ������ ������:
            {
                "id": string,
                "title": string,
                "description": string
            }
            �������� ������ ������������������� ������������� � ����� admin.
            401 - ���� ������������ �� ����������������;
            403 - ���� ���� ������������ �� admin.
         */
        console.log('ApiHotelController.updateHotel', id, body);
        return `ApiHotelController.updateHotel ${id} ${JSON.stringify(body)}`;
    }

    @Post('/api/admin/hotel-roomss/')
    createHotelRoom(@Body() body: CreateHotelRoomDto) {
        /*
            TODO: ���������� ������ ��������� ���������������.
                ���� ������ ������������ �������� ������ � ������ ������������ ������ multipart/form-data.
                ������ ������:
                {
                    "id": string,
                    "title": string,
                    "description": string,
                    "images": [string],
                    "isEnabled": boolean,
                    "hotel": {
                        "id": string,
                        "title": string,
                        "description": string
                    }
                }
                �������� ������ ������������������� ������������� � ����� admin.
                401 - ���� ������������ �� ����������������;
                403 - ���� ���� ������������ �� admin.
         */
        console.log('ApiHotelController.createHotelRoom', body);
        return `ApiHotelController.createHotelRoom ${JSON.stringify(body)}`;
    }

    @Put('/api/admin/hotel-rooms/:id')
    updateHotelRoom(@Param('id') id, @Body() body: Partial<CreateHotelRoomDto>) {
        /*
            TODO: ���������� ������ ��������� ���������������.
                ���� ������ ������������ �������� ������ � ������ ������������ ������ multipart/form-data.
                ������ ������:
                {
                    "id": string,
                    "title": string,
                    "description": string,
                    "images": [string],
                    "isEnabled": boolean,
                    "hotel": {
                        "id": string,
                        "title": string,
                        "description": string
                    }
                }
                �������� ������ ������������������� ������������� � ����� admin.
                401 - ���� ������������ �� ����������������;
                403 - ���� ���� ������������ �� admin.
         */
        console.log('ApiHotelController.updateHotelRoom', id, body);
        return `ApiHotelController.updateHotelRoom ${id} ${JSON.stringify(body)}`;
    }
}
