import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDTO } from './dto/auth-response.dto';
import { AccessToken } from './types/access-token';
import { RegisterStudentDto } from './dto/register-student.dto';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { RegisterParentDto } from './dto/register-parent.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiOkResponse({
    type: AuthResponseDTO,
    isArray: false,
  })
  @Post('login')
  async login(
    @Body() loginBody: { email: string; password: string },
  ): Promise<AuthResponseDTO | BadRequestException> {
    const { email, password } = loginBody;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken: AccessToken = await this.authService.login(user);
    return new AuthResponseDTO(accessToken);
  }

  @ApiBody({
    type: RegisterStudentDto,
  })
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: AuthResponseDTO,
    isArray: false,
  })
  @Post('register/student')
  async registerStudent(
    @Body() registerBody: RegisterStudentDto,
  ): Promise<AuthResponseDTO | BadRequestException> {
    try {
      const accessToken: AccessToken =
        await this.authService.registerStudent(registerBody);
      return new AuthResponseDTO(accessToken);
    } catch {
      throw new BadRequestException('Registration failed');
    }
  }

  @ApiBody({
    type: RegisterTeacherDto,
  })
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: AuthResponseDTO,
    isArray: false,
  })
  @Post('register/teacher')
  async registerTeacher(
    @Body() registerBody: RegisterTeacherDto,
  ): Promise<AuthResponseDTO | BadRequestException> {
    try {
      const accessToken: AccessToken =
        await this.authService.registerTeacher(registerBody);
      return new AuthResponseDTO(accessToken);
    } catch {
      throw new BadRequestException('Registration failed');
    }
  }

  @ApiBody({
    type: RegisterParentDto,
  })
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: AuthResponseDTO,
    isArray: false,
  })
  @Post('register/parent')
  async registerParent(
    @Body() registerBody: RegisterParentDto,
  ): Promise<AuthResponseDTO | BadRequestException> {
    try {
      const accessToken: AccessToken =
        await this.authService.registerParent(registerBody);
      return new AuthResponseDTO(accessToken);
    } catch {
      throw new BadRequestException('Registration failed');
    }
  }

  //   @Post('register/admin')
  //   async registerAdmin(
  //     @Body() registerBody: RegisterAdminDto,
  //   ): Promise<AuthResponseDTO | BadRequestException> {
  //     try {
  //       const accessToken: AccessToken =
  //         await this.authService.registerAdmin(registerBody);
  //       return new AuthResponseDTO(accessToken);
  //     } catch {
  //       throw new BadRequestException('Registration failed');
  //     }
  //   }
}
