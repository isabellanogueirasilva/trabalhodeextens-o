
const tabuleiro = document.getElementById("tabuleiro");
const botaoConferir = document.getElementById("conferir");
const mensagem = document.getElementById("mensagem");
const barraProgresso = document.getElementById("barra-progresso");
const textoProgresso = document.getElementById("progresso-texto");
const finalMissao = document.getElementById("final-missao");

// Palavras e posições no tabuleiro
const palavras = [
    {
        numero: 1,
        resposta: "MERCURIO",
        linha: 4,
        coluna: 2,
        direcao: "horizontal"
    },
    {
        numero: 2,
        resposta: "PEQUENO",
        linha: 3,
        coluna: 3,
        direcao: "vertical"
    },
    {
        numero: 3,
        resposta: "FERRO",
        linha: 2,
        coluna: 4,
        direcao: "vertical"
    },
    {
        numero: 4,
        resposta: "CRATERAS",
        linha: 4,
        coluna: 5,
        direcao: "vertical"
    },
    {
        numero: 5,
        resposta: "LUAS",
        linha: 3,
        coluna: 6,
        direcao: "vertical"
    },
    {
        numero: 6,
        resposta: "ORBITA",
        linha: 3,
        coluna: 7,
        direcao: "vertical"
    },
    {
        numero: 7,
        resposta: "SOL",
        linha: 3,
        coluna: 9,
        direcao: "vertical"
    }
];

const casas = {};

// Organiza as letras de cada palavra
palavras.forEach(palavra => {

    for (let i = 0; i < palavra.resposta.length; i++) {

        let linha = palavra.linha;
        let coluna = palavra.coluna;

        if (palavra.direcao === "horizontal") {
            coluna += i;
        } else {
            linha += i;
        }

        const chave = `${linha}-${coluna}`;

        if (!casas[chave]) {
            casas[chave] = {
                letras: [],
                numero: null
            };
        }

        casas[chave].letras.push(palavra.resposta[i]);

        if (i === 0) {
            casas[chave].numero = palavra.numero;
        }
    }
});

// Verifica se existem letras diferentes no mesmo quadradinho
Object.keys(casas).forEach(chave => {
    const letras = casas[chave].letras;

    if (!letras.every(letra => letra === letras[0])) {
        console.error("Erro no cruzamento:", chave, letras);
    }
});

// Cria somente os quadradinhos que fazem parte das palavras
Object.keys(casas).forEach(chave => {

    const [linha, coluna] = chave.split("-").map(Number);

    const casa = document.createElement("div");
    casa.classList.add("casa");

    casa.style.gridRow = linha + 1;
    casa.style.gridColumn = coluna + 1;

    if (casas[chave].numero !== null) {
        const numero = document.createElement("span");
        numero.classList.add("numero");
        numero.textContent = casas[chave].numero;
        casa.appendChild(numero);
    }

    const campo = document.createElement("input");

    campo.type = "text";
    campo.maxLength = 1;
    campo.autocomplete = "off";
    campo.dataset.linha = linha;
    campo.dataset.coluna = coluna;
    campo.setAttribute("aria-label", `Linha ${linha + 1}, coluna ${coluna + 1}`);

    campo.addEventListener("input", () => {
        campo.value = campo.value
            .replace(/[^a-zA-Z]/g, "")
            .toUpperCase()
            .slice(0, 1);

        mensagem.textContent = "";
        casa.classList.remove("correta");
    });

    casa.appendChild(campo);
    tabuleiro.appendChild(casa);
});

// Confere as respostas
botaoConferir.addEventListener("click", () => {

    let quantidadeCorretas = 0;

    // Limpa a marcação anterior
    document.querySelectorAll(".casa").forEach(casa => {
        casa.classList.remove("correta");
    });

    palavras.forEach(palavra => {

        let respostaCorreta = true;
        const camposDaPalavra = [];

        for (let i = 0; i < palavra.resposta.length; i++) {

            let linha = palavra.linha;
            let coluna = palavra.coluna;

            if (palavra.direcao === "horizontal") {
                coluna += i;
            } else {
                linha += i;
            }

            const campo = tabuleiro.querySelector(
                `input[data-linha="${linha}"][data-coluna="${coluna}"]`
            );

            camposDaPalavra.push(campo);

            if (!campo || campo.value.toUpperCase() !== palavra.resposta[i]) {
                respostaCorreta = false;
            }
        }

        if (respostaCorreta) {
            quantidadeCorretas++;

            camposDaPalavra.forEach(campo => {
                campo.parentElement.classList.add("correta");
            });
        }
    });

    // Atualiza a barra de progresso
    const porcentagem = (quantidadeCorretas / palavras.length) * 100;

    barraProgresso.style.width = porcentagem + "%";
    textoProgresso.textContent =
        `${quantidadeCorretas} de ${palavras.length} palavras`;

    // Mostra o resultado
    if (quantidadeCorretas === palavras.length) {

        mensagem.textContent = "Todas as respostas estão corretas!";
        mensagem.style.color = "#F4B942";

        finalMissao.style.display = "block";

        finalMissao.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    } else {

        mensagem.textContent =
            `Você acertou ${quantidadeCorretas} de 7 palavras. Continue tentando!`;

        mensagem.style.color = "#E4773E";
    }
});
