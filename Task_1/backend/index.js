import express from "express";
import dotenv from 'dotenv';
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import { storeInDB } from "./controllers/dataController.js";
import data from './routes/dataRoute.js'
import cors from "cors"

dotenv.config({
  path:'.env'
})
const app = express();

databaseConnection()

// uncomment the bellow line to store the data in database
// storeInDB()

// middlerwares
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json())
app.use(cookieParser())  
app.use(cors())

// apis  
app.use('/api/v1/data', data)




const PORT = process.env.PORT || 8081
app.listen(PORT,()=>{
  console.log(`Server at port ${PORT}`)
})