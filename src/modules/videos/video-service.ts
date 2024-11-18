import {VideoType} from "../../types/video.type";
import {addDays} from 'date-fns/addDays'
import {ObjectId, SortDirection} from "mongodb";
import {videoRepository} from "./video-repository";
import {videosCollection} from "../../db/mongoDb";


export const videoService = {
    async getVideos(
        pageNumber: number,
        pageSize: number,
        sortBy: string,
        sortDirection:  'asc' | 'desc', //SortDirection
        searchNameTerm: string | null
    ) {
        // return videoRepository.getVideos()


        const videos = await videoRepository.getVideos(
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchNameTerm
        )
        const videosCount = await videoRepository.getVideosCount(searchNameTerm)

      return {
            pagesCount: Math.ceil(videosCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: videosCount,
            items: videos,
        }
    },

    async createVideo(body: VideoType): Promise<ObjectId>{
        const newVideo:VideoType = {
            _id: body._id ?  body._id : undefined,
            id: new Date().getTime().toString(),
            title: body.title,
            author: body.author,
            canBeDownloaded: false, //By default - false
            minAgeRestriction: null, //maximum: 18, minimum: 1, default: null, nullable: true - null - no restriction
            createdAt: new Date().toISOString(),
            publicationDate: addDays(new Date(), 1).toISOString(), //By default - +1 day from CreatedAt
            availableResolutions: body.availableResolutions
                ? body.availableResolutions
                : null,
        }
        return videoRepository.createVideo(newVideo)
    },
    async getVideo(id: string) {
        return videoRepository.getVideo(id)
    },
    async getVideoByUUID(_id: ObjectId) {
        return videoRepository.getVideoByUUID(_id)
    },
    async updateVideo(id:string, body: VideoType): Promise<boolean>{
       return videoRepository.updateVideo(id, body)
    }
}

