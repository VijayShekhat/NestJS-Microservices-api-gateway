import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
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


  @Get('books')
  async getAll(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1]; // Assuming format is "Bearer <token>"
        
    if (!token) {
      throw new HttpException('Authorization token is missing.', HttpStatus.UNAUTHORIZED);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get('http://localhost:3002/books', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the headers
                    },
                  }
      )
      );
      return response.data; // Successfully registered
    } catch (error) {
      // Check if the error has a response property
      if (error.response) {
        const status = error.response.status; // Extract status code
        const message = error.response.data.message || 'Books retrival failed.'; // Extract message if available

        // Throw the same status code and message from the microservice
        throw new HttpException(message, status);
      } else {
        // Handle generic error
        throw new HttpException('Books retrival failed.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get('books/:id')
  async getById(id: number, @Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1]; // Assuming format is "Bearer <token>"
        
    if (!token) {
      throw new HttpException('Authorization token is missing.', HttpStatus.UNAUTHORIZED);
    }


    try {
      const response = await firstValueFrom(
        this.httpService.get('http://localhost:3002/books/'+id, {
          headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      )
      );
      return response.data; // Successfully registered
    } catch (error) {
      // Check if the error has a response property
      if (error.response) {
        const status = error.response.status; // Extract status code
        const message = error.response.data.message || 'Book retrival failed.'; // Extract message if available

        // Throw the same status code and message from the microservice
        throw new HttpException(message, status);
      } else {
        // Handle generic error
        throw new HttpException('Book retrival failed.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post('books')
  async create(@Body() body: any, @Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1]; // Assuming format is "Bearer <token>"
        
    if (!token) {
      throw new HttpException('Authorization token is missing.', HttpStatus.UNAUTHORIZED);
    }


    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:3002/books', body, {
          headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      )
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

  @Put('books/:id')
  async update(id: number, @Body() body: any, @Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1]; // Assuming format is "Bearer <token>"
        
    if (!token) {
      throw new HttpException('Authorization token is missing.', HttpStatus.UNAUTHORIZED);
    }


    try {
      const response = await firstValueFrom(
        this.httpService.put('http://localhost:3002/books'+id, body, {
          headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      )
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

  @Delete('books/:id')
  async deleteById(id: number, @Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1]; // Assuming format is "Bearer <token>"
        
    if (!token) {
      throw new HttpException('Authorization token is missing.', HttpStatus.UNAUTHORIZED);
    }


    try {
      const response = await firstValueFrom(
        this.httpService.delete('http://localhost:3002/books/'+id, {
          headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      )
      );
      return response.data; // Successfully registered
    } catch (error) {
      // Check if the error has a response property
      if (error.response) {
        const status = error.response.status; // Extract status code
        const message = error.response.data.message || 'Book retrival failed.'; // Extract message if available

        // Throw the same status code and message from the microservice
        throw new HttpException(message, status);
      } else {
        // Handle generic error
        throw new HttpException('Book retrival failed.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

}
