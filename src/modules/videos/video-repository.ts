import {db} from "../../db/db";
import {VideoType} from "../../types/video.type";
import {addDays} from 'date-fns/addDays'
import {videosCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";


export const videoRepository = {
    async getVideos(
        pageNumber: number,
        pageSize: number,
        sortBy: string,
        sortDirection:  'asc' | 'desc', //SortDirection
        searchNameTerm: string | null
    ) {
        const filter:any = {}

        // Если есть поисковый термин, используем регулярное выражение
        if (searchNameTerm) {
            filter.title = { $regex: searchNameTerm, $options: 'i' }; // $options: 'i' для игнорирования регистра
        }
        return videosCollection
            .find(filter) // {}, { projection: { _id: 0 } }
            // "asc" (по возрастанию), то используется 1
            // "desc" — то -1 для сортировки по убыванию. - по алфавиту от Я-А, Z-A
            .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
            // пропускаем определённое количество док. перед тем, как вернуть нужный набор данных.
            // Например, для первой страницы (где pageNumber = 1), пропускать ничего не нужно,
            // для второй — пропустим уже размер первой страницы, и так далее.
            .skip((pageNumber - 1) * pageSize)
            // количество документов, которые мы хотим видеть на одной странице.
            // ограничивает количество возвращаемых документов до значения pageSize
            .limit(pageSize)
            .toArray()
    },
    async getVideosCount(searchNameTerm:string | null): Promise<number> {
        const filter:any = {}
        if (searchNameTerm) {
            filter.title = { $regex: searchNameTerm, $options: 'i' }; //  встроенные операторы mongodb $regex и $options, 'i' для игнорирования регистра
            //filter.title = new RegExp(searchNameTerm, 'i'); // c помощью JS - используем объект RegExp.
        }
        return videosCollection.countDocuments(filter)
    },
    async createVideo(video: VideoType): Promise<ObjectId>{
        const res = await videosCollection.insertOne(video)
        return res.insertedId // = new ObjectId('66efeaadeb3....')
    },
    async getVideo(id: string) {
        console.log('ID:', id)
        return await videosCollection.findOne({id: id})
    },
    async getVideoByUUID(_id: ObjectId) {
        return await videosCollection.findOne({_id: _id} )
    },
    async updateVideo(id:string, body: VideoType): Promise<boolean>{
        const res = await videosCollection.updateOne(
            { id },
            { $set: { ...body } }
        )
        return res.matchedCount === 1
    }
}

