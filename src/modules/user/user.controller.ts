import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(
        private readonly userSevice: UserService
    ){}

    @Post()
    async createuser(@Body() data: Partial<User> ): Promise<User> {
        return this.userSevice.createUser(data);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userSevice.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<User | null> {
        return this.userSevice.getUserById(id);
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() data: Partial<User>): Promise<User> {
        return this.userSevice.updateUser(id, data);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<User | null> {
        return this.userSevice.deleteUser(id);
    }
}
