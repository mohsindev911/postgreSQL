import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    async createUser(data: Partial<User>): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUserById(id: number): Promise<User | null> {
        const user=this.userRepository.findOneBy({ id });
        if (!user)  throw new NotFoundException('User not found');
        return user;
    }

    async updateUser(id: number, data: Partial<User>): Promise<User> {
        const user = await this.getUserById(id);
        if (!user) throw new Error('User not found');
        Object.assign(user, data);
        return this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<User | null> {
        const user = await this.getUserById(id);
        if (!user) throw new Error('User not found');
        await this.userRepository.remove(user);
        return user;
    }
}
