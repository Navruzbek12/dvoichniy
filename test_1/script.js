document.addEventListener('DOMContentLoaded', () => {
    const BITS_COUNT = 10; // 10-битное число
    let currentNumber = 0;
    let score = 0;
    let binaryInput = new Array(BITS_COUNT).fill(0);

    // Создаем бинарные ячейки динамически
    const binaryContainer = document.getElementById('binaryContainer');

    for (let i = 0; i < BITS_COUNT; i++) {
        const cell = document.createElement('div');
        cell.className = 'binary-cell';
        cell.innerHTML = `
            <button class="arrow-btn up" data-index="${i}" data-value="1">▲</button>
            <span class="bit-value">0</span>
            <button class="arrow-btn down" data-index="${i}" data-value="0">▼</button>
        `;
        binaryContainer.appendChild(cell);
    }

    // Обработчики событий для всех кнопок
    document.querySelectorAll('.arrow-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const value = parseInt(this.dataset.value);
            binaryInput[index] = value;
            updateDisplay();
        });
    });

    // Проверка ответа
    document.getElementById('checkBtn').addEventListener('click', checkAnswer);

    function checkAnswer() {
        const userAnswer = parseInt(binaryInput.join(''), 2);
        const gameBox = document.querySelector('.game-box');

        // Удаляем предыдущие сообщения, если они есть
        const oldMessage = gameBox.querySelector('.result-message');
        if (oldMessage) oldMessage.remove();

        const messageElement = document.createElement('div');
        messageElement.className = 'result-message';
        gameBox.appendChild(messageElement);

        if (userAnswer === currentNumber) {
            score++;
            document.getElementById('score').textContent = score;
            messageElement.textContent = ' Поздравляю! Отличный результат!';
            messageElement.style.color = '#00ff00';
            gameBox.style.animation = 'bounce 1s';
            setTimeout(() => {
                gameBox.style.animation = '';
                messageElement.remove();
                generateRandomNumber();
            }, 2000);
        } else {
            messageElement.textContent = ' Попробуйте снова, у вас всё получится!';
            messageElement.style.color = '#ff9900';
            gameBox.style.animation = 'shake 0.5s';
            setTimeout(() => {
                gameBox.style.animation = '';
                messageElement.remove();
            }, 2000);
        }
    }

    function generateRandomNumber() {
        currentNumber = Math.floor(Math.random() * 1024); // 2^10 = 1024
        document.getElementById('decimalNumber').textContent = currentNumber;
        resetBinaryInput();
    }

    function resetBinaryInput() {
        binaryInput.fill(0);
        updateDisplay();
    }

    function updateDisplay() {
        document.querySelectorAll('.bit-value').forEach((span, index) => {
            span.textContent = binaryInput[index];
            span.style.color = binaryInput[index] ? '#00ff00' : '#ffffff';
        });
    }

    // Начальная инициализация
    generateRandomNumber();
});
