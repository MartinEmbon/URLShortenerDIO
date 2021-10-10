import {Request, Response} from "express"
import shortId from "shortid"
import { config } from '../config/Constants'
import { URLModel } from '../database/model/URL'


export class URLController{
    public async shorten(req: Request, res: Response): Promise<void>{
        //ver si url nao existe
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })
        if (url){
            res.json(url)
            return
        }
        //criar o hash para url        
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        const newURL = await URLModel.create({ hash, shortURL, originURL })

        //salvar url no banco
        //retornar url que a gente salvo
        res.json({originURL,hash,shortURL})
    }
    public async redirect(req:Request,res:Response):Promise<void>{
        //pegar hash da url
        const {hash}=req.params
        
        //encontrar a url original pelo hash
        const url = await URLModel.findOne({hash})
        if (url) {
			res.redirect(url.originURL)
			return
		}
        //redirecionar para url original a partir do que encontramos no db
        res.status(400).json({ error: 'URL not found' })

    }
    public async home(req:Request,res:Response):Promise<void>{
        //pegar hash da url
      return res.render("index")

    }
}