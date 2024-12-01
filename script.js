const noButton = document.getElementById('noButton');

// Function to generate a random position within the viewport
function getRandomPosition() {
    // Get the max X and Y positions for the button to move
    const maxX = window.innerWidth - noButton.offsetWidth; // Max X within the viewport
    const maxY = window.innerHeight - noButton.offsetHeight; // Max Y within the viewport

    // Generate random positions within the bounds and multiply by 0.5 to further limit the range
    const randomX = Math.floor(Math.random() * maxX * 0.5); // Reduce the distance by 50%
    const randomY = Math.floor(Math.random() * maxY * 0.5); // Reduce the distance by 50%

    return { randomX, randomY };
}

// Move the "No" button randomly when mouse hovers close to it (for desktop)
noButton.addEventListener('mouseenter', () => {
    const { randomX, randomY } = getRandomPosition();

    // Apply a random position with smooth transition
    noButton.style.transition = 'transform 0.2s ease-in-out';  // Smooth transition
    noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;  // Move to random position
});

// Move the "No" button randomly on touch (for mobile)
noButton.addEventListener('touchstart', () => {
    const { randomX, randomY } = getRandomPosition();

    // Apply a random position with smooth transition
    noButton.style.transition = 'transform 0.2s ease-in-out';  // Smooth transition
    noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;  // Move to random position
});
