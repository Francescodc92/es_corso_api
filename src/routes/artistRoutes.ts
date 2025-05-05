import { FastifyInstance } from "fastify";

export const artistsRoutes = async (app: FastifyInstance) => {
    app.get("/", () => {})

    app.get('/:id', () => {});
    
    app.post('/', () => {});
    
    app.put('/:id', () => {});
    
    app.delete('/:id', () => {});
}