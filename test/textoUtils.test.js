const TextoUtils = require("../src/textoUtils");

describe("TextoUtils", () => {
    let utils;

    beforeEach(() => {
        utils = new TextoUtils();
    });

    describe("inverter", () => {
        test("deve inverter uma string", () => {
            expect(utils.inverter("Olá")).toBe("álO");
        });

    });

    describe("ehPalindromo", () => {
        test("deve retornar true para um palíndromo", () => {
            expect(utils.ehPalindromo("arara")).toBe(true);
        });

    });

    describe("capitalizar", () => {
        test("deve deixar a primeira letra de cada palavra maiúscula", () => {
            expect(utils.capitalizar("olá mundo")).toBe("Olá Mundo");
        });
    });

    describe("contarOcorrencias", () => {
        test("deve contar as ocorrências de uma substring", () => {
            expect(utils.contarOcorrencias("banana", "na")).toBe(2);
        });
    });

    describe("removerEspacosExtras", () => {
        test("deve remover espaços do início e do fim", () => {
            expect(utils.removerEspacosExtras("  Olá mundo  ")).toBe("Olá mundo");
        });
    });

    describe("paraSlug", () => {
        test("deve transformar texto em slug", () => {
            expect(utils.paraSlug("Olá Mundo!")).toBe("ola-mundo");
        });
    });

    describe("truncar", () => {
        test("deve retornar o texto completo quando não ultrapassa o tamanho", () => {
            expect(utils.truncar("Olá", 10)).toBe("Olá");
        });
    });

    describe("contarPalavras", () => {
        test("deve contar as palavras", () => {
            expect(utils.contarPalavras("Olá mundo")).toBe(2);
        });
    });

    describe("somenteLetras", () => {
        test("deve retornar true quando contém apenas letras", () => {
            expect(utils.somenteLetras("Olá")).toBe(true);
        });
    });

    describe("substituirTudo", () => {
        test("deve substituir todas as ocorrências", () => {
            expect(
                utils.substituirTudo("Olá mundo, mundo!", "mundo", "JavaScript")
            ).toBe("Olá JavaScript, JavaScript!");
        });
    });
});
