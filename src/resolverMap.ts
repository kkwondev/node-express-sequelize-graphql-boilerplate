import {IResolvers} from 'graphql-tools';
import { Users } from './models/user';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const resolverMap: IResolvers = {
    Query: {
        helloWorld(_:void, args:void): string {
            return `Hello GraphQL!~`;
        },
        users:async() => {
            const findAll = await Users.findAll({
                attributes:{
                    exclude:['password']
                }
            })
            return findAll
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
               phoneNumber:context.input.phoneNumber
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
            {expiresIn:'1h'}
            );
        }
    }
}

export default resolverMap;