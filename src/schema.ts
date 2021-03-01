// GrapQL schema를 실행시킬수 있는 schema.ts

import 'graphql-import-node';
import * as typeDefs from './schema/schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolverMap';
import {GraphQLSchema} from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

export default schema;