// Função para criar estrelas
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 50;

    for(let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.innerHTML = '✦';
        starsContainer.appendChild(star);
    }
}

// Função para criar mini corações
function createHeart() {
    const heartContainer = document.querySelector('.heart-container');
    const heart = document.createElement('div');
    heart.className = 'mini-heart';
    heart.innerHTML = '♡';
    heart.style.left = '50%';
    heart.style.top = '50%';
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 50;
    const duration = Math.random() * 2 + 2;
    
    heart.style.transition = `all ${duration}s ease-out`;
    heart.style.opacity = '0';
    
    heartContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 100}px)`;
        heart.style.opacity = '1';
    }, 50);
    
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    setInterval(createHeart, 300);
});