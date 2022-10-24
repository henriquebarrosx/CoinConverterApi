import { Transaction } from "./transaction"

describe("Transaction entity", () => {
    const transaction = new Transaction({
        id: "KAslsuh#Dodj20",
        userId: "hasuh#!D!odj29",
        amount: 5,
        conversionTax: 0.43,
        from: "BRL",
        to: "USD",
        createdAt: new Date("2022-10-20T19:00:00").toUTCString(),
    })

    test("should return value KAslsuh#Dodj20 as transaction id", () => {
        expect(transaction.getId()).toEqual("KAslsuh#Dodj20")
    })

    test("should return value loremipsum@123 as transaction id", () => {
        transaction.setId("loremipsum@123")
        expect(transaction.getId()).toEqual("loremipsum@123")
    })

    test("should return value hasuh#!D!odj29 as transaction user id", () => {
        expect(transaction.getUserId()).toEqual("hasuh#!D!odj29")
    })

    test("should return value hasuh#!D!odj29 as transaction user id", () => {
        transaction.setUserId("loremipsum#123")
        expect(transaction.getUserId()).toEqual("loremipsum#123")
    })

    test("should return value BRL as currency base", () => {
        expect(transaction.getCurrencyBase()).toEqual("BRL")
    })

    test("should return value USD as currency target", () => {
        expect(transaction.getCurrencyTarget()).toEqual("USD")
    })

    test("should return value 0.43 as conversion tax", () => {
        expect(transaction.getConversionTax()).toEqual(0.43)
    })

    test("should return value 5 as amount to be converted", () => {
        expect(transaction.getAmount()).toEqual(5)
    })

    test("should return the date that as created", () => {
        expect(transaction.getUtcDatetime()).toEqual("Thu, 20 Oct 2022 22:00:00 GMT")
    })

    test("should return the updated date", () => {
        const createdAt = new Date("2022-10-10T10:00:00").toUTCString()
        transaction.setUtcDatetime(createdAt)

        expect(transaction.getUtcDatetime()).toEqual("Mon, 10 Oct 2022 13:00:00 GMT")
    })

    test("should throw a error when set a invalid date", () => {
        const createdAt = new Date("2022-10-40T10:00:00").toUTCString()
        expect(() => transaction.setUtcDatetime(createdAt)).toThrowError("Invalid provided utc datetime")
    })

    test("should return the transaction object", () => {        
        expect(transaction.toJSON()).toMatchObject({
            id: "loremipsum@123",
            userId: "loremipsum#123",
            amount: 5,
            conversionTax: 0.43,
            from: "BRL",
            to: "USD",
            createdAt: "Mon, 10 Oct 2022 13:00:00 GMT",
        })
    })
})