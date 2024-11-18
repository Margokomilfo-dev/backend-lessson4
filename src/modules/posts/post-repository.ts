import {db} from "../../db/db";
import {blogsRepository} from "../blogs/blogs-repository";
import {PostType} from "../../types/post.type";
import {ObjectId} from "mongodb";
import {postsCollection, videosCollection} from "../../db/mongoDb";

export const postsRepository = {
    async getPosts() {
        return  postsCollection.find({}, { projection: { _id: 0 } }).toArray()
    },
    async getPostById(id: string): Promise<PostType | null> {
        return postsCollection.findOne({ id }, { projection: { _id: 0 } })
    },
    async getPostByUUId(_id: ObjectId): Promise<PostType | null> {
        return postsCollection.findOne({ _id }, { projection: { _id: 0 } })
    },
    async createPost(
        post: PostType
    ): Promise<ObjectId> {
        const res = await postsCollection.insertOne(post)
        return res.insertedId // = new ObjectId('66efeaadeb3....')
        //return this.getPostById(newPost.id)
    },
    async updatePost(
        id: string,
        body: {
            title: string
            content: string
            blogId: ObjectId
            shortDescription: string
        }
    ):Promise<boolean> {
        const ourPost = await postsCollection.updateOne(
            { id },
            { $set: { ...body } }
        )
        return ourPost.matchedCount === 1
    },

    async deletePost(id: string): Promise<boolean> {
       return false
    },
    async deleteAll() {
        return postsCollection.deleteMany({})
    },
}
