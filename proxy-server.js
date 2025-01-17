require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const { stitchSchemas } = require('@graphql-tools/stitch');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { printSchema } = require('graphql');
const fetch = require('cross-fetch');
const path = require('path');
const fs = require('fs');

const mockTypeDefs = require('./mockTypeDefs');
const mockResolvers = require('./mockResolvers');
const { getRemoteSchema } = require('./utils');

const LIVE_SERVER_URL = process.env.LIVE_SERVER_URL;

async function startServer() {
    try {
        const remoteSchema = await getRemoteSchema();

        const mockExecutableSchema = makeExecutableSchema({
            typeDefs: mockTypeDefs,
            resolvers: mockResolvers,
        });

        const stitchedSchema = stitchSchemas({
            subschemas: [
                {
                    schema: remoteSchema,
                    executor: async ({ document, variables, context }) => {
                        const query = print(document);

                        const authHeader = context.req.headers['authorization'];

                        const response = await fetch(LIVE_SERVER_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: authHeader,
                            },
                            body: JSON.stringify({ query, variables }),
                        });

                        const result = await response.json();
                        if (result.errors) {
                            console.error(
                                'Errors from live server:',
                                result.errors
                            );
                        }
                        return result;
                    },
                },
                {
                    schema: mockExecutableSchema,
                },
            ],
        });

        const schemaSDL = printSchema(stitchedSchema);
        const schemaPath = path.join(__dirname, 'mocked-schema.graphql');
        fs.writeFileSync(schemaPath, schemaSDL, 'utf-8');
        console.log('Merged schema saved to mocked-schema.graphql');

        const server = new ApolloServer({
            schema: stitchedSchema,
            context: ({ req }) => {
                return { req };
            },
        });

        server.listen({ port: 4000 }).then(({ url }) => {
            console.log(`🚀 Proxy server running at ${url}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

startServer();
