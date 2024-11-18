import {db} from "../../db/db";
import {BlogType} from "../../types/blog.type";
import {blogsCollection} from "../../db/mongoDb";

export const blogsRepository = {
    async getBlogs() {
        return blogsCollection.find({}).toArray()
    },
    async getBlogById(id: string): Promise<BlogType | null> {
       return blogsCollection.findOne({ id }, { projection: { _id: 0 } })
    },
    async createBlog(blog: BlogType): Promise<BlogType | null> {
        await blogsCollection.insertOne(blog)
        return this.getBlogById(blog.id)
    },

    async updateBlog(
        id: string,
        body: {
            name: 'string'
            description: 'string'
            websiteUrl: 'string'
        }
    ): Promise<boolean> {
        //need todo
        //await blogsCollection.updateOne({_id: blog._id}, {
        //     $set: {title: body.title}
        //  })
        return true
    },

    async deleteBlog(id: string): Promise<boolean> {
        const blog = await this.getBlogById(id)
        if (blog) {
            const res = await blogsCollection.deleteOne({_id: blog._id})
            if(res.deletedCount >0) return true
        }
        return false
    },
    async deleteAll() {
        //need todo
    },
}
