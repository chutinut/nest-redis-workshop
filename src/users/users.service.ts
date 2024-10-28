import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
    });

    return result;
  }

  async findByUsername(username: string): Promise<User> {
    const result = await this.userModel.findOne({ username });

    return result;
  }
}
