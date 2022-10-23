import axios from "axios"
import { HttpClientConfig, HttpClientGateway } from "@providers/http-client/http-client-gateway"

export class HttpClient implements HttpClientGateway {
    private httpClient

    constructor() {
        this.httpClient = axios
    }

    async get<T>(route: string, config: HttpClientConfig): Promise<T> {
        const { data } = await this.httpClient.get<T>(route, config)
        return data
    }
}