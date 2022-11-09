import {
    Controller,
    Body,
    Query,
    Param,
    HttpException,
    Delete,
    Get,
    Patch,
    Post,
    Render,
    Res,
    Req,
    Put,
    UnauthorizedException,
    ForbiddenException,
    BadRequestException,
    NotFoundException,
}                                                     from '@nestjs/common';
import { Request, Response }                          from "express";
import { ReservationService }                         from "../reservation/reservation.service";
import { CreateReservationDto, SearchReservationDto } from "../reservation/dto/reservation.dto";
import { HotelService }                               from "../hotel/hotel.service";
import { HotelRoomService }      from "../hotel-room/hotel-room.service";
import { RequestWithUser, Role } from "../user/dto/user.dto";
import { UserDocument }          from "../user/schema/user.schema";
import { JoiReservationPipe }                         from "../pipe/reservation.pipe";
import { CreateReservationSchema }                    from "../joi/reservation.schema";

@Controller('api')
export class ApiReservationController {

    constructor(
        private readonly reservationService: ReservationService,
        private readonly hotelService: HotelService,
        private readonly hotelRoomService: HotelRoomService,
    ) {
    }

    @Post('client/reservations')
    async createReservation(
        @Req() request: RequestWithUser,
        @Res() response: Response,
        @Body(new JoiReservationPipe(CreateReservationSchema)) body: { hotelRoom: string, startDate: string, endDate: string },
    ) {
        {
            console.log('ApiReservationController.createClientReservation', body);
            if (!request.user)
                throw new UnauthorizedException('You are not authorized')
            if (request.user.role !== Role.Client)
                throw new ForbiddenException('Only for clients')

            const room = await this.hotelRoomService.findById(body.hotelRoom, true)
            if (!room)
                throw new BadRequestException('Room not found or disabled')

            const hotel = await this.hotelService.findById(room.hotel)
            if (!hotel)
                throw new BadRequestException('Hotel not found')

            const dto: CreateReservationDto = {
                room: room._id,
                hotel: hotel._id,
                user: request.user._id,
                dateStart: new Date(body.startDate),
                dateEnd: new Date(body.endDate),
            }

            const reservation = await this.reservationService.addReservation(dto);

            const result = {
                startDate: reservation.dateStart,
                endDate: reservation.dateEnd,
                hotel: {
                    title: hotel.title,
                    description: hotel.description,
                },
                hotelRoom: {
                    title: room.title,
                    description: room.description,
                    images: room.images,
                },
            }
            return response.send(result)
        }
    }

    @Get('client/reservations')
    async getReservations(
        @Req() request: RequestWithUser,
        @Res() response: Response,
    ) {
        console.log('ApiReservationController.getClientReservations', request.user);
        if (!request.user)
            throw new UnauthorizedException('You are not authorized')
        if (request.user.role !== Role.Client)
            throw new ForbiddenException('Only for clients')

        const filter: SearchReservationDto = {
            user: request.user._id.toString(),
            dateStart: undefined,
            dateEnd: undefined,
        }
        const reservations = await this.reservationService.getReservations(filter)

        const rooms = await this.hotelRoomService.find({_id: reservations.map(res => res.roomId.toString())})
        const hotels = await this.hotelService.find({_id: reservations.map(res => res.hotelId.toString())})

        const result = reservations.map(reservation => {
            const hotel = hotels.find(hotel => reservation.hotelId.toString() === hotel._id.toString())
            const room = rooms.find(room => reservation.roomId.toString() === room._id.toString())

            return {
                id: reservation._id,
                startDate: reservation.dateStart,
                endDate: reservation.dateEnd,
                hotel: {
                    title: hotel.title,
                    description: hotel.description,
                },
                hotelRoom: {
                    title: room.title,
                    description: room.description,
                    images: room.images,
                },
            }
        })
        return response.send(result);
    }

    @Get('manager/reservations/:id')
    async getReservationsByClientId(
        @Req() request: RequestWithUser,
        @Res() response: Response,
        @Param('id') clientId: string
    ) {
        console.log('ApiReservationController.getReservationsByClientId', clientId);
        if (!request.user)
            throw new UnauthorizedException('You are not authorized')
        if (request.user.role !== Role.Manager)
            throw new ForbiddenException('Only for managers')
        const filter: SearchReservationDto = {
            user: clientId,
            dateStart: undefined,
            dateEnd: undefined,
        }
        const reservations = await this.reservationService.getReservations(filter)

        const rooms = await this.hotelRoomService.find({_id: reservations.map(res => res.roomId.toString())})
        const hotels = await this.hotelService.find({_id: reservations.map(res => res.hotelId.toString())})

        const result = reservations.map(reservation => {
            const hotel = hotels.find(hotel => reservation.hotelId.toString() === hotel._id.toString())
            const room = rooms.find(room => reservation.roomId.toString() === room._id.toString())

            return {
                id: reservation._id,
                startDate: reservation.dateStart,
                endDate: reservation.dateEnd,
                hotel: {
                    title: hotel.title,
                    description: hotel.description,
                },
                hotelRoom: {
                    title: room.title,
                    description: room.description,
                    images: room.images,
                },
            }
        })
        return response.send(result);
    }

    @Delete('client/reservations/:id')
    async deleteReservation(
        @Req() request: RequestWithUser,
        @Res() response: Response,
        @Param('id') id: string,
    ) {
        console.log('ApiReservationController.deleteClientReservation', id)
        if (!request.user)
            throw new UnauthorizedException('You are not authorized')
        if (request.user.role !== Role.Client)
            throw new ForbiddenException('Only for clients')

        const reservation = await this.reservationService.findById(id)

        console.log('Found reservation', reservation)

        if (!reservation)
            throw new NotFoundException(`Reservation with id=${id} not found`)

        if (reservation.userId.toString() !== request.user._id.toString())
            throw new ForbiddenException(`Reservation with id=${id} belongs to another user`)

        // console.log(`Deleting reservation ${id}`)
        await this.reservationService.removeReservation(id)

        return response.send({})
    }

    @Delete('manager/reservations/:cid/:rid')
    async deleteReservationByClientId(
        @Req() request: RequestWithUser,
        @Res() response: Response,
        @Param('cid') clientId: string,
        @Param('rid') reservationId: string,
    ) {
        console.log('ApiReservationController.deleteClientReservation', clientId, reservationId);
        if (!request.user)
            throw new UnauthorizedException('You are not authorized')

        if (request.user.role !== Role.Manager)
            throw new ForbiddenException('Only for manager')

        const reservation = await this.reservationService.findById(reservationId);

        console.log('Found reservation', reservation)

        if (!reservation)
            throw new NotFoundException(`Reservation with id=${reservationId} not found`)

        if (reservation.userId.toString() !== clientId)
            throw new BadRequestException(`Reservation with id=${reservationId} is not belongs to user ${clientId}`)

        //console.log(`Deleting reservation ID=${reservationId} for client ${clientId}`)
        await this.reservationService.removeReservation(reservationId)

        return response.send({})
    }

}
