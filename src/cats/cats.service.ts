import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from '../domain/cats.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private catRepository: Repository<Cat>,
    ){}

    findAll(): Promise<Cat[]> {
        return this.catRepository.find();
    }

    findOne(id: number): Promise<Cat | null> {
        return this.catRepository.findOneBy({ id });
    }

    async create(cat: Cat): Promise<void> {
        await this.catRepository.save(cat);
    }

    async remove(id: number): Promise<void> {
        await this.catRepository.delete(id);
    }

    async update(id: number, cat: Cat): Promise<void> {
        const existedCat = await this.catRepository.findOneBy({ id });
        // if (existedCat) {
        //     await this.catRepository
        //         .createQueryBuilder()
        //         .update(Cat)
        //         .set({
        //             name: cat.name,
        //             age: cat.age,
        //             breed: cat.breed,
        //         })
        //         .where("id = :id", { id })
        //         .execute();
        // }

        if (existedCat) {
            await this.catRepository.update(id, {
                name: cat.name,
                age: cat.age,
                breed: cat.breed,
            });
        }
    }
}
