import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import { User } from "src/domain/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findByFields(options: FindOptionsWhere<UserDTO>): Promise<User | null> {
        return await this.userRepository.findOneBy(options);
    }

    async save(UserDTO: UserDTO): Promise<UserDTO> {
        await this.transformPassword(UserDTO);
        return await this.userRepository.save(UserDTO);
    }

    async transformPassword(user: UserDTO): Promise<void> {
        user.password = await bcrypt.hash(
            user.password, 10
        );

        return Promise.resolve();
    }
}