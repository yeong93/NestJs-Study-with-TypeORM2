import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { User } from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findByFields(options: FindOptionsWhere<UserDTO>): Promise<UserDTO | null> {
    return await this.userRepository.findOneBy(options);
    }

    async save(UserDTO: UserDTO): Promise<UserDTO> {
        return await this.userRepository.save(UserDTO);
    }
}