import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponse } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    const user = await this.usersService.create(createUserDto);

    const responseData: CreateUserResponse = { _id: user._id.toString() };

    return responseData;
  }
}
