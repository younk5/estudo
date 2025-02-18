// Main navigation functionality
function showSection(sectionId) {
  // Esconde todas as seções
  document.querySelectorAll('.content-section').forEach(section => {
      section.style.display = 'none';
      section.classList.remove('fade-in');
  });

  // Mostra a seção específica se existir
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
      targetSection.style.display = 'block';
      targetSection.classList.add('fade-in');
  } else {
      console.warn(`Seção "${sectionId}" não encontrada.`);
  }

  // Atualiza o botão ativo
  document.querySelectorAll('.nav-button').forEach(button => {
      button.classList.remove('active');
  });

  const activeButton = document.querySelector(`.nav-button[data-section="${sectionId}"]`);
  if (activeButton) {
      activeButton.classList.add('active');
  }
}

  // Quiz functionality
  function checkAnswer(questionId, selectedOption) {
    const correctAnswers = {
      1: 'c'
    };
    const feedback = document.querySelector(`#questao-${questionId} .questao-feedback`);
    const feedbackContent = feedback.querySelector('.feedback-content');
    
    if (selectedOption === correctAnswers[questionId]) {
      feedbackContent.innerHTML = `
        <h4>🎉 Correto!</h4>
        <p>Os direitos fundamentais podem sofrer limitações previstas na própria Constituição, não sendo absolutos.</p>
      `;
    } else {
      feedbackContent.innerHTML = `
        <h4>❌ Incorreto</h4>
        <p>A alternativa correta é a ${correctAnswers[questionId].toUpperCase()}. Os direitos fundamentais podem sofrer limitações previstas na própria Constituição, não sendo absolutos.</p>
      `;
    }
    feedback.style.display = 'block';
  }
  
  // Feedback toast
  function showFeedback(message, emoji) {
    let toast = document.getElementById('feedback-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'feedback-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--card-color);
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        box-shadow: 0 4px 15px var(--shadow-color);
        border: 2px solid var(--primary-color);
        transform: translateY(150%);
        transition: transform 0.3s ease-out;
        z-index: 1000;
      `;
      document.body.appendChild(toast);
    }
  
    toast.innerHTML = `${emoji} ${message}`;
    toast.style.transform = 'translateY(0)';
  
    setTimeout(() => {
      toast.style.transform = 'translateY(150%)';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }
  
  // Add sparkle effect to emojis
  document.addEventListener('DOMContentLoaded', () => {
    // Add sparkle effect to emojis in text
    document.querySelectorAll('h1, h2, h3, p').forEach(element => {
      element.innerHTML = element.innerHTML.replace(/[]/g, match => 
        `<span class="sparkle">${match}</span>`
      );
    });
  
    // Initialize first section
    showSection('universidades');
  });

  // Função para alternar entre as abas de disciplinas
  function switchSubjectTab(tabId) {
    document.querySelectorAll('.subject-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const selectedTab = document.querySelector(`.subject-tab[data-tab="${tabId}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    document.querySelectorAll('.subject-content').forEach(content => {
        content.style.display = 'none';
    });
    
    const selectedContent = document.getElementById(tabId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
  }


  const questao = document.querySelector('.questao');
  const options = questao.querySelectorAll('.option-button');
  const feedback = questao.querySelector('.questao-feedback');
  
  // Primeiro, marca a resposta correta/incorreta, depois desabilita
  options.forEach(option => {
      option.classList.remove('correct', 'incorrect');
  });
  
  // Marca a resposta selecionada
  const selectedButton = event.target; // Obtém o botão clicado
  const selectedOption = selectedButton.dataset.option; // Obtém a opção selecionada
  
  
  if (selectedOption === correctAnswers[questionId]) {
      selectedButton.classList.add('correct');
      feedback.querySelector('.feedback-content').innerHTML = `
          <h4>🎉 Correto!</h4>
          <p>Os direitos fundamentais podem sofrer limitações previstas na própria Constituição, não sendo absolutos.</p>
      `;
  } else {
      selectedButton.classList.add('incorrect');
      const correctButton = questao.querySelector(`button[onclick*="${correctAnswers[questionId]}"]`);
      correctButton.classList.add('correct');
      feedback.querySelector('.feedback-content').innerHTML = `
          <h4>❌ Incorreto</h4>
          <p>A alternativa correta é a ${correctAnswers[questionId].toUpperCase()}. Os direitos fundamentais podem sofrer limitações previstas na própria Constituição, não sendo absolutos.</p>
      `;
  }
  
  feedback.style.display = 'block';


// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Adiciona animação nos cards
  document.querySelectorAll('.subject-card, .questao').forEach(card => {
      card.classList.add('fade-in');
  });
});

// Timer functionality
let timer;
let seconds = 0;
let isRunning = false;

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
    document.getElementById('startTimer').style.display = 'none';
    document.getElementById('pauseTimer').style.display = 'inline-block';
  }
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
  document.getElementById('startTimer').style.display = 'inline-block';
  document.getElementById('pauseTimer').style.display = 'none';
}

function updateTimer() {
  seconds++;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const timerElement = document.getElementById('timer');
  if (timerElement) {
    timerElement.textContent = 
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  
  const totalStudyTimeElement = document.getElementById('totalStudyTime');
  if (totalStudyTimeElement) {
    totalStudyTimeElement.textContent = `${hours}h`;
  }
}


// Event listeners
document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('pauseTimer').addEventListener('click', pauseTimer);

// Initialize completed lessons counter
let completedLessons = 0;


function carregarSimulado(tipo) {
  const simulados = {
      fuvest: {
          tempo: 5 * 60 * 60, // 5 horas em segundos
          questoes: [] // array com questões da FUVEST
      },
      unb: {
          tempo: 5 * 60 * 60,
          questoes: [] // array com questões da UnB
      }
  };

  const simulado = simulados[tipo];
  if (simulado) {
    iniciarSimulado(simulado);
  } else {
    console.warn(`Simulado "${tipo}" não encontrado.`);
  }
}

function iniciarSimulado(simulado) {
  let tempoRestante = simulado.tempo;
  
  exibirQuestoes(simulado.questoes);
  
  const timer = setInterval(() => {
      tempoRestante--;
      atualizarTempoSimulado(tempoRestante);
      
      if (tempoRestante <= 0) {
          clearInterval(timer);
          finalizarSimulado();
      }
  }, 1000);
}

function gerarCronograma(vestibular) {
  const cronogramas = {
      fuvest: {
          inicio: "2025-03-01",
          fases: [
              {
                  nome: "Revisão Geral",
                  duracao: "2 meses",
                  materias: [
                      "Português",
                      "Literatura",
                      "História",
                      // mais matérias
                  ]
              },
              // mais fases
          ]
      },
      // outros vestibulares
  };
  
  const cronograma = cronogramas[vestibular];
  if (cronograma) {
    montarCronograma(cronograma);
  } else {
    console.warn(`Cronograma para "${vestibular}" não encontrado.`);
  }
}

function abrirMateria(nome) {
  window.location.href = "../materias/html/" + nome + ".html";
}



