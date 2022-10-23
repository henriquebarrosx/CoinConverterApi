import { AxiosRequestConfig } from "axios"

export interface HttpClientGateway {
    get<T>(route: string, config?: AxiosRequestConfig<any>): Promise<T>
}

export type HttpClientConfig = AxiosRequestConfig<any>