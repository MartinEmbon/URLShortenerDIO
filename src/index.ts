import { URLController } from "./controller/URLController"
import express, {Request,Response} from "express"
import { MongoConnection } from "./database/MongoConnection"

const api = express()
api.use(express.json())
const urlController = new URLController()

const database = new MongoConnection()
database.connect()
var path = require('path');

//api.use(express.static(path.join(__dirname, 'public')));

api.post('/shorten', urlController.shorten)
api.get("/hash",urlController.redirect)
api.get("/",urlController.home)

api.get("/test",(req:Request,res:Response)=>{
    res.json({sucess:true})
})

api.listen(5000,()=>console.log("express rodando"))