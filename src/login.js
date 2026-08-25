class Login {
    constructor(email, senha) {
        this.email = email;
        this.senha = senha;
        this.autenticado = false;
        this.tentativas = 0;
    }

    validarEmail() {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    }

    validarSenha() {
        return this.senha.length >= 8;
    }

    verificarEmail(email) {
        return this.email === email;
    }

    verificarSenha(senha) {
        return this.senha === senha;
    }

    realizarLogin(email, senha) {
        if (this.verificarEmail(email) && this.verificarSenha(senha)) {
            this.autenticado = true;
            this.tentativas = 0;
            return true;
        }

        this.tentativas++;
        return false;
    }

    realizarLogout() {
        this.autenticado = false;
        return true;
    }

    estaAutenticado() {
        return this.autenticado;
    }

    obterEmail() {
        return this.email;
    }

    alterarEmail(novoEmail) {
        this.email = novoEmail;
    }

    obterSenha() {
        return this.senha;
    }

    alterarSenha(novaSenha) {
        this.senha = novaSenha;
    }

    obterTentativas() {
        return this.tentativas;
    }

    resetarTentativas() {
        this.tentativas = 0;
    }

    limiteTentativas(limite = 5) {
        return this.tentativas >= limite;
    }

    bloquearLogin() {
        this.tentativas = 5;
    }

    loginPermitido() {
        return this.tentativas < 5;
    }

    limparDados() {
        this.email = "";
        this.senha = "";
        this.autenticado = false;
        this.tentativas = 0;
    }

    atualizarEmail(novoEmail) {
        this.email = novoEmail;
        return this.email;
    }

    atualizarSenha(novaSenha) {
        this.senha = novaSenha;
        return this.senha;
    }

    statusLogin() {
        return this.autenticado ? "Usuário logado" : "Usuário não logado";
    }
}

module.exports = Login;
