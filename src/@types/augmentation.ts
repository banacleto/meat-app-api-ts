import * as fastify from "fastify";
import * as http from "http";
import { Db } from "../modules/db";

/**
 * According to the default definitions, fastify server instance does not contain any 
 * property called blipp and db, so let’s use augmentation.
 * In TypeScript we can augment existing definitions using declarations merging feature.
 * Read more at: https://www.typescriptlang.org/docs/handbook/declaration-merging.html
 */
declare module "fastify" {
    export interface FastifyInstance<HttpServer = http.Server, HttpRequest = http.IncomingMessage, 
        HttpResponse = http.ServerResponse> {
        // This small module does nothing, but prints the endpoints which we've registered.
        blipp(): void
        db: Db
    }
}