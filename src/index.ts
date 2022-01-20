import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { Student } from "./types/types";

const students: Student[] = [
  {
    firstName: "Anita",
    lastName: "Rasoa",
    id: 1,
    imageUrl: 'https://i.ibb.co/6vhZKy4/image-1.png',
    role: 'Front-end Developer',
    linkedinUrl: '#',
    twitterUrl: '#'
  },
  {
    firstName: "Noeline",
    lastName: "Marie Jeanne",
    id: 2,
    imageUrl: 'https://i.ibb.co/q5X4bZf/image-2.png',
    role: 'Front-end Developer',
    linkedinUrl: '#',
    twitterUrl: '#'
  },
  {
    firstName: "Sarah",
    lastName: "Razanatsoa",
    id: 3,
    imageUrl: 'https://i.ibb.co/LRP5n6k/image-4.png',
    role: 'Front-end Developer',
    linkedinUrl: '#',
    twitterUrl: '#'
  },
  {
    firstName: "Tantely",
    lastName: "Andrianarivola",
    id: 4,
    imageUrl: 'https://i.ibb.co/TR9LL3q/image-3.png',
    role: 'Front-end Developer',
    linkedinUrl: '#',
    twitterUrl: '#'
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