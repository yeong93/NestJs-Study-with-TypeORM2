import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAuthority } from "./user-authority.entity";

@Entity('user') // 테이블명 명시
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string

    @OneToMany(type => UserAuthority, userAuthority => userAuthority.user, { eager: true })
    authorities: any[]; // UserAuthority 엔티티와의 일대다 관계 설정

}