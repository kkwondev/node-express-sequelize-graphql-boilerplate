import {IResolvers} from 'graphql-tools';
import { Users } from './models/user';
import bcrypt from 'bcrypt';

const resolverMap: IResolvers = {
    Query: {
        helloWorld(_:void, args:void): string {
            return `Hello GraphQL!~`;
        },
        users:async() => {
            const findAll = await Users.findAll()
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
            }
        }
    }

export default resolverMap;