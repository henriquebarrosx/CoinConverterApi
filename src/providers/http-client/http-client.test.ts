import { HttpClient } from "./http-client"

describe("HttpClient", () => {
    const client = new HttpClient()
    
    test("should make a http request returning a status 200 and cep data", async () => {
        const response = await client.get("https://viacep.com.br/ws/01001000/json/")
        
        expect(response).toMatchObject({
            "cep": "01001-000",
            "logradouro": "Praça da Sé",
            "complemento": "lado ímpar",
            "bairro": "Sé",
            "localidade": "São Paulo",
            "uf": "SP",
            "ibge": "3550308",
            "gia": "1004",
            "ddd": "11",
            "siafi": "7107"
        })
    })

    test("should make a http request that results in a bad request (400)", async () => {        
        await client.get("https://viacep.com.br/ws/010010009/json/").catch((error) => {
            expect(error?.response?.status).toEqual(400)
        })
    })
})