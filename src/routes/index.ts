import { artistsRoutes } from "./artistRoutes"

export const routes = async (app: any) => {
    app.register(artistsRoutes, {prefix: "/api/artists"})
}