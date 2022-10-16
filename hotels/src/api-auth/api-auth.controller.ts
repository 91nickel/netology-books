import {
    Controller,
    Body, Query, Param,
    HttpException,
    Delete, Get, Patch, Post, Render, Res, Req, Put,
}                        from '@nestjs/common';
import { UserService }   from "../user/user.service";
import { SignInUserDto } from "../user/dto/sign-in-user.dto";
import { SignUpUserDto } from "../user/dto/sign-up-user.dto";

@Controller('api/auth')
export class ApiAuthController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @Post('login')
    login (@Body() body: SignInUserDto) {
        /*
        TODO: �������� ������ ������������ � ���������� Cookies.
            ������ ������
            {
              "email": string,
              "name": string,
              "contactPhone": string
            }
            �������� ������ �� ������������������� �������������.
            401 - ���� ������������ � ��������� email �� ���������� ��� ������ ��������.
        */
        console.log('ApiAuthController.login', body);
        return `ApiAuthController.login(${JSON.stringify(body)})`;
    }

    @Post('logout')
    logout () {
        /*
        TODO: ��������� ������ ������������ � ������� Cookies.
            ������ ������: ������
            �������� ������ �� ������������������� �������������.
        */
        console.log('ApiAuthController.logout');
        return `ApiAuthController.logout()`;
    }

    @Post('register')
    register (@Body() body: SignUpUserDto) {
        /*
        TODO: ��������� ������� ������������ � ����� client � �������.
            ������ ������
            {
              "id": string,
              "email": string,
              "name": string
            }
            �������� ������ �� ������������������� �������������.
            400 - ���� email ��� �����.
        */
        console.log('ApiAuthController.register', body);
        return `ApiAuthController.register(${JSON.stringify(body)})`;
    }

}
