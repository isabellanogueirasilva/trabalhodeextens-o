
const tabuleiro = document.getElementById("tabuleiro");
const mensagem = document.getElementById("mensagem");
const botaoLimpar = document.getElementById("limpar");

const barraProgresso = document.getElementById("barra-progresso");
const textoProgresso = document.getElementById("progresso-texto");
const finalMissao = document.getElementById("final-missao");

const tamanho = 13;

const palavras = [
    {
        nome: "NETUNO",
        linha: 0,
        coluna: 0,
        direcao: "horizontal"
    },
    {
        nome: "VENTOS",
        linha: 2,
        coluna: 5,
        direcao: "vertical"
    },
    {
        nome: "AZUL",
        linha: 4,
        coluna: 0,
        direcao: "horizontal"
    },
    {
        nome: "GELO",
        linha: 9,
        coluna: 1,
        direcao: "horizontal"
    },
    {
        nome: "METANO",
        linha: 1,
        coluna: 8,
        direcao: "vertical"
    },
    {
        nome: "OITAVO",
        linha: 4,
        coluna: 10,
        direcao: "vertical"
    },
    {
        nome: "SOL",
        linha: 7,
        coluna: 6,
        direcao: "vertical"
    },
    {
        nome: "TEMPESTADE",
        linha: 12,
        coluna: 1,
        direcao: "horizontal"
    }
];

let matriz = [];
let primeiraCasa = null;
let encontrados = [];

// Cria uma matriz vazia
function criarMatriz() {

    for (let linha = 0; linha < tamanho; linha++) {

        matriz[linha] = [];

        for (let coluna = 0; coluna < tamanho; coluna++) {
            matriz[linha][coluna] = "";
        }
    }
}

// Coloca as palavras no tabuleiro
function colocarPalavras() {

    palavras.forEach(palavra => {

        for (let i = 0; i < palavra.nome.length; i++) {

            let linha = palavra.linha;
            let coluna = palavra.coluna;

            if (palavra.direcao === "horizontal") {
                coluna += i;
            } else {
                linha += i;
            }

            matriz[linha][coluna] = palavra.nome[i];
        }
    });
}

// Preenche os espaços vazios com letras aleatórias
function preencherEspacos() {

    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let linha = 0; linha < tamanho; linha++) {

        for (let coluna = 0; coluna < tamanho; coluna++) {

            if (matriz[linha][coluna] === "") {

                const sorteio = Math.floor(Math.random() * letras.length);

                matriz[linha][coluna] = letras[sorteio];
            }
        }
    }
}

// Monta o caça-palavras na tela
function montarTabuleiro() {

    tabuleiro.innerHTML = "";

    for (let linha = 0; linha < tamanho; linha++) {

        for (let coluna = 0; coluna < tamanho; coluna++) {

            const casa = document.createElement("button");

            casa.type = "button";
            casa.classList.add("letra");

            casa.textContent = matriz[linha][coluna];

            casa.dataset.linha = linha;
            casa.dataset.coluna = coluna;

            casa.setAttribute(
                "aria-label",
                `Linha ${linha + 1}, coluna ${coluna + 1}, letra ${matriz[linha][coluna]}`
            );

            casa.addEventListener("click", () => selecionarCasa(casa));

            tabuleiro.appendChild(casa);
        }
    }
}

// Seleciona a primeira e a última letra
function selecionarCasa(casa) {

    if (casa.classList.contains("encontrada")) {
        return;
    }

    if (primeiraCasa === null) {

        limparSelecao();

        primeiraCasa = casa;
        casa.classList.add("selecionada");

        mensagem.textContent = "Agora escolha a última letra da palavra.";

        return;
    }

    const linhaInicial = Number(primeiraCasa.dataset.linha);
    const colunaInicial = Number(primeiraCasa.dataset.coluna);

    const linhaFinal = Number(casa.dataset.linha);
    const colunaFinal = Number(casa.dataset.coluna);

    // As palavras deste jogo estão na horizontal ou vertical
    const mesmaLinha = linhaInicial === linhaFinal;
    const mesmaColuna = colunaInicial === colunaFinal;

    if (!mesmaLinha && !mesmaColuna) {

        limparSelecao();

        primeiraCasa = casa;
        casa.classList.add("selecionada");

        mensagem.textContent = "Escolha uma palavra na horizontal ou vertical.";

        return;
    }

    verificarPalavra(casa);
}

// Confere se a sequência selecionada é uma palavra
function verificarPalavra(ultimaCasa) {

    const linhaInicial = Number(primeiraCasa.dataset.linha);
    const colunaInicial = Number(primeiraCasa.dataset.coluna);

    const linhaFinal = Number(ultimaCasa.dataset.linha);
    const colunaFinal = Number(ultimaCasa.dataset.coluna);

    const diferencaLinha = Math.sign(linhaFinal - linhaInicial);
    const diferencaColuna = Math.sign(colunaFinal - colunaInicial);

    const quantidade =
        Math.max(
            Math.abs(linhaFinal - linhaInicial),
            Math.abs(colunaFinal - colunaInicial)
        ) + 1;

    const caminho = [];

    for (let i = 0; i < quantidade; i++) {

        const linha = linhaInicial + diferencaLinha * i;
        const coluna = colunaInicial + diferencaColuna * i;

        const casa = tabuleiro.querySelector(
            `.letra[data-linha="${linha}"][data-coluna="${coluna}"]`
        );

        caminho.push(casa);
    }

    const resposta = caminho.map(casa => casa.textContent).join("");

    const respostaInvertida = resposta.split("").reverse().join("");

    const palavraEncontrada = palavras.find(palavra => {

        return (
            !encontrados.includes(palavra.nome) &&
            (
                palavra.nome === resposta ||
                palavra.nome === respostaInvertida
            )
        );

    });

    if (palavraEncontrada) {

        marcarPalavra(caminho, palavraEncontrada.nome);

    } else {

        mensagem.textContent = "Essa não é uma das palavras. Tente novamente!";

    }

    limparSelecao();
}

// Marca a palavra encontrada
function marcarPalavra(caminho, nome) {

    caminho.forEach(casa => {

        casa.classList.remove("selecionada");
        casa.classList.add("encontrada");

    });

    encontrados.push(nome);

    const item = document.querySelector(
        `.lista-palavras li[data-palavra="${nome}"]`
    );

    if (item) {
        item.classList.add("encontrada");
    }

    atualizarProgresso();

    mensagem.textContent = `Muito bem! Você encontrou ${nome}!`;

    if (encontrados.length === palavras.length) {

        mensagem.textContent = "Você encontrou todas as palavras!";

        finalMissao.style.display = "block";

        finalMissao.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

// Limpa a seleção atual
function limparSelecao() {

    document.querySelectorAll(".letra.selecionada").forEach(casa => {
        casa.classList.remove("selecionada");
    });

    primeiraCasa = null;
}

// Atualiza a barra de progresso
function atualizarProgresso() {

    const quantidade = encontrados.length;
    const porcentagem = (quantidade / palavras.length) * 100;

    barraProgresso.style.width = porcentagem + "%";

    textoProgresso.textContent =
        `${quantidade} de ${palavras.length}`;
}

// Botão para limpar a seleção
botaoLimpar.addEventListener("click", () => {

    limparSelecao();

    mensagem.textContent = "Seleção limpa. Escolha uma nova palavra!";

});

// Inicia o jogo
criarMatriz();
colocarPalavras();
preencherEspacos();
montarTabuleiro();
