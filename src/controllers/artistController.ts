import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export const getArtists = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const artists = await prisma.artist.findMany();
    return reply.status(200).send(artists);
  } catch (error) {
    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

export const createArtist = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const createArtistSchema = z.object({
    name: z.string().min(3),
  });

  try {
    const { name } = createArtistSchema.parse(req.body);

    const artistAlreadyExists = await prisma.artist.findUnique({
      where: {
        name,
      },
    });

    if (artistAlreadyExists) {
      return reply.status(400).send({ error: "Artist already exists" });
    }

    const artist = await prisma.artist.create({
      data: {
        name,
      },
    });

    return reply.status(201).send(artist);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Error during validation",
        error: error.flatten().fieldErrors,
      });
    }

    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

export const getArtistById = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const getArtistByIdSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const { id } = getArtistByIdSchema.parse(req.params);

    const artist = await prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      return reply.status(404).send({ error: "Artist not found" });
    }

    return reply.status(200).send(artist);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Error during validation",
        error: error.flatten().fieldErrors,
      });
    }

    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

export const updateArtist = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const updateArtistSchema = z.object({
    id: z.string().uuid(),
  });

  const updateArtistBodySchema = z.object({
    name: z.string().min(3),
  });

  try {
    const { id } = updateArtistSchema.parse(req.params);
    const { name } = updateArtistBodySchema.parse(req.body);

    const artist = await prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      return reply.status(404).send({ error: "Artist not found" });
    }

    const artistAlreadyExists = await prisma.artist.findUnique({
      where: {
        name,
      },
    });
    if (artistAlreadyExists && artistAlreadyExists.id !== id) {
      return reply.status(400).send({ error: "Artist already exists" });
    }

    const updatedArtist = await prisma.artist.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return reply.status(200).send(updatedArtist);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Error during validation",
        error: error.flatten().fieldErrors,
      });
    }

    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

export const deleteArtist = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const deleteArtistSchema = z.object({
    id: z.string().uuid(),
  });
  try {
    const { id } = deleteArtistSchema.parse(req.params);

    const artist = await prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      return reply.status(404).send({ error: "Artist not found" });
    }

    await prisma.artist.delete({
      where: {
        id,
      },
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Error during validation",
        error: error.flatten().fieldErrors,
      });
    }

    return reply.status(500).send({ error: "Internal Server Error" });
  }
};
