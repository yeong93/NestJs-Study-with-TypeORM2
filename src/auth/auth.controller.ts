import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async registerAccount(@Req() req: Request, @Body() userDTO: UserDTO): Promise<UserDTO> {
        return this.authService.registerUser(userDTO);
    }
    
    @Post('login')
    async login(@Body() userDTO: UserDTO): Promise<any> {
        return this.authService.validateUser(userDTO);
    }
}
