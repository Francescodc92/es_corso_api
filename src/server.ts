import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { routes } from "./routes";

const app = fastify();

app.register(fastifyCors, {
    origin: '*' 
})

app.register(routes)

const PORT = Number(process.env.PORT) || 3000;
app.listen({ port: PORT })
    .then(() => {
        console.log("Server is running on http://localhost:3000");
    })
    .catch((err) => {
        console.error("Error starting server:", err);
        process.exit(1);
    });