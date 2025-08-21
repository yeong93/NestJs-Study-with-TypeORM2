import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        SYNCRONIZE : false,
        ENTITIES : [__dirname + '/domain/*.entity{.ts,/,.js}'],
        MIGRATIONS : [__dirname + '/migrations/*.entity{.ts,/,.js}'],
        CLI: {
            migrationsDir: 'src/migrations',
        },
        MIGRATIONS_RUN : false,
    };

    const ormconfig: TypeOrmModuleOptions = {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'dpsjwl',
        database: 'test',
        entities: commonConf.ENTITIES,
        synchronize: commonConf.SYNCRONIZE, // 테이블 자동 생성
        logging: true, // 쿼리 로그 출력
        migrations: commonConf.MIGRATIONS,
        //cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    }

    return ormconfig;
}

export { ormConfig }