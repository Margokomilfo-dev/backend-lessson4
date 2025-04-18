import {ObjectId} from 'mongodb'

export type BlogType = {
    _id?: ObjectId,
    id: string
    name: string
    description: string
    websiteUrl: string
}
