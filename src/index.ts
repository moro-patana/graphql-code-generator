import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { Student } from "./types/types";let students: Student[] = [
  {
    firstName: "Anita",
    lastName: "Rasoa",
    id: 1,
    imageUrl: 'https://avatars.githubusercontent.com/u/60210400?v=4',
    role: 'Front-end Developer',
    linkedinUrl: '#',
    twitterUrl: '#'
  },
  {
    firstName: "Noeline",
    lastName: "Marie Jeanne",
    id: 2,
    imageUrl: 'https://avatars.githubusercontent.com/u/60210215?v=4',
    role: 'Front-end Developer',
    linkedinUrl: '#',
    twitterUrl: '#'
  },
  {
    firstName: "Sarah",
    lastName: "Razanatsoa",
    id: 3,
    imageUrl: 'https://avatars.githubusercontent.com/u/60210165?v=4',
    role: 'Front-end Developer',
    linkedinUrl: '#',
    twitterUrl: '#'
  },
  {
    firstName: "Tantely",
    lastName: "Andrianarivola",
    id: 4,
    imageUrl: 'https://avatars.githubusercontent.com/u/60210112?v=4',
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
      students: (): Student[] => students
    },
    Mutation: {
      addStudent: (root:Student[], args:Student) => {
        const newStudent = {
          id: args.id,
          firstName: args.firstName,
          lastName: args.lastName,
          role: args.role,
          imageUrl: args.imageUrl,
          twitterUrl:args.twitterUrl,
          linkedinUrl: args.linkedinUrl
        };
        students.push(newStudent);
  
        return newStudent;
      },
     
    deleteStudent: (root:Student[], args:Student) => {
      const removeIndex = students.findIndex(student => student.id === args.id);
      const removedLink = students[removeIndex];
      students.splice(removeIndex, 1);

      return removedLink;
    },

    updateStudent: (root:Student[], args:Student) => {
      let updatedStudent;

      students = students.map(student => {
        if (student.id === args.id) {
          updatedStudent = { ...student, ...args };
          return updatedStudent;
        }
        return student;
      });

      return updatedStudent;
    },
    }
  };

  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
  });

  const server = new ApolloServer({ schema: schemaWithResolvers });
  server.listen().then(({ url }) => {
  console.log(`????  Server ready at ${url}`);
});