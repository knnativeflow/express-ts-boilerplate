import { generateRoutes, generateSwaggerSpec, RoutesConfig, SwaggerConfig } from 'tsoa'
import ts from 'ttypescript/lib/typescript'

(async () => {
    const swaggerOptions: SwaggerConfig = {
        basePath: '/api/v1',
        entryFile: './src/server.ts',
        specVersion: 3,
        outputDirectory: './src/static',
        controllerPathGlobs: ['./src/api/*'],
        securityDefinitions: {
            jwt: {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            }
        }
    }

    const routeOptions: RoutesConfig = {
        "basePath": "/api/v1",
        "entryFile": "./src/server.ts",
        "routesDir": "./src/api/_auto",
        "authenticationModule": "./src/middlewares/authentication.ts"
    }

    const ignore = [
        "**/node_modules/**",
        "./src/api/_auto/*",
        "./src/static/*"
    ]

    const compilerOptions = {
        "moduleResolution": ts.ModuleResolutionKind.NodeJs,
        "baseUrl": ".",
        "paths": { //This has to be the same config as in tsconfig.json
            "*": [
                "src/*"
            ]
        },
    }

    await generateSwaggerSpec(swaggerOptions, routeOptions, compilerOptions, ignore)

    await generateRoutes(routeOptions, swaggerOptions, compilerOptions, ignore)
})()