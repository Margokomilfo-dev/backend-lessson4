import {db} from "../../db/db";
import {blogsRepository} from "../blogs/blogs-repository";
import {PostType} from "../../types/post.type";
import {ObjectId} from "mongodb";
import {postsRepository} from "./post-repository";

export const postService = {
    async getPosts() {
        return postsRepository.getPosts()
    },
    async getPostById(id: string): Promise<PostType | null> {
        const post = await postsRepository.getPostById(id)
        if (post) {
            return post
        } else {
            return null
        }
    },
    async createPost(
        body: {
            title: string
            content: string
            blogId: string
            shortDescription: string
        },
        blogName: string
    ): Promise<PostType | null> {
        const blog = await blogsRepository.getBlogById(body.blogId)
        const newPost: PostType = {
            id: new Date().getTime().toString(),
            title: body.title,
            content: body.content,
            blogId: new ObjectId(blog!._id),
            shortDescription: body.shortDescription,
            blogName,
            //blogName: blogsRepository.getBlogById(body.blogId)!.name
        }

        const postId = await postsRepository.createPost(newPost)
        return postsRepository.getPostByUUId(postId)
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
        return postsRepository.updatePost(id, body)
    },

    async deletePost(id: string): Promise<boolean> {
        //need todo
        return false
    },
    async deleteAll() {
        return postsRepository.deleteAll()
    },
}
