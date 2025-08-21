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
        res.cookie('jwt', jwt.accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 하루
        })
        return res.send({
            message : 'success'
        });
    }

    @Post('logout')
    logout(@Res() res: Response): any {
        res.cookie('jwt', 0, {
            maxAge: 0
        });
        return res.send({
            message : 'success'
        })
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

    @Get('/cookies')
    getCookies(@Req() req: any, @Res() res: Response): any {
        const jwt = req.cookies['jwt'];
        return res.send(jwt);
    }
}
