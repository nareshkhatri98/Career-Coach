import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma|| new PrismaClient();


if(process.env.NODE_ENV !=="production"){
    globalThis.prisma = db
}

// here the gobalThis.prsima is  variable ensures that  the prisma client instance is reuse across  hot reloads during development
// Without this, each time your application  reloads , a new instance of the prisma client would be created, potentially leading
// to connection issues....  