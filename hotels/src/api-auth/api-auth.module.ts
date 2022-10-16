import { Module }            from '@nestjs/common';
import { ApiAuthController } from './api-auth.controller';
import { AuthService }       from "../auth/auth.service";
import { UserService }       from "../user/user.service";
import { MongooseModule }    from "@nestjs/mongoose";
import { User, UserSchema }  from "../user/schema/user.schema";

/*
TODO:
 ������ ��������������� � ������������ ������������ ���:
 ���������� ������� ������������,
 ����������� �������������.
 �������� ������ ������ ��������������� ����������� ���������� passport.js � ��������� ������ � ������ ����������.
 �������������� ������������ ������������ � ������� ������ �������������. ������� ������������ ����������� ���� �� ����� - ������, �������������, �����������.
 */
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema},
        ]),
    ],
    controllers: [ApiAuthController],
    providers: [AuthService, UserService],
})
export class ApiAuthModule {
}
