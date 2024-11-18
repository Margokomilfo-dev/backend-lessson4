import {BlogType} from "../../types/blog.type";
import {blogsCollection} from "../../db/mongoDb";
import {blogsRepository} from "./blogs-repository";

export const blogsService = {
    async getBlogs() {
        return blogsCollection.find({}).toArray()
    },
    async getBlogById(id: string): Promise<BlogType | null> {
        const blog = await blogsCollection.findOne({id: id}) as BlogType | null
        if (blog) {
            return blog
        } else {
            return null
        }
    },
    async createBlog(
        name: string,
        description: string,
        websiteUrl: string
    ): Promise<BlogType | null> {
        const blog = {
            id: new Date().getTime().toString(),
            description,
            name,
            websiteUrl,
            isMembership: false,
            createdAt: new Date().toISOString(),
        }
        return blogsRepository.createBlog(blog)
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
