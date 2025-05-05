import { FastifyInstance } from "fastify";
import { getArtists } from "../controllers/artistController";

export const artistsRoutes = async (app: FastifyInstance) => {
    app.get("/", getArtists)

    app.get('/:id', () => {});
    
    app.post('/', () => {});
    
    app.put('/:id', () => {});
    
    app.delete('/:id', () => {});
}