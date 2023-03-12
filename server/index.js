import express from 'express';
import * as dotenv from 'dotenv'
import {authRouters} from './routers/authRouters.js';
import cookieParser from 'cookie-parser';
import {refreshRouter} from './routers/refreshTokenRouter.js';
import {db} from './db.js';
import cors from 'cors'

dotenv.config();

const PORT = process.env.PORT || 4000;
//db connection
db();

const app = express();
app.use(cors({origin: '*'}))
app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/', authRouters);
app.use('/api/v1/', refreshRouter)

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))
