// GrapQL schema를 실행시킬수 있는 schema.ts

import 'graphql-import-node';
import root from './schema.graphql';
import User from './user.graphql';
import { IResolvers, makeExecutableSchema } from 'graphql-tools';
import {GraphQLSchema} from 'graphql';
import { allResolvers } from '../resolvers';

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs:[root,User],
    resolvers: allResolvers as IResolvers[],
})

export default schema;