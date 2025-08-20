import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async registerUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind = await this.userService.findByFields({username: newUser.username});

        if (userFind) {
            throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
        }

        return await this.userService.save(newUser);
    }

    async validateUser(userDTO: UserDTO): Promise<UserDTO> {
        let userFind = await this.userService.findByFields({ username : userDTO.username});
        
        const validatePassword = await bcrypt.compare(userDTO.password, userFind!.password);
        if (!userFind || !validatePassword) {
            throw new UnauthorizedException();
        }

        return userFind;
    }
}
