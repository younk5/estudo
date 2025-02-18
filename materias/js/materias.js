// Surpresa fofa
const botaoFofo = document.getElementById("botao-fofo");
const surpresa = document.getElementById("surpresa");

botaoFofo.addEventListener("click", () => {
    const mensagens = [
        "🎀 Você é incrível! Continue estudando! 🎀",
        "🌟 Você é a melhor vai tirar a melhor nota 🌟",
        "🎀 Você é vai conquistar tudo o que deseja! 🎀"
    ];
    const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
    surpresa.textContent = mensagemAleatoria;
    surpresa.style.color = "#ff6fb3";
    surpresa.style.fontSize = "1.5rem";
});

// Botão de voltar ao topo
const botaoVoltarTopo = document.getElementById('voltar-ao-topo');

window.addEventListener('scroll', function () {
    botaoVoltarTopo.classList.toggle('visible', window.scrollY > 300);
});

botaoVoltarTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Sistema de navegação
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sistema de simulados (novo)


let questaoAtual = 0;
let respostas = [];
let simuladoAtivo = null;

function carregarSimulado(tipo) {
    simuladoAtivo = tipo;
    questaoAtual = 0;
    respostas = [];
    document.querySelectorAll('.subject-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[onclick="carregarSimulado('${tipo}')"]`).classList.add('active');
    mostrarQuestao();
    document.querySelector('[onclick="finalizarSimulado()"]').style.display = 'none';
}

function mostrarQuestao() {
    const container = document.getElementById('simulado-container');
    const questao = simulados[simuladoAtivo][questaoAtual];
    
    container.innerHTML = `
        <div class="questao">
            <div class="questao-header">
                <span class="questao-badge">${questao.materia}</span>
                <span>Questão ${questaoAtual + 1} de ${simulados[simuladoAtivo].length}</span>
            </div>
            <div class="questao-texto">
                <p>${questao.pergunta}</p>
            </div>
            <div class="questao-options">
                ${questao.opcoes.map((opcao, index) => `
                    <button class="option-button" onclick="selecionarResposta(${index})">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="option-text">${opcao}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    atualizarProgresso();
}

function selecionarResposta(opcaoIndex) {
    document.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
    event.target.closest('.option-button').classList.add('selected');
    respostas[questaoAtual] = opcaoIndex;
}

function proximaQuestao() {
    if (questaoAtual < simulados[simuladoAtivo].length - 1) {
        questaoAtual++;
        mostrarQuestao();
    }
    document.querySelector('[onclick="finalizarSimulado()"]').style.display = 
        questaoAtual === simulados[simuladoAtivo].length - 1 ? 'inline-block' : 'none';
}

function finalizarSimulado() {
    const acertos = simulados[simuladoAtivo].reduce((acc, questao, index) => 
        acc + (respostas[index] === questao.resposta ? 1 : 0), 0);
    
    document.getElementById('simulado-container').innerHTML = `
        <div class="highlight-box">
            <h3>📊 Resultado Final</h3>
            <p>Acertos: ${acertos}/${simulados[simuladoAtivo].length}</p>
            <p>Percentual: ${((acertos/simulados[simuladoAtivo].length)*100).toFixed(1)}%</p>
            <button class="study-button" onclick="carregarSimulado('${simuladoAtivo}')">Refazer Simulado</button>
        </div>
    `;
}

function atualizarProgresso() {
    document.getElementById('simulado-progress').style.width = 
        `${((questaoAtual + 1) / simulados[simuladoAtivo].length * 100)}%`;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Garante que a seção correta está visível
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section) showSection(section);
});