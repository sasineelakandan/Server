export type AdminInputData={
    email:string,
    password:string
}

export type AdminOutputData={

    readonly admin:boolean
    readonly accessToken?: string;
    readonly refreshToken?: string;
}