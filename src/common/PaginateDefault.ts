import { PaginateOptions } from 'mongoose'
import Exception from './Exception'
import { ErrorCodes } from './errorCodes'

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

const CUSTOM_LABELS = {
    totalDocs: 'totalElements',
    docs: 'content',
    limit: 'size',
    page: 'page',
    nextPage: false,
    prevPage: false,
    hasPrevPage: false,
    hasNextPage: false,
    pagingCounter: false
}

const PAGE_VALIDATOR = (page: number) => Number.isInteger(page) && page >= 1
const SIZE_VALIDATOR = (size: number) => Number.isInteger(size) && size >= 1
const SORT_DIR_VALIDATOR = (sortDir: string) => sortDir === 'desc' || sortDir === 'asc'

export interface Page<T> {
    content: Array<T>,
    totalElements: number,
    size: number,
    page: number
}

export default class PaginateDefault implements PaginateOptions {
    constructor(
        readonly page: number | undefined,
        readonly limit: number | undefined,
        readonly sort: Object | undefined,
        readonly customLabels: Object
    ) { }

    static fromParams(
        page: number | undefined,
        size: number | undefined,
        sortBy: string | undefined,
        sortDir: string | undefined
    ): PaginateDefault {
        const parsedSortDir = sortDir?.trim()?.toLowerCase()
        const parsedSortBy = sortBy?.trim()

        this.validateParams(page, size, parsedSortDir)

        return new PaginateDefault(
            page || DEFAULT_PAGE,
            size || DEFAULT_SIZE,
            this.prepareSortConfig(parsedSortBy, parsedSortDir),
            CUSTOM_LABELS
        )
    }

    private static validateParams(
        page: number | undefined,
        size: number | undefined,
        sortDir: string | undefined
    ): void {
        if (page !== undefined && page !== null && !PAGE_VALIDATOR(page))
            throw Exception.fromMessage(ErrorCodes.INVALID_PAGE)

        if (size !== undefined && size !== null && !SIZE_VALIDATOR(size))
            throw Exception.fromMessage(ErrorCodes.INVALID_SIZE)

        if (sortDir !== undefined && sortDir !== null && !SORT_DIR_VALIDATOR(sortDir))
            throw Exception.fromMessage(ErrorCodes.INVALID_SORT_DIR)
    }


    private static prepareSortConfig(sortBy?: string, sortDir?: string): Object | undefined {
        if (sortBy && sortDir)
            return { [sortBy]: sortDir.toLowerCase() === 'asc' ? 1 : -1 }

        if (sortBy)
            return { [sortBy]: 1 }
    }

}