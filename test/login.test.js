const Login = require("../src/login");

describe("Login", () => {
    let login;

    beforeEach(() => {
        login = new Login("usuario@email.com", "senha1234");
    });

    describe("constructor", () => {
        test("deve inicializar com os valores corretos", () => {
            expect(login.email).toBe("usuario@email.com");
            expect(login.senha).toBe("senha1234");
            expect(login.autenticado).toBe(false);
            expect(login.tentativas).toBe(0);
        });
    });

    describe("validarEmail", () => {
        test("deve retornar true para email válido", () => {
            expect(login.validarEmail()).toBe(true);
        });

        test("deve retornar false para email sem @", () => {
            login.email = "usuarioemail.com";
            expect(login.validarEmail()).toBe(false);
        });

        test("deve retornar false para email sem domínio", () => {
            login.email = "usuario@";
            expect(login.validarEmail()).toBe(false);
        });

        test("deve retornar false para email com espaços", () => {
            login.email = "usu ario@email.com";
            expect(login.validarEmail()).toBe(false);
        });
    });

    describe("validarSenha", () => {
        test("deve retornar true para senha com 8 ou mais caracteres", () => {
            expect(login.validarSenha()).toBe(true);
        });

        test("deve retornar false para senha com menos de 8 caracteres", () => {
            login.senha = "123";
            expect(login.validarSenha()).toBe(false);
        });

        test("deve retornar true para senha com exatamente 8 caracteres", () => {
            login.senha = "12345678";
            expect(login.validarSenha()).toBe(true);
        });
    });

    describe("verificarEmail", () => {
        test("deve retornar true quando o email corresponde", () => {
            expect(login.verificarEmail("usuario@email.com")).toBe(true);
        });

        test("deve retornar false quando o email não corresponde", () => {
            expect(login.verificarEmail("outro@email.com")).toBe(false);
        });
    });

    describe("verificarSenha", () => {
        test("deve retornar true quando a senha corresponde", () => {
            expect(login.verificarSenha("senha1234")).toBe(true);
        });

        test("deve retornar false quando a senha não corresponde", () => {
            expect(login.verificarSenha("errada123")).toBe(false);
        });
    });

    describe("realizarLogin", () => {
        test("deve autenticar com credenciais corretas", () => {
            const resultado = login.realizarLogin(
                "usuario@email.com",
                "senha1234"
            );

            expect(resultado).toBe(true);
            expect(login.autenticado).toBe(true);
            expect(login.tentativas).toBe(0);
        });

        test("deve falhar com email incorreto", () => {
            const resultado = login.realizarLogin(
                "errado@email.com",
                "senha1234"
            );

            expect(resultado).toBe(false);
            expect(login.autenticado).toBe(false);
            expect(login.tentativas).toBe(1);
        });

        test("deve falhar com senha incorreta", () => {
            const resultado = login.realizarLogin(
                "usuario@email.com",
                "errada123"
            );

            expect(resultado).toBe(false);
            expect(login.autenticado).toBe(false);
            expect(login.tentativas).toBe(1);
        });

        test("deve incrementar tentativas a cada falha", () => {
            login.realizarLogin("errado@email.com", "errada123");
            login.realizarLogin("errado@email.com", "errada123");

            expect(login.tentativas).toBe(2);
        });

        test("deve resetar tentativas após login bem-sucedido", () => {
            login.tentativas = 3;

            login.realizarLogin(
                "usuario@email.com",
                "senha1234"
            );

            expect(login.tentativas).toBe(0);
        });
    });

    describe("realizarLogout", () => {
        test("deve desautenticar o usuário e retornar true", () => {
            login.autenticado = true;

            const resultado = login.realizarLogout();

            expect(resultado).toBe(true);
            expect(login.autenticado).toBe(false);
        });
    });

    describe("estaAutenticado", () => {
        test("deve retornar o estado de autenticação atual", () => {
            expect(login.estaAutenticado()).toBe(false);

            login.autenticado = true;

            expect(login.estaAutenticado()).toBe(true);
        });
    });

    describe("obterEmail / alterarEmail", () => {
        test("deve obter o email atual", () => {
            expect(login.obterEmail()).toBe("usuario@email.com");
        });

        test("deve alterar o email", () => {
            login.alterarEmail("novo@email.com");

            expect(login.email).toBe("novo@email.com");
        });
    });

    describe("obterSenha / alterarSenha", () => {
        test("deve obter a senha atual", () => {
            expect(login.obterSenha()).toBe("senha1234");
        });

        test("deve alterar a senha", () => {
            login.alterarSenha("novaSenha123");

            expect(login.senha).toBe("novaSenha123");
        });
    });

    describe("obterTentativas / resetarTentativas", () => {
        test("deve obter o número de tentativas", () => {
            login.tentativas = 3;

            expect(login.obterTentativas()).toBe(3);
        });

        test("deve resetar as tentativas para zero", () => {
            login.tentativas = 3;

            login.resetarTentativas();

            expect(login.tentativas).toBe(0);
        });
    });

    describe("limiteTentativas", () => {
        test("deve retornar false quando abaixo do limite padrão", () => {
            login.tentativas = 4;

            expect(login.limiteTentativas()).toBe(false);
        });

        test("deve retornar true quando atinge o limite padrão", () => {
            login.tentativas = 5;

            expect(login.limiteTentativas()).toBe(true);
        });

        test("deve respeitar um limite customizado", () => {
            login.tentativas = 2;

            expect(login.limiteTentativas(2)).toBe(true);
            expect(login.limiteTentativas(3)).toBe(false);
        });
    });

    describe("bloquearLogin", () => {
        test("deve definir tentativas para 5", () => {
            login.bloquearLogin();

            expect(login.tentativas).toBe(5);
        });
    });

    describe("loginPermitido", () => {
        test("deve retornar true quando tentativas abaixo de 5", () => {
            login.tentativas = 4;

            expect(login.loginPermitido()).toBe(true);
        });

        test("deve retornar false quando tentativas atingem 5", () => {
            login.tentativas = 5;

            expect(login.loginPermitido()).toBe(false);
        });
    });

    describe("limparDados", () => {
        test("deve limpar todos os dados do usuário", () => {
            login.autenticado = true;
            login.tentativas = 3;

            login.limparDados();

            expect(login.email).toBe("");
            expect(login.senha).toBe("");
            expect(login.autenticado).toBe(false);
            expect(login.tentativas).toBe(0);
        });
    });

    describe("atualizarEmail", () => {
        test("deve atualizar e retornar o novo email", () => {
            const resultado = login.atualizarEmail(
                "atualizado@email.com"
            );

            expect(resultado).toBe("atualizado@email.com");
            expect(login.email).toBe("atualizado@email.com");
        });
    });

    describe("atualizarSenha", () => {
        test("deve atualizar e retornar a nova senha", () => {
            const resultado = login.atualizarSenha(
                "novaSenhaAtualizada"
            );

            expect(resultado).toBe("novaSenhaAtualizada");
            expect(login.senha).toBe("novaSenhaAtualizada");
        });
    });

    describe("statusLogin", () => {
        test('deve retornar "Usuário não logado" quando não autenticado', () => {
            expect(login.statusLogin()).toBe("Usuário não logado");
        });

        test('deve retornar "Usuário logado" quando autenticado', () => {
            login.autenticado = true;

            expect(login.statusLogin()).toBe("Usuário logado");
        });
    });
});
