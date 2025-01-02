import http from "http";
import cors from 'cors';
import express, { urlencoded, json } from "express";
import type { Request } from 'express';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { readFileSync } from 'fs';
import { resolvers } from './graphql/resolvers/resolvers.js';

import userRouter from "./routers/userRouter.js";

const typeDefs = readFileSync('./src/graphql/schema.graphql', { encoding: 'utf-8' });


const port = process.env.PORT || 8080;
const app = express();
const httpServer = http.createServer(app);

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  console.log(process.env.OPTIONS_ENV); 
  res.status(200).json({ msg: "Server is up and running" });
});


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.PROJECT_ENV === "DEV",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

app.use(
  "/graphql",
  express.json(),
  cors<cors.CorsRequest>(),
  // @ts-expect-error
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { req, res };
    }
  })
);

app.use("/api/users", userRouter);


await new Promise<void>((resolve) =>
  httpServer.listen({ port: port }, resolve)
);

console.log(`🚀 Server ready at http://localhost:${port}`);