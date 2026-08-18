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

        test("deve retornar uma string vazia quando receber string vazia", () => {
            expect(utils.inverter("")).toBe("");
        });

        test("deve inverter uma frase", () => {
            expect(utils.inverter("Olá mundo")).toBe("odnum álO");
        });
    });

    describe("ehPalindromo", () => {
        test("deve retornar true para um palíndromo", () => {
            expect(utils.ehPalindromo("arara")).toBe(true);
        });

        test("deve ignorar espaços e diferenças entre maiúsculas e minúsculas", () => {
            expect(utils.ehPalindromo("A grama é amarga")).toBe(true);
        });

        test("deve retornar false para uma palavra que não é palíndromo", () => {
            expect(utils.ehPalindromo("casa")).toBe(false);
        });

        test("deve retornar true para uma string vazia", () => {
            expect(utils.ehPalindromo("")).toBe(true);
        });
    });

    describe("capitalizar", () => {
        test("deve deixar a primeira letra de cada palavra maiúscula", () => {
            expect(utils.capitalizar("olá mundo")).toBe("Olá Mundo");
        });

        test("deve transformar o restante das letras em minúsculas", () => {
            expect(utils.capitalizar("OLÁ MUNDO")).toBe("Olá Mundo");
        });

        test("deve manter espaços vazios entre palavras", () => {
            expect(utils.capitalizar("olá  mundo")).toBe("Olá  Mundo");
        });
    });

    describe("contarOcorrencias", () => {
        test("deve contar as ocorrências de uma substring", () => {
            expect(utils.contarOcorrencias("banana", "na")).toBe(2);
        });

        test("deve retornar 0 quando a substring não existir", () => {
            expect(utils.contarOcorrencias("banana", "x")).toBe(0);
        });

        test("deve retornar 0 quando a substring for vazia", () => {
            expect(utils.contarOcorrencias("banana", "")).toBe(0);
        });

        test("deve contar ocorrências consecutivas", () => {
            expect(utils.contarOcorrencias("aaaa", "aa")).toBe(2);
        });
    });

    describe("removerEspacosExtras", () => {
        test("deve remover espaços do início e do fim", () => {
            expect(utils.removerEspacosExtras("  Olá mundo  ")).toBe("Olá mundo");
        });

        test("deve substituir múltiplos espaços entre palavras por um espaço", () => {
            expect(utils.removerEspacosExtras("Olá    mundo")).toBe("Olá mundo");
        });

        test("deve remover espaços, tabs e quebras de linha extras", () => {
            expect(utils.removerEspacosExtras("  Olá \t mundo \n teste  "))
                .toBe("Olá mundo teste");
        });

        test("deve retornar string vazia quando receber apenas espaços", () => {
            expect(utils.removerEspacosExtras("     ")).toBe("");
        });
    });

    describe("paraSlug", () => {
        test("deve transformar texto em slug", () => {
            expect(utils.paraSlug("Olá Mundo!")).toBe("ola-mundo");
        });

        test("deve remover acentos", () => {
            expect(utils.paraSlug("ação coração açúcar")).toBe(
                "acao-coracao-acucar"
            );
        });

        test("deve transformar espaços em hífens", () => {
            expect(utils.paraSlug("Olá meu amigo")).toBe("ola-meu-amigo");
        });

        test("deve remover caracteres especiais", () => {
            expect(utils.paraSlug("Olá, Mundo! @2026")).toBe("ola-mundo-2026");
        });

        test("deve remover espaços no início e no fim", () => {
            expect(utils.paraSlug("  Olá Mundo  ")).toBe("ola-mundo");
        });
    });

    describe("truncar", () => {
        test("deve retornar o texto completo quando não ultrapassa o tamanho", () => {
            expect(utils.truncar("Olá", 10)).toBe("Olá");
        });

        test("deve truncar o texto quando ultrapassar o tamanho", () => {
            expect(utils.truncar("Olá mundo", 3)).toBe("Olá...");
        });

        test("deve retornar apenas reticências quando o tamanho for zero", () => {
            expect(utils.truncar("Olá", 0)).toBe("...");
        });

        test("deve aceitar texto com tamanho exatamente igual ao limite", () => {
            expect(utils.truncar("Olá", 3)).toBe("Olá");
        });

        test("deve lançar erro quando o tamanho for negativo", () => {
            expect(() => utils.truncar("Olá", -1))
                .toThrow("O tamanho não pode ser negativo");
        });
    });

    describe("contarPalavras", () => {
        test("deve contar as palavras", () => {
            expect(utils.contarPalavras("Olá mundo")).toBe(2);
        });

        test("deve ignorar espaços extras", () => {
            expect(utils.contarPalavras("Olá    mundo   teste")).toBe(3);
        });

        test("deve ignorar espaços no início e no fim", () => {
            expect(utils.contarPalavras("  Olá mundo  ")).toBe(2);
        });

        test("deve retornar 0 para uma string vazia", () => {
            expect(utils.contarPalavras("")).toBe(0);
        });

        test("deve retornar 0 quando houver apenas espaços", () => {
            expect(utils.contarPalavras("     ")).toBe(0);
        });
    });

    describe("somenteLetras", () => {
        test("deve retornar true quando contém apenas letras", () => {
            expect(utils.somenteLetras("Olá")).toBe(true);
        });

        test("deve retornar false quando contém números", () => {
            expect(utils.somenteLetras("Olá123")).toBe(false);
        });

        test("deve retornar false quando contém espaços", () => {
            expect(utils.somenteLetras("Olá mundo")).toBe(false);
        });

        test("deve retornar false quando contém caracteres especiais", () => {
            expect(utils.somenteLetras("Olá!")).toBe(false);
        });

        test("deve retornar true para letras maiúsculas e minúsculas", () => {
            expect(utils.somenteLetras("AbCdEf")).toBe(true);
        });
    });

    describe("substituirTudo", () => {
        test("deve substituir todas as ocorrências", () => {
            expect(
                utils.substituirTudo(
                    "Olá mundo, mundo!",
                    "mundo",
                    "JavaScript"
                )
            ).toBe("Olá JavaScript, JavaScript!");
        });

        test("deve retornar o texto original quando o alvo não existir", () => {
            expect(
                utils.substituirTudo("Olá mundo", "teste", "JavaScript")
            ).toBe("Olá mundo");
        });

        test("deve substituir por uma string vazia", () => {
            expect(
                utils.substituirTudo("Olá mundo", " mundo", "")
            ).toBe("Olá");
        });

        test("deve lançar erro quando o alvo for vazio", () => {
            expect(() => utils.substituirTudo("Olá mundo", "", "teste"))
                .toThrow("O alvo não pode ser vazio");
        });
    });
});