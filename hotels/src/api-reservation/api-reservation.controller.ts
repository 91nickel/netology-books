import {
    Controller,
    Body, Query, Param,
    HttpException,
    Delete, Get, Patch, Post, Render, Res, Req, Put,
}                               from '@nestjs/common';
import { ReservationService }   from "../reservation/reservation.service";
import { CreateReservationDto } from "../reservation/dto/create-reservation.dto";

@Controller('api')
export class ApiReservationController {

    constructor(
        private readonly reservationService: ReservationService
    ) {
    }

    @Get('client/reservations')
    getReservations () {
        /*
        TODO: ������ ������ �������� ������������.
        ������ ������:
        [
          {
            "startDate": string,
            "endDate": string,
            "hotelRoom": {
              "title": string,
              "description": string,
              "images": [string]
            },
            "hotel": {
              "title": string,
              "description": string
            }
          }
        ]
        �������� ������ ������������������� ������������� � ����� client.
        401 - ���� ������������ �� ����������������;
        403 - ���� ���� ������������ �� client.
        */
        console.log('ApiReservationController.getClientReservations');
        return `ApiHotelController.getClientReservations()`;
    }

    @Get('manager/reservations/:id')
    getReservationsByClientId (@Param('id') clientId: string) {
        /*
            TODO: ������ ������ ����������� ������������.
            ������ ������
            [
              {
                "startDate": string,
                "endDate": string,
                "hotelRoom": {
                  "title": string,
                  "description": string,
                  "images": [string]
                },
                "hotel": {
                  "title": string,
                  "description": string
                }
              }
            ]
            �������� ������ ������������������� ������������� � ����� manager.
            401 - ���� ������������ �� ����������������;
            403 - ���� ���� ������������ �� manager.
        */
        console.log('ApiReservationController.getReservationsByClientId', clientId);
        return `ApiHotelController.getReservationsByClientId(${clientId})`;
    }

    @Post('client/reservations')
    createReservation (@Body() body: CreateReservationDto) {
        /*
        TODO: ������ ����� �� ����� �� ��������� ���� ��� �������� ������������.
        ������ ������:
        {
          "startDate": string,
          "endDate": string,
          "hotelRoom": {
            "title": string,
            "description": string,
            "images": [string]
          },
          "hotel": {
            "title": string,
            "description": string
          }
        }
        �������� ������ ������������������� ������������� � ����� client.
        401 - ���� ������������ �� ����������������;
        403 - ���� ���� ������������ �� client;
        400 - ���� ������ � ��������� ID �� ���������� ��� �� ��������.
        */
        console.log('ApiReservationController.createClientReservation', body);
        return `ApiHotelController.getRooms(${JSON.stringify(body)})`;
    }

    @Delete('client/reservations/:id')
    deleteReservation (@Param('id') id: string) {
        /*
            TODO: �������� ����� ������������.
            ������ ������: ������ �����.
            �������� ������ ������������������� ������������� � ����� client.
            401 - ���� ������������ �� ����������������;
            403 - ���� ���� ������������ �� client;
            403 - ���� ID �������� ������������ �� ��������� � ID ������������ � �����;
            400 - ���� ����� � ��������� ID �� ����������.        }
        */
        console.log('ApiReservationController.deleteClientReservation', id);
        return `ApiHotelController.deleteClientReservation(${id})`;
    }

    @Delete('manager/reservations/:cid/:rid')
    deleteReservationByClientId (@Param('cid') clientId: string, @Param('rid') reservationId: string) {
        /*
            TODO: �������� ����� ������������.
            ������ ������: ������ �����.
            �������� ������ ������������������� ������������� � ����� manager.
            401 - ���� ������������ �� ����������������;
            403 - ���� ���� ������������ �� manager;
            400 - ���� ����� ��� ������������ � ��������� ID �� ����������.
        */
        console.log('ApiReservationController.deleteClientReservation', clientId, reservationId);
        return `ApiHotelController.deleteClientReservation(${clientId}, ${reservationId})`;
    }

}
