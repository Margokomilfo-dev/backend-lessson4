import { body } from 'express-validator'
import {blogsRepository} from "../../modules/blogs/blogs-repository";

export const videoTitleValidator = body('title')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('title is required')
    .isLength({ min: 1, max: 40 })
    .withMessage('title should contain  1 - 40 symbols')

export const videoAuthorValidator = body('author')
    .trim()
    .notEmpty()
    .withMessage('author is required')
    .isLength({ min: 1, max: 20 })
    .withMessage('more than 20 symbols')

export const videoCanBeDownloadedValidator = body('canBeDownloaded')
    .optional()
    .isBoolean()
    .withMessage('not boolean')

export const videoMinAgeRestrictionValidator = body('minAgeRestriction')
    .optional({ nullable: true })
    .isInt({ min: 1, max: 18 })
    .withMessage('not correct')

// export const videoPublicationDateValidator = body('publicationDate')
//     .optional()
//     .isISO8601()
//     .matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/g)
//     .withMessage('not correct')

export const blogIdValidator = body('blogId')
    .isString()
    .withMessage('no string')
    .trim()
    .custom(blogId =>{
        const blog= blogsRepository.getBlogById(blogId)
        return !!blog
    })
    .withMessage('no blog')

// export const blogNameValidator = body('name')
//     .trim()
//     .notEmpty()
//     .withMessage('name is required')
//     .isLength({ min: 2, max: 15 })
//     .withMessage('name should contain  2 - 15 symbols')
//
// export const blogDescriptionValidator = body('description')
//     .trim()
//     .notEmpty()
//     .withMessage('description is required')
//     .isLength({ min: 2, max: 500 })
//     .withMessage('description should contain  2 - 500 symbols')
//
// export const blogWebsiteUrlValidator = body('websiteUrl')
//     .trim()
//     .notEmpty()
//     .withMessage('websiteUrl is required')
//     .isLength({ min: 2, max: 100 })
//     .withMessage('websiteUrl should contain  2 - 100 symbols')
//     .matches(
//         /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
//     )
//     .withMessage('not correct')
//
export const postTitleValidator = body('title')
    .trim()
    .notEmpty()
    .withMessage('title is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('title should contain  2 - 30 symbols')

export const postShortDescriptionValidator = body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('shortDescription is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('shortDescription should contain  2 - 100 symbols')

export const postContentValidator = body('content')
    .trim()
    .notEmpty()
    .withMessage('content is required')
    .isLength({ min: 2, max: 1000 })
    .withMessage('content should contain  2 - 1000 symbols')

