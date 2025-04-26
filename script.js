const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
let isAnimating = false;
let lastQuadrant = -1;
let consecutiveMoves = 0;

function getRandomPosition() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    
    const safeWidth = viewportWidth * 0.8;
    const safeHeight = viewportHeight * 0.8;
    
    const marginX = (viewportWidth - safeWidth) / 2;
    const marginY = (viewportHeight - safeHeight) / 2;
    
    const yesButtonRect = yesButton.getBoundingClientRect();
    const yesButtonCenterX = yesButtonRect.left + yesButtonRect.width / 2;
    const yesButtonCenterY = yesButtonRect.top + yesButtonRect.height / 2;
    
    let randomX, randomY;
    
    let quadrant;
    do {
        quadrant = Math.floor(Math.random() * 4);
    } while (quadrant === lastQuadrant);
    lastQuadrant = quadrant;
    
    const baseMoveArea = 0.15;
    const moveAreaMultiplier = Math.min(1 + (consecutiveMoves * 0.1), 2);
    
    const moveAreaX = safeWidth * (baseMoveArea * moveAreaMultiplier);
    const moveAreaY = safeHeight * (baseMoveArea * moveAreaMultiplier);
    
    const directionVariation = Math.random() * 0.3 - 0.15;
    
    switch(quadrant) {
        case 0:
            randomX = yesButtonCenterX - moveAreaX * (1 + directionVariation);
            randomY = yesButtonCenterY - moveAreaY * (1 + directionVariation);
            break;
        case 1:
            randomX = yesButtonCenterX + moveAreaX * (1 + directionVariation);
            randomY = yesButtonCenterY - moveAreaY * (1 + directionVariation);
            break;
        case 2:
            randomX = yesButtonCenterX - moveAreaX * (1 + directionVariation);
            randomY = yesButtonCenterY + moveAreaY * (1 + directionVariation);
            break;
        case 3:
            randomX = yesButtonCenterX + moveAreaX * (1 + directionVariation);
            randomY = yesButtonCenterY + moveAreaY * (1 + directionVariation);
            break;
    }
    
    const bounceDistance = 50;
    
    if (randomX < marginX + buttonWidth/2) {
        randomX = marginX + buttonWidth/2 + bounceDistance;
    } else if (randomX > viewportWidth - marginX - buttonWidth/2) {
        randomX = viewportWidth - marginX - buttonWidth/2 - bounceDistance;
    }
    
    if (randomY > viewportHeight - marginY - buttonHeight/2) {
        randomY = viewportHeight - marginY - buttonHeight/2 - bounceDistance;
    }
    
    const randomRotation = Math.floor(Math.random() * 10) - 5;
    const randomScale = 0.98 + Math.random() * 0.04;
    
    return { randomX, randomY, randomRotation, randomScale };
}

function applyAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    
    const { randomX, randomY, randomRotation, randomScale } = getRandomPosition();
    
    noButton.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    noButton.style.transform = `translate(${randomX - noButton.getBoundingClientRect().left}px, ${randomY - noButton.getBoundingClientRect().top}px) rotate(${randomRotation}deg) scale(${randomScale})`;
    noButton.style.opacity = '0.9';
    
    consecutiveMoves++;
    
    setTimeout(() => {
        isAnimating = false;
        noButton.style.opacity = '1';
        
        setTimeout(() => {
            consecutiveMoves = 0;
        }, 1000);
    }, 600);
}

noButton.addEventListener('mouseenter', () => {
    applyAnimation();
});

noButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    applyAnimation();
});

noButton.addEventListener('mousemove', (e) => {
    const rect = noButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
    );
    
    if (distance < 100 && !isAnimating) {
        applyAnimation();
    }
});
