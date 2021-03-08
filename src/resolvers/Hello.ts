import { IResolvers } from "graphql-tools";


const Hello: IResolvers ={
    Query:{
        helloWorld(_:void, args:void): string {
            return `Hello GraphQL!~`;
        }
    }
}

export default Hello;