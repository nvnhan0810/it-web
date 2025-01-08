export type PaginationResponse<T> = {
    data: T[];
    currentPage: number;
    total: number;
    from: number;
    to: number;
    lastPage: number;
}