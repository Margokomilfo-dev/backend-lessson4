import {Request, Response, Router} from "express";
import {
    videoAuthorValidator,
    videoCanBeDownloadedValidator,
    videoMinAgeRestrictionValidator,
    videoTitleValidator
} from "../../validation/express-validator/field-validators";
import {errorsResultMiddleware} from "../../validation/express-validator/errors-result-middleware";
import {ObjectId, SortDirection} from "mongodb"
import {videoService} from "./video-service";
import {paginationQueries} from "../../helpers/paginations_values";
import {videoRepository} from "./video-repository";

export const videoRouter = Router()

export const videoController = {
    async getVideos (req: Request, res: Response) {
        // БЫЛО
        // @ts-ignore
        // const videos = await videoRepository.getVideos() // получаем видео из бд
        // res.status(200).json(videos)

        //----------------
        //СТАЛО
        // let pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1
        // let pageSize = req.query.pageSize ? +req.query.pageSize : 10
        // let sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
        // let sortDirection: SortDirection =
        //     req.query.sortDirection && req.query.sortDirection.toString() === 'asc'
        //         ? 'asc'
        //         : 'desc'
        //
        // let searchNameTerm =  req.query.searchNameTerm ? req.query.searchNameTerm.toString() : null;

        //ИЛИ
        const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } = paginationQueries(req)
        const videos = await videoService.getVideos(
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchNameTerm
        )
        res.status(200).send(videos)
        //----------------------
    },

    async createVideo (req: Request, res: Response)  {
        const videoId = await videoService.createVideo(req.body)
        const video = await videoService.getVideoByUUID(videoId)

        res.status(201).json(video)
    },
    async getVideoByID (req: Request, res: Response)  {
        const video = await videoService.getVideoByUUID(new ObjectId(req.params._id))

        res.status(201).json(video)
    },
    async getVideo(req: Request, res: Response){
        const id = req.params.id;
        const video = await videoService.getVideo(id);
        if (video) {
            res.status(200).json(video);
        } else {
            res.status(404).send({ message: "Video not found" });
        }
    }
}

videoRouter.get('/', videoController.getVideos)
videoRouter.get('/:id', videoController.getVideo)
videoRouter.get('/byId/:_id', videoController.getVideoByID)
videoRouter.post('/',
    videoTitleValidator,
    videoAuthorValidator,
    videoMinAgeRestrictionValidator,
    videoCanBeDownloadedValidator,
    errorsResultMiddleware,
    videoController.createVideo)
// videoRouter.put('/:id', videoRouter.updateVideo)