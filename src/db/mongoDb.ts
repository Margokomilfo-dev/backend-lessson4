import { MongoClient, Db, Collection } from 'mongodb'
import {VideoType} from "../types/video.type";
import {SETTINGS} from "../settings";
import * as dotenv from 'dotenv'
import {BlogType} from "../types/blog.type";
import {PostType} from "../types/post.type";
dotenv.config()

let client
let db

export let videosCollection: Collection<VideoType>
export let blogsCollection: Collection<BlogType>
export let postsCollection: Collection<PostType>

export async function runDb(url: string): Promise<boolean>{
    client = new MongoClient(url);
    db= client.db(SETTINGS.DB_NAME)
    videosCollection = db.collection<VideoType>(SETTINGS.PATH.VIDEOS)
    blogsCollection = db.collection<BlogType>(SETTINGS.PATH.BLOGS)
    postsCollection = db.collection<PostType>(SETTINGS.PATH.POSTS)
    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('OK')
        return true
    } catch (e) {
        console.log(e)
        await client.close();
        return false
    }
}
