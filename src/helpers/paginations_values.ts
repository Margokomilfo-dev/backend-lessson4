import { Request } from 'express'
import {SortDirection} from "mongodb";

export const paginationQueries = (req: Request) => {
    let pageNumber: number = req.query.pageNumber ? +req.query.pageNumber : 1
    let pageSize: number = req.query.pageSize ? +req.query.pageSize : 10
    let sortBy: string = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'

    //SortDirection нюансы, но по условию документации свои обязательные требования
    let sortDirection : 'asc' | 'desc'  =
        req.query.sortDirection && req.query.sortDirection.toString() === 'asc'
            ? 'asc'
            : 'desc'
    let searchNameTerm: string | null = req.query.searchNameTerm ? String(req.query.searchNameTerm) : null;

    return { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm }
}

// req.query.pageNumber !== undefined - для примера, что 0 == false:
// req.query.pageNumber? req.query.pageNumber: 1


export const paginationQueries_ = (req: Request) => {
    let pageNumber = req.query.pageNumber
    let pageSize = req.query.pageSize
    let sortBy = req.query.sortBy

    let sortDirection = req.query.sortDirection
    let searchNameTerm = req.query.searchNameTerm

    return { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm }
}