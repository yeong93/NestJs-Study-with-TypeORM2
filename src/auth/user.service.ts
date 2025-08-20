import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { FindOneOptions, FindOptionsWhere } from "typeorm";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    async findByFields(options: FindOptionsWhere<UserDTO>): Promise<UserDTO | null> {
    return await this.userRepository.findOneBy(options);
    }

    async save(UserDTO: UserDTO): Promise<UserDTO> {
        return await this.userRepository.save(UserDTO);
    }
}