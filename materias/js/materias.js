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

// Sistema de navegação principal
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sistema de navegação entre matérias
function abrirMateria(materia) {
    window.location.hash = materia;
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });

    const conteudoMaterias = {
        fisica: `
            <h2>⚛️ Física</h2>
            <div class="materia-content">
                <h3>Conteúdo Programático</h3>
                <ul>
                    <li>Mecânica Clássica</li>
                    <li>Termodinâmica</li>
                    <li>Eletromagnetismo</li>
                    <li>Óptica</li>
                </ul>
                <!-- Adicione mais conteúdo aqui -->
            </div>
        `,
        // Adicione outras matérias seguindo o mesmo padrão
        matematica: `
            <h2>🔢 Matemática</h2>
            <div class="materia-content">
                <!-- Conteúdo da matemática -->
            </div>
        `
    };

    document.getElementById('conteudo-materia').innerHTML = conteudoMaterias[materia] || '<p>Conteúdo não encontrado</p>';
    document.getElementById('pagina-materia').style.display = 'block';
}

function voltarParaMaterias() {
    window.location.hash = '';
    document.getElementById('pagina-materia').style.display = 'none';
    document.getElementById('materias').style.display = 'block';
}

// Sistema de simulados
let questaoAtual = 0;
let respostas = [];
let simuladoAtivo = null;

const simulados = {
    fisica: [
        {
            materia: "Física",
            pergunta: "Qual a fórmula da Segunda Lei de Newton?",
            opcoes: ["F = ma", "E = mc²", "V = Vo + at", "P = mv"],
            resposta: 0
        }
        // Adicione mais questões
    ]
    // Adicione outros simulados
};

function carregarSimulado(tipo) {
    simuladoAtivo = tipo;
    questaoAtual = 0;
    respostas = [];
    mostrarQuestao();
}

// ... (mantenha o restante do código de simulados como está)

// Gerenciamento de estado inicial
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se há hash na URL
    if(window.location.hash) {
        const materia = window.location.hash.substring(1);
        abrirMateria(materia);
    }
});

// Configurar navegação por hash
window.addEventListener('hashchange', () => {
    const materia = window.location.hash.substring(1);
    if(materia) abrirMateria(materia);
});