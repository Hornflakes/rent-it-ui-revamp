export type LoginBody = {
    username: string;
    password: string;
};

export type RegisterBody = LoginBody & {
    role: 'admin' | 'client';
};

export type AuthRes = {
    accessToken: string;
};
