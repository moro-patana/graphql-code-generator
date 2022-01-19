import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { Student } from "./types/types";

const students: Student[] = [
  {
    firstName: "Anita",
    lastName: "Rasoa",
    id: 1
  },
  {
    firstName: "Noeline",
    lastName: "Marie Jeanne",
    id: 2
  },
  {
    firstName: "Sarah",
    lastName: "Razanatsoa",
    id: 3
  },
  {
    firstName: "Tantely",
    lastName: "Andrianarivola",
    id: 4
  },
  
];

const schema = loadSchemaSync("**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  const resolvers = {
    Query: {
      students: (): Student[] => students,
    },
  };

  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
  });

  const server = new ApolloServer({ schema: schemaWithResolvers });
  server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});