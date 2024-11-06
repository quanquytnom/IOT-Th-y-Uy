import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { dashboardRoutes } from './routes/dashboardRoutes.js';
import generalRoutes from './routes/general.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

//data import
import User from './models/User.js';
import { dataUser, dataActionHistory } from './data/index.js';
import DataSensor from './models/DataSensor.js';
import { dataDataSensor } from './data/index.js';
import ActionHistory from './models/ActionHistory.js';


// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
const hostname = 'localhost';




// ROUTES
app.use('/dashboard', dashboardRoutes)
app.use('/general', generalRoutes)



// MONOGDB CONNECTION
const PORT = process.env.PORT || 9000;

const db = mongoose.createConnection(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

db.on('error', console.error.bind(console, 'connection error:'));



export {db};

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,// 
}).then(() => {

    app.listen(PORT, hostname, () => {
        console.log(`Server is running on http://${hostname}:${PORT}`);
        // runmqttSubscribe();
    });
    console.log('Connected to MongoDB');


    // Run this code only once !!!
    // User.insertMany(dataUser);
    // DataSensor.insertMany(dataDataSensor);
    // ActionHistory.insertMany(dataActionHistory);

}).catch((err) => {
    console.log(`Error: ${err} did not connect`);
});


// SWAGGER
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My API Documentation',
        version: '1.0.0',
        description: 'API documentation for my IoT application',
    },
    servers: [
        {
            url: `http://${hostname}:${PORT}`,
        },
    ],
};

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url)); // Define __dirname

// Options for the swagger docs
const swaggerOptions = {
    swaggerDefinition,
    apis: [path.join(__dirname, 'routes', 'swagger.js')], // Sử dụng __dirname
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Setup Swagger UI route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));