const { ApolloServer, gql, MockList } = require("apollo-server");
const faker = require('faker');

const typeDefs = gql`
  type Resources {
    id: ID!,
    groupName: String,
    groupKey: String,

  }
  type Query {
    hello: String,
    helloTwo: String,
    comeon: [Resources],
  }
`;

const resolvers = {
  Query: {
    comeon: () => [
      {
        id:'ee-44',
        groupKey: 'test key'
      },
      {
        id:'ee-45',
        groupKey: 'test key 2'
      },
      {
        id:'ee-46',
        groupKey: 'test key 3'
      }
    ]
  }
};

const mocks = {
  Query: () => ({
    comeon: () => new MockList(10),

  }),
  Resources : () => ({
    groupName: () => faker.company.companyName(),
    groupKey: ()=> faker.commerce.product()
  }),
  ID: () => faker.random.uuid(),
  String: () => faker.name.title(),
  GroupKey: () => faker.name.firstName(),
};

const server = new ApolloServer({
  typeDefs,
  mocks,
  mockEntireSchema: false,
  resolvers,
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
