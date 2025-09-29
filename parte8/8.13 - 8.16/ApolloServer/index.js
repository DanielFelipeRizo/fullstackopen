import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';

import http from 'http';
import express from 'express';
import cors from 'cors';

import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

import dotenv from 'dotenv';
dotenv.config();

import User from './models/user.js';

import typeDefs from './utils/typeDefs.js';
import resolvers from './utils/resolvers.js';

// --- imports para WebSocket ---
// import { useServer } from 'graphql-ws/use/ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // --- crea el schema ejecutable ---
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // --- crea el servidor WebSocket ---
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });

  // --- conecta graphql-ws al servidor WebSocket ---
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // --- cierra el wsServer al apagar Apollo ---
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );
          const currentUser = await User.findById(decodedToken.id).populate(
            'friends'
          );
          return { currentUser };
        }
      },
    })
  );

  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

start();
