import {IResolvers} from 'graphql-tools';
import { Role, Users } from '../models/user';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const User: IResolvers = {
    Query: {
        users: async() => {
            const findAll = await Users.findAll({
                attributes:{
                    exclude:['password']
                }
            })
            return findAll
        },
        user:async(parent,args,context,info) => {
            const token = context.auth
            if(!token) {
                throw new Error('토큰값이 존재하지 않습니다. 로그인을 진행해주세요.')
            }
            const decoded = jsonwebtoken.verify(token,process.env.JWT_SECRET as string)
            const checkUser = await Users.findOne({
                where:{
                    email:(<any>decoded).email,
                },
                attributes:{
                    exclude:['password']
                }
            })
            return checkUser
        }
    },
    Mutation:{
        createUser:async (args,context) => {
            const exUser = await Users.findOne({
                where:{
                    email:context.input.email,
                }
            })
            if(exUser){
                throw new Error("이미 이메일이 있습니다.")
            }
            const hashedPassword = await bcrypt.hash(context.input.password, 10)
           const create = await Users.create({
               email:context.input.email,
               nickname:context.input.nickname,
               password:hashedPassword,
               phoneNumber:context.input.phoneNumber,
           })
           return create
            },
        login:async(args,{input}) => {
            const {email,password} = input;
            const user = await Users.findOne({
               where:{
                   email:email
               }
            })
            if(!user)  throw new Error('존재하지 않은 이메일입니다.')
            const valid = await bcrypt.compare(password, user.password);
            if(!valid) throw new Error('비밀번호가 일치하지 않습니다.')
            return jsonwebtoken.sign(
                {
                id:user.id,
                email:user.email,
            },
           process.env.JWT_SECRET as string,
            {expiresIn:'1d'}
            );
        },
        updateUser:async(parent,args,context,info) => {
            const token = context.auth;
            if(!token) {
                throw new Error('토큰값이 존재하지 않습니다. 로그인을 진행해주세요.')
            }
            const decoded = jsonwebtoken.verify(token,process.env.JWT_SECRET as string)
            const user = await Users.update({
                nickname:args.nickname,
            },{
                where:{email : (<any>decoded).email}
            })
            console.log(user)
            return {
                nickname:args.nickname,
                status:"success"
            };
        }
    }
}

export default User;