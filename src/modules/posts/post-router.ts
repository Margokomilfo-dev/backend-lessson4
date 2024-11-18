import {Request, Response, Router} from 'express'
import {postsRepository} from "./post-repository";
import {authorizationMiddleware} from "../../middlewares/authorization-middleware";
import {
    blogIdValidator,
    postContentValidator,
    postShortDescriptionValidator,
    postTitleValidator
} from "../../validation/express-validator/field-validators";
import {errorsResultMiddleware} from "../../validation/express-validator/errors-result-middleware";
import {postService} from "./post-service";
import {blogsService} from "../blogs/blogs-service";

export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.getPosts()
    res.status(200).send(posts)
})

postsRouter.post(
    '/',
    authorizationMiddleware,
    postTitleValidator,
    postShortDescriptionValidator,
    postContentValidator,
    blogIdValidator,
    errorsResultMiddleware,
    async (req: Request, res: Response) => {
        const blogId = req.body.blogId
        const blog = await blogsService.getBlogById(blogId)

        const newPost = await postService.createPost(req.body, blog!.name)

        if (newPost) {
            res.status(201).send(newPost) //если сделать sendStatus - не дойдем до send
        } else {
            res.sendStatus(400)
        }
    }
)

postsRouter.get('/:id', async (req: Request, res: Response) => {
    //need todo
    res.sendStatus(200)
})

postsRouter.put(
    '/:id',
    // need todo
    async (req: Request, res: Response) => {
        //need todo
        res.sendStatus(200)
    }
)

//здесь может быть ошибка, так как Ваня здесь не проверяет на id и в случае ошибки лн вернет 404
postsRouter.delete(
    '/:id',
    // authorizationMiddleware,
    // idStringParamValidationMiddleware,
    async (req: Request, res: Response) => {
        //need todo
        res.sendStatus(200)
    }
)
