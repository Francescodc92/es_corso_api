import { FastifyInstance } from "fastify";
import { createArtist, getArtistById, getArtists } from "../controllers/artistController";

export const artistsRoutes = async (app: FastifyInstance) => {
    app.get("/", getArtists)

    app.get('/:id', getArtistById);
    
    app.post('/', createArtist);
    
    app.put('/:id', () => {});
    
    app.delete('/:id', () => {});
}