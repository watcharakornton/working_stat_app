import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dataRoutes from './routes/dataRoutes.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use('/api', dataRoutes);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
});
