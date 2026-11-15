
const perguntas = [
    {
        pergunta: "Qual é a posição de Vênus em relação ao Sol?",
        opcoes: ["Primeiro planeta", "Segundo planeta", "Terceiro planeta"],
        correta: 1,
        explicacao: "Isso mesmo! Vênus é o segundo planeta a partir do Sol."
    },
    {
        pergunta: "Qual é a temperatura média da superfície de Vênus?",
        opcoes: ["100 °C", "467 °C", "15 °C"],
        correta: 1,
        explicacao: "Correto! A superfície de Vênus chega a aproximadamente 467 °C."
    },
    {
        pergunta: "Por que Vênus é o planeta mais quente do Sistema Solar?",
        opcoes: [
            "Por causa do intenso efeito estufa",
            "Porque possui muitos vulcões ativos",
            "Porque é o planeta mais próximo do Sol"
        ],
        correta: 0,
        explicacao: "Muito bem! Sua atmosfera densa retém muito calor por meio do efeito estufa."
    },
    {
        pergunta: "Qual gás existe em maior quantidade na atmosfera de Vênus?",
        opcoes: ["Oxigênio", "Hidrogênio", "Dióxido de carbono"],
        correta: 2,
        explicacao: "A atmosfera de Vênus é formada principalmente por dióxido de carbono."
    },
    {
        pergunta: "De que são formadas as nuvens de Vênus?",
        opcoes: [
            "Gotículas de ácido sulfúrico",
            "Cristais de gelo",
            "Vapor de água pura"
        ],
        correta: 0,
        explicacao: "Isso mesmo! As nuvens de Vênus contêm gotículas de ácido sulfúrico."
    },
    {
        pergunta: "Quantas luas Vênus possui?",
        opcoes: ["Uma", "Nenhuma", "Duas"],
        correta: 1,
        explicacao: "Correto! Vênus não possui satélites naturais conhecidos."
    },
    {
        pergunta: "Qual é o diâmetro aproximado de Vênus?",
        opcoes: ["12.104 km", "50.000 km", "6.000 km"],
        correta: 0,
        explicacao: "Muito bem! Seu diâmetro é de aproximadamente 12.104 quilômetros."
    },
    {
        pergunta: "Quanto tempo Vênus leva para dar uma volta ao redor do Sol?",
        opcoes: [
            "365 dias terrestres",
            "243 dias terrestres",
            "225 dias terrestres"
        ],
        correta: 2,
        explicacao: "Isso mesmo! Um ano em Vênus dura aproximadamente 225 dias terrestres."
    },
    {
        pergunta: "Quanto tempo Vênus leva para completar uma rotação em torno de si mesmo?",
        opcoes: [
            "24 horas",
            "243 dias terrestres",
            "30 dias terrestres"
        ],
        correta: 1,
        explicacao: "Correto! Uma rotação de Vênus demora aproximadamente 243 dias terrestres."
    },
    {
        pergunta: "Em qual direção o Sol nasce em Vênus?",
        opcoes: ["No oeste", "No leste", "No norte"],
        correta: 0,
        explicacao: "Muito bem! Como Vênus gira no sentido retrógrado, o Sol nasce no oeste."
    },
    {
        pergunta: "Qual é a pressão atmosférica na superfície de Vênus em comparação com a Terra?",
        opcoes: [
            "Igual à da Terra",
            "Duas vezes maior",
            "Aproximadamente 93 vezes maior"
        ],
        correta: 2,
        explicacao: "Isso mesmo! A pressão na superfície venusiana é cerca de 93 vezes a pressão ao nível do mar na Terra."
    },
    {
        pergunta: "Como é a superfície de Vênus?",
        opcoes: [
            "É coberta por oceanos",
            "Possui rochas, montanhas e vulcões",
            "É formada somente por gelo"
        ],
        correta: 1,
        explicacao: "Correto! Vênus possui uma superfície rochosa com montanhas, planícies e vulcões."
    },
    {
        pergunta: "Qual sonda espacial utilizou radar para mapear a superfície de Vênus?",
        opcoes: ["Magellan", "Voyager 1", "Juno"],
        correta: 0,
        explicacao: "Muito bem! A sonda Magellan utilizou radar para estudar a superfície escondida pelas nuvens."
    },
    {
        pergunta: "Por que Vênus é conhecido como planeta irmão da Terra?",
        opcoes: [
            "Porque possui os mesmos oceanos",
            "Porque tem tamanho e estrutura semelhantes",
            "Porque possui vida conhecida"
        ],
        correta: 1,
        explicacao: "Isso mesmo! Vênus tem tamanho e estrutura rochosa semelhantes aos da Terra."
    },
    {
        pergunta: "De onde vem o nome Vênus?",
        opcoes: [
            "De uma deusa romana do amor e da beleza",
            "De um antigo cientista",
            "De uma constelação"
        ],
        correta: 0,
        explicacao: "Correto! Vênus recebeu o nome da deusa romana do amor e da beleza."
    }
];

