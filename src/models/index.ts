import {Sequelize} from 'sequelize';
import {config} from '../config/config';

/**
 * 시퀄라이즈 db 기본 객체 툴
 */
// export const sequelize = new Sequelize('typescript_test', 'root','Jaehyeon2!',{
//     host : 'localhost',
//     dialect : 'mysql',
// })

export const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host:config.development.host,
        dialect:'mysql'
    }
)