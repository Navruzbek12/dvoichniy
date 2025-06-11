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
    
    // Функции
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
    
    function checkAnswer() {
        const userAnswer = parseInt(binaryInput.join(''), 2);
        const gameBox = document.querySelector('.game-box');
        
        if (userAnswer === currentNumber) {
            score++;
            document.getElementById('score').textContent = score;
            gameBox.style.animation = 'bounce 1s';
            setTimeout(() => {
                gameBox.style.animation = '';
                generateRandomNumber();
            }, 1000);
        } else {
            gameBox.style.animation = 'shake 0.5s';
            setTimeout(() => gameBox.style.animation = '', 500);
        }
    }
    
    // Начальная инициализация
    generateRandomNumber();
});