const elementoPergunta = document.getElementById("quiz-pergunta");
const elementoOpcoes = document.getElementById("quiz-opcoes");
const elementoFeedback = document.getElementById("quiz-feedback");

const botaoProximo = document.getElementById("quiz-novo");
const botaoReiniciar = document.getElementById("quiz-reiniciar");

const contador = document.getElementById("quiz-contador");
const pontosTexto = document.getElementById("quiz-pontos");
const barra = document.getElementById("quiz-barra-preenchida");

const telaFinal = document.getElementById("quiz-final");
const resultado = document.getElementById("quiz-resultado");

let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;


// MOSTRAR PERGUNTA

function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];

    respondeu = false;

    elementoPergunta.hidden = false;
    elementoOpcoes.hidden = false;
    elementoFeedback.hidden = false;
    botaoProximo.hidden = false;

    contador.hidden = false;
    pontosTexto.hidden = false;

    telaFinal.hidden = true;

    contador.textContent =
        `PERGUNTA ${perguntaAtual + 1} DE ${perguntas.length}`;

    pontosTexto.textContent = `PONTOS: ${pontos}`;

    barra.style.width =
        `${(perguntaAtual / perguntas.length) * 100}%`;

    elementoPergunta.textContent = pergunta.pergunta;

    elementoOpcoes.innerHTML = "";

    elementoFeedback.textContent =
        "Escolha uma resposta para continuar.";

    elementoFeedback.className = "quiz-feedback";

    botaoProximo.disabled = true;

    botaoProximo.textContent =
        perguntaAtual === perguntas.length - 1
        ? "VER RESULTADO"
        : "PRÓXIMA PERGUNTA";


    pergunta.opcoes.forEach((opcao, indice) => {

        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = opcao;

        botao.addEventListener("click", function () {
            conferirResposta(indice, botao);
        });

        elementoOpcoes.appendChild(botao);

    });
}


// CONFERIR RESPOSTA

function conferirResposta(indice, botaoSelecionado) {

    if (respondeu) {
        return;
    }

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];

    const botoes = elementoOpcoes.querySelectorAll("button");

    botoes.forEach(function (botao) {
        botao.disabled = true;
    });


    if (indice === pergunta.correta) {

        pontos++;

        botaoSelecionado.classList.add("resposta-certa");

        elementoFeedback.textContent =
            "Resposta correta! " + pergunta.explicacao;

        elementoFeedback.classList.add("feedback-certo");

    } else {

        botaoSelecionado.classList.add("resposta-errada");

        botoes[pergunta.correta].classList.add("resposta-certa");

        elementoFeedback.textContent =
            "Resposta incorreta. " + pergunta.explicacao;

        elementoFeedback.classList.add("feedback-errado");

    }

    pontosTexto.textContent = `PONTOS: ${pontos}`;

    botaoProximo.disabled = false;

}


// AVANÇAR PERGUNTA

botaoProximo.addEventListener("click", function () {

    if (!respondeu) {
        return;
    }

    if (perguntaAtual < perguntas.length - 1) {

        perguntaAtual++;

        mostrarPergunta();

    } else {

        finalizarQuiz();

    }

});


// RESULTADO FINAL

function finalizarQuiz() {

    elementoPergunta.hidden = true;
    elementoOpcoes.hidden = true;
    elementoFeedback.hidden = true;
    botaoProximo.hidden = true;

    contador.hidden = true;
    pontosTexto.hidden = true;

    barra.style.width = "100%";

    telaFinal.hidden = false;

    let mensagem = "";

    if (pontos === perguntas.length) {

        mensagem =
            "Incrível! Você acertou todas as perguntas. Zeus ficou impressionado com seus conhecimentos!";

    } else if (pontos >= 10) {

        mensagem =
            "Muito bem! Você conhece bastante sobre Vênus. Zeus está pronto para continuar!";

    } else if (pontos >= 6) {

        mensagem =
            "Bom trabalho! Você aprendeu várias coisas sobre Vênus. Continue explorando!";

    } else {

        mensagem =
            "A missão foi desafiadora! Você pode revisar as informações e tentar novamente.";

    }

    resultado.textContent =
        `Você acertou ${pontos} de ${perguntas.length} perguntas. ${mensagem}`;

}


// REINICIAR QUIZ

botaoReiniciar.addEventListener("click", function () {

    perguntaAtual = 0;
    pontos = 0;

    mostrarPergunta();

});


// INICIAR

mostrarPergunta();
