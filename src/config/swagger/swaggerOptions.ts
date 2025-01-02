//import { SwaggerOptions } from 'swagger-jsdoc';
import { configDotenv } from "dotenv";
configDotenv()
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My TO-DO API',
            version: '1.0.0',
            description: 'API documentation for My TO-DO application',
        },
        servers: [
            {
               url: `http://localhost:${process.env.PORT|| 6000}/api/v1`,
               
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Optional, but can be helpful
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs
};

export default swaggerOptions;
