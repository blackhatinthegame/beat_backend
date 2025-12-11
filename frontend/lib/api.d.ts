export declare const AuthApi: {
    signup: (data: any) => Promise<any>;
    login: (data: any) => Promise<any>;
    refresh: (refreshToken: string) => Promise<any>;
};
export declare const BeatApi: {
    list: (params?: Record<string, any>) => Promise<any>;
    create: (form: FormData) => Promise<any>;
    get: (id: string) => Promise<any>;
};
export declare const FavoritesApi: {
    toggle: (beatId: string) => Promise<any>;
    list: () => Promise<any>;
};
export declare const CheckoutApi: {
    purchase: (beatId: string) => Promise<any>;
};
export declare const UserApi: {
    profile: () => Promise<any>;
    myBeats: () => Promise<any>;
};
//# sourceMappingURL=api.d.ts.map