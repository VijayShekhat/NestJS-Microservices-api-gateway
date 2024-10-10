import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly httpService: HttpService) {}

  @Post('auth/register')
  async register(@Body() body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:3001/auth/register', body)
      );
      return response.data; // Successfully registered
    } catch (error) {
      // Check if the error has a response property
      if (error.response) {
        const status = error.response.status; // Extract status code
        const message = error.response.data.message || 'Registration failed'; // Extract message if available

        // Throw the same status code and message from the microservice
        throw new HttpException(message, status);
      } else {
        // Handle generic error
        throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post('auth/login')
  async login(@Body() body: any) {
    try{
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:3001/auth/login', body)
      );
      return response.data;
    } catch(error) {
      if (error.response) {
        const status = error.response.status; // Extract status code
        const message = error.response.data.message || 'Login failed'; // Extract message if available

        // Throw the same status code and message from the microservice
        throw new HttpException(message, status);
      } else {
        // Handle generic error
        throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
  }
}
