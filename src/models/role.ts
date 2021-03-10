import {sequelize} from './index';
import { DataTypes, Model } from 'sequelize';
import {Users} from './user';


enum Role {
    User ='USER',
    Admin = 'ADMIN'
}

export class Roles extends Model {
    public readonly id! :number;
    public name!: Role;
}

Roles.init(
    {
        name:{
            type:DataTypes.ENUM('USER','ADMIN'),
            allowNull:false,
        },
    },
    {
        modelName:'Roles',
        tableName:'Role',
        sequelize,
        freezeTableName:true,
        timestamps:false,
    }
)
