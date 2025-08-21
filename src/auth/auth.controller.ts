import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { Response } from 'express';
import { RoleType } from './role-type';
import { RolesGuard } from './roles.guard';
import { Roles } from './decorator/role.decorator';
import { AuthGuard } from './security/auth.guard';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async registerAccount(@Body() userDTO: UserDTO): Promise<UserDTO> {
        return this.authService.registerUser(userDTO);
    }
    
    @Post('login')
    async login(@Body() userDTO: UserDTO, @Res() res: Response): Promise<any> {
        const jwt = await this.authService.validateUser(userDTO);
        res.setHeader('Authorization', `Bearer ${jwt.accessToken}`);
        return res.json(jwt);
    }

    @Get('authenticate')
    @UseGuards(AuthGuard)
    isAuthenticated(@Req() req: any): any {
        const user: any = req.user;
        return user;
    }

    @Get('admin-role')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    adminRoleCheck(@Req() req: any): any {
        const user: any = req.user;
        return user;
    }
}
