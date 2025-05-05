import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

export const getArtists = async (req:FastifyRequest, replay:FastifyReply) => {
    try {
        const artists = await prisma.artist.findMany();
        return replay.status(200).send(artists);
    }catch (error) {
        return replay.status(500).send({ error: "Internal Server Error" });
    }
}