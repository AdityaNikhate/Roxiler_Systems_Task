import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config({
  path:'../config/.env'
})

const databaseConnection = ()=>{
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Connect to Mongodb.")  
  })
  .catch((error)=>{
    console.log(error)
  })
}

export default databaseConnection;