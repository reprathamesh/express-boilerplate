export type ResponsePayload<T = any> = {
    success: boolean;
    statusCode: number;
    message?: string;
    data?: T;
    error?: any;
};

export class ResponseHandler<T = any> {
    public success: boolean;
    public statusCode: number;
    public message?: string;
    public data?: T;
    public error?: any;

    constructor(payload: Partial<ResponsePayload<T>> = {}) {
        this.success = payload.success ?? true;
        this.statusCode = payload.statusCode ?? (this.success ? 200 : 400);
        this.message = payload.message;
        this.data = payload.data;
        this.error = payload.error;
    }

    toJSON(): ResponsePayload<T> {
        const out: ResponsePayload<T> = {
            success: this.success,
            statusCode: this.statusCode,
        };
        if (this.message) out.message = this.message;
        if (typeof this.data !== 'undefined') out.data = this.data;
        if (typeof this.error !== 'undefined') out.error = this.error;
        return out;
    }

    static success<T>(data?: T, message?: string, statusCode = 200) {
        return new ResponseHandler<T>({ success: true, statusCode, message, data });
    }

    static error(message?: string, statusCode = 400, error?: any) {
        return new ResponseHandler({ success: false, statusCode, message, error });
    }
}

export default ResponseHandler;

