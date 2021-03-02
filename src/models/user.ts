import {Sequelize, DataTypes, Optional,Model} from 'sequelize';
import {sequelize} from './index';

interface UserAttributes {
    // id값은 defalut
    email:string,
    password:string | null,
    nickname:string,
    phoneNumber:number
}

export class Users extends Model<UserAttributes>{
    public readonly id! : number;
    public email! : string;
    public password! : string;
    public nickname! : string;
    public phoneNumber! :number;
}

Users.init(
    {
        email : {
            type: DataTypes.STRING(45),
            allowNull:false,
        },
        password : {
            type: DataTypes.STRING(45),
            allowNull:false,
        },
        nickname: {
            type:DataTypes.STRING(45),
            allowNull:false,
        },
        phoneNumber:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    },
    {
        modelName:'Users',
        tableName:'User',
        sequelize,
        freezeTableName:true,
        timestamps:true,
        updatedAt:'updateTimestamp'
    }
)
Users.sync().then(() => console.log("Users table created"))