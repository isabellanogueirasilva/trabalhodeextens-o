
const tabuleiro = document.getElementById("tabuleiro");
const cartas = document.querySelectorAll(".carta");

const elementoTempo = document.getElementById("tempo");
const elementoTentativas = document.getElementById("tentativas");
const elementoPares = document.getElementById("pares");

const barra = document.getElementById("barra");
const porcentagem = document.getElementById("porcentagem");

const mensagem = document.getElementById("mensagem-jogo");

const vitoria = document.getElementById("vitoria");

const tempoFinal = document.getElementById("tempo-final");
const tentativasFinal = document.getElementById("tentativas-final");

const botaoReiniciar = document.getElementById("reiniciar");
const botaoJogarNovamente = document.getElementById("jogar-novamente");

let primeiraCarta = null;
let segundaCarta = null;

let bloqueado = false;
let paresEncontrados = 0;
let tentativas = 0;

let segundos = 0;
let cronometro = null;
let tempoIniciado = false;
let temporizadorErro = null;


// EMBARALHAR CARTAS

function embaralharCartas() {

    const listaCartas = Array.from(cartas);

    listaCartas.sort(() => Math.random() - 0.5);

    listaCartas.forEach((carta) => {
        tabuleiro.appendChild(carta);
    });

}


// FORMATAR TEMPO

function formatarTempo(valor) {

    const minutos = Math.floor(valor / 60);
    const segundosRestantes = valor % 60;

    return (
        String(minutos).padStart(2, "0") +
        ":" +
        String(segundosRestantes).padStart(2, "0")
    );

}


// INICIAR CRONÔMETRO

function iniciarCronometro() {

    if (tempoIniciado) return;

    tempoIniciado = true;

    cronometro = setInterval(() => {

        segundos++;

        elementoTempo.textContent = formatarTempo(segundos);

    }, 1000);

}


// ATUALIZAR INFORMAÇÕES

function atualizarInformacoes() {

    elementoTentativas.textContent = tentativas;

    elementoPares.textContent = paresEncontrados + "/8";

    const progresso = (paresEncontrados / 8) * 100;

    barra.style.width = progresso + "%";

    porcentagem.textContent = progresso + "%";

}


// VIRAR CARTA

function virarCarta() {

    if (
        bloqueado ||
        this.classList.contains("virada") ||
        this.classList.contains("encontrada")
    ) {
        return;
    }

    iniciarCronometro();

    this.classList.add("virada");

    if (primeiraCarta === null) {

        primeiraCarta = this;

        mensagem.textContent = "Agora escolha outra carta!";

        return;

    }

    segundaCarta = this;

    tentativas++;

    atualizarInformacoes();

    verificarPar();

}


// VERIFICAR SE AS CARTAS COMBINAM

function verificarPar() {

    const par1 = primeiraCarta.dataset.par;
    const par2 = segundaCarta.dataset.par;

    if (par1 === par2) {

        primeiraCarta.classList.add("encontrada");
        segundaCarta.classList.add("encontrada");

        primeiraCarta.disabled = true;
        segundaCarta.disabled = true;

        paresEncontrados++;

        atualizarInformacoes();

        mensagem.textContent = "Muito bem! Você encontrou um par!";

        primeiraCarta = null;
        segundaCarta = null;

        if (paresEncontrados === 8) {

            finalizarJogo();

        }

    } else {

        bloqueado = true;

        mensagem.textContent = "Não combinam! Tente novamente.";

        temporizadorErro = setTimeout(() => {

            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");

            primeiraCarta = null;
            segundaCarta = null;

            bloqueado = false;

            mensagem.textContent = "Continue procurando os pares!";

        }, 1000);

    }

}


// FINALIZAR JOGO

function finalizarJogo() {

    clearInterval(cronometro);

    elementoTempo.textContent = formatarTempo(segundos);

    tempoFinal.textContent = formatarTempo(segundos);

    tentativasFinal.textContent = tentativas;

    mensagem.textContent = "Parabéns! Você encontrou todos os pares!";

    // ESCONDER AS CARTAS E O BOTÃO DE REINICIAR

    tabuleiro.style.display = "none";

    botaoReiniciar.style.display = "none";

    // MOSTRAR A MENSAGEM DE VITÓRIA

    setTimeout(() => {

        vitoria.classList.add("visivel");

        vitoria.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 500);

}


// REINICIAR JOGO

function reiniciarJogo() {

    clearInterval(cronometro);

    clearTimeout(temporizadorErro);

    primeiraCarta = null;
    segundaCarta = null;

    bloqueado = false;

    paresEncontrados = 0;
    tentativas = 0;
    segundos = 0;

    tempoIniciado = false;

    cronometro = null;
    temporizadorErro = null;

    elementoTempo.textContent = "00:00";

    elementoTentativas.textContent = "0";

    elementoPares.textContent = "0/8";

    barra.style.width = "0%";

    porcentagem.textContent = "0%";

    mensagem.textContent =
        "Boa sorte, explorador! Encontre todos os pares.";

    // ESCONDER A TELA DE VITÓRIA

    vitoria.classList.remove("visivel");

    // MOSTRAR O TABULEIRO NOVAMENTE

    tabuleiro.style.display = "grid";

    botaoReiniciar.style.display = "block";

    // VIRAR TODAS AS CARTAS

    cartas.forEach((carta) => {

        carta.classList.remove("virada");
        carta.classList.remove("encontrada");

        carta.disabled = false;

    });

    // EMBARALHAR NOVAMENTE

    embaralharCartas();

}


// EVENTOS DOS BOTÕES

cartas.forEach((carta) => {

    carta.addEventListener("click", virarCarta);

});

botaoReiniciar.addEventListener("click", reiniciarJogo);

botaoJogarNovamente.addEventListener("click", reiniciarJogo);


// INICIAR JOGO

reiniciarJogo();
