import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

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
}
