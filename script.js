const emojis = ["😍", "😍", "🩷", "🩷", "😵‍💫", "😵‍💫", "😭", "😭", "😎", "😎", "😄", "😄", "🤬", "🤬", "👍", "👍"];
let timeoutId;
let isChecking = false;

function shuffleAndDisplayEmojis() {
    document.querySelector('h2').textContent = "Memory Game";
    
    let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);

    const gameContainer = document.querySelector(".game");
    gameContainer.innerHTML = '';

    shuffleEmojis.forEach(emoji => {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = emoji;

        box.onclick = function() {
            if (isChecking || this.classList.contains('boxMatch')) return; // Prevent clicking if checking or already matched

            this.classList.add("boxSelected");

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            const selectedBoxes = document.querySelectorAll('.boxSelected');
            if (selectedBoxes.length > 1) {
                isChecking = true; // Set flag to true before timeout
                timeoutId = setTimeout(() => {
                    const [firstBox, secondBox] = selectedBoxes;
                    if (firstBox.innerHTML === secondBox.innerHTML) {
                        firstBox.classList.add('boxMatch');
                        secondBox.classList.add('boxMatch');
                        firstBox.classList.remove('boxSelected');
                        secondBox.classList.remove('boxSelected');

                        if (document.querySelectorAll('.boxMatch').length === emojis.length) {
                            document.querySelector('h2').textContent = "You win!";
                            confetti();
                        }
                    } else {
                        firstBox.classList.remove('boxSelected');
                        secondBox.classList.remove('boxSelected');
                    }
                    isChecking = false; // Reset flag after checking
                }, 500); // Timeout for checking
            }
        }
        gameContainer.appendChild(box);
    });
}

document.querySelector(".reset").addEventListener("click", shuffleAndDisplayEmojis);

shuffleAndDisplayEmojis();