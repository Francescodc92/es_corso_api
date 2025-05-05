import { FastifyInstance } from "fastify";
import { createArtist, getArtists } from "../controllers/artistController";

export const artistsRoutes = async (app: FastifyInstance) => {
    app.get("/", getArtists)

    app.get('/:id', () => {});
    
    app.post('/', createArtist);
    
    app.put('/:id', () => {});
    
    app.delete('/:id', () => {});
}