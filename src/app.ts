import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {videoRouter} from "./modules/videos/video-router";

// задача создать (не запустить) back
export const app = express() //создать приложение

//middleware express.json() парсит JSON в теле запроса и добавляет его как объект в свойство body запроса (req.body.).
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'})
})

app.use(SETTINGS.PATH.VIDEOS,videoRouter)