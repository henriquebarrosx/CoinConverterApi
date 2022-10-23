export interface HttpClientGateway {
    get<T>(route: string, config?: HttpClientConfig): Promise<T>
}

export type HttpClientConfig = {
    headers?: Record<string, string>
}