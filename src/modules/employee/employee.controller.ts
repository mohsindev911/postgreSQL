import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { EmployeeDTO } from './DTO/employee.dto';

@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService
    ){}
   @Post()
    async createEmployee(@Body() data: EmployeeDTO): Promise<Employee> {
        return this.employeeService.createEmployee(data);
    }

   @Get('search')
    async searchEmployees(@Query('name') name?: string, @Query('department') department?: string): Promise<Employee[]> {
        return this.employeeService.search({ name, department });
    }

    @Get()
    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeService.getAllEmployees();
    }

    @Get(':id')
    async getEmployeeById(@Param('id') id: number): Promise<Employee | null> {
        return this.employeeService.getEmployeeById(id);
    }

}
