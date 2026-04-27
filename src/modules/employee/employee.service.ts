import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(
    @InjectRepository(Employee)
     private employeeRepository: Repository<Employee>
    ){}

    async createEmployee(data: Partial<Employee>): Promise<Employee> {
        const employee = this.employeeRepository.create(data);
        return this.employeeRepository.save(employee);
    }

    async search(filters:{name?: string, department?: string}): Promise<Employee[]> {
        const query = this.employeeRepository.createQueryBuilder('employee');

        if (filters.name){
            query.andWhere('employee.name ILIKE :name', { name: `%${filters.name}%` });
        }
        if (filters.department){
            query.andWhere('employee.department ILIKE :department', { department: `%${filters.department}%` });
        }
        return query.getMany(); 
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    async getEmployeeById(id: number): Promise<Employee | null> {
        return this.employeeRepository.findOneBy({ id });
    }
}
