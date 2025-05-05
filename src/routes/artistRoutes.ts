import { FastifyInstance } from "fastify";
import {
  createArtist,
  deleteArtist,
  getArtistById,
  getArtists,
  updateArtist,
} from "../controllers/artistController";

export const artistsRoutes = async (app: FastifyInstance) => {
  app.get("/", getArtists);

  app.get("/:id", getArtistById);

  app.post("/", createArtist);

  app.put("/:id", updateArtist);

  app.delete("/:id", deleteArtist);
};
