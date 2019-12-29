export interface LoginResponse {
    user: {
        id: string,
        email: string
    };
    token: string;
}