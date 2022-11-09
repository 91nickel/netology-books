import { Injectable }                                                          from '@nestjs/common';
import { InjectModel }                                                         from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema }                                     from 'mongoose';
import * as md5                                                                from "md5"
import { User, UserDocument }                                                  from './schema/user.schema';
import { Role, SignUpUserDto, SignInUserDto, SearchUserDto, SearchUserParams } from './dto/user.dto';

type ID = string | MongooseSchema.Types.ObjectId;

interface IUserService {
    create(data: Partial<UserDocument>): Promise<UserDocument>;

    findById(id: ID): Promise<UserDocument>;

    findByEmail(email: string): Promise<UserDocument>;

    findAll(params: SearchUserParams): Promise<UserDocument[]>;
}

@Injectable()
export class UserService implements IUserService {

    @InjectModel(User.name)
    private userModel: Model<UserDocument>

    create(data: SignUpUserDto): Promise<UserDocument> {
        console.log('UserService.create()', data);
        try {
            const fields = {...data, passwordHash: md5(data.password), role: Role.Client}
            delete fields.password
            const entity = new this.userModel(fields)
            return entity.save()
        } catch (error) {
            console.error(error)
        }
    }

    findById(id: ID): Promise<UserDocument> {
        console.log('UserService.findById()', id);
        try {
            return this.userModel.findById(id).exec()
        } catch (error) {
            console.error(error)
        }
    }

    findByEmail(email: string): Promise<UserDocument> {
        console.log('UserService.findByEmail()...', email);
        try {
            return this.userModel.findOne({email: email}).exec()
        } catch (error) {
            console.error(error)
        }
    }

    findAll(params: SearchUserDto): Promise<UserDocument[]> {
        console.log('UserService.findAll()...', params);
        try {
            const filter: Partial<SearchUserDto> = {}
            if (params.name)
                filter.name = `/${params.name}/i`
            if (params.name)
                filter.email = `/${params.email}/i`
            if (params.name)
                filter.contactPhone = `/${params.contactPhone}/i`
            return this.userModel.find(filter).limit(params.limit).skip(params.offset).exec()
        } catch (error) {
            console.error(error)
        }
    }

}
