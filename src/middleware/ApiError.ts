export default class ApiError extends Error {
    public statusCode: number;
    public details?: any;

    constructor(message: string, statusCode = 500, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}
