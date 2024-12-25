fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        document.getElementById('data').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
// Звуковые файлы
const clickSound = new Audio('click.mp3');
const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');

// Вопросы с картинками и исполнителями
const questions = [
    {
        lyrics: "Я опять на районе потерял себя в одном из дворов",
        options: ["Тринадцатый", "Это любовь", "Вечеринка"],
        answer: "Это любовь",
        image: "scryp.png", // Зпуть к изображению
        artist: "Skryptonite",
        songAudio: "1.mp3" // Путь к аудиофайлу
    },
    {
        lyrics: "Мы рядом с тобою шли",
        options: ["IVL", "Капкан", "Крепче"],
        answer: "IVL",
        image: "ivl.png", // Замените на путь к изображению
        artist: "MACAN, SCIRENA",
        songAudio: "2.mp3" // Путь к аудиофайлу
    },
    {
        lyrics: "Бітпейтін ұзын-қысқа, біздегі дағдарысқа",
        options: ["Alystama", "Beinen", "Zhauap Bar Ma?"],
        answer: "Zhauap Bar Ma?",
        image: "mldz.jpg", // Замените на путь к изображению
        artist: "Moldanazar",
        songAudio: "3.mp3" // Путь к аудиофайлу
    },
    {
        lyrics: "We don't talk anymore, like we used to do",
        options: ["We Don't Talk Anymore", "Attention", "Perfect"],
        answer: "We Don't Talk Anymore",
        image: "wdt.jpg", // Замените на путь к изображению
        artist: "Charlie Puth ft. Selena Gomez",
        songAudio: "4.mp3" // Путь к аудиофайлу
    },
    {
        lyrics: "Иə, сен күштісің, бірақ ең емес,",
        options: ["Алтыным", "Men Emes", "Bul Mahabbat"],
        answer: "Men Emes",
        image: "men.jpg", // Замените на путь к изображению
        artist: "Ninety One",
        songAudio: "5.mp3" // Путь к аудиофайлу
    }
];

let currentQuestionIndex = 0; // Переменная текущего вопроса в массиве вопросов
let score = 0; // Переменная для хранения текущего счета пользователя
let currentSong = null; // Переменная для хранения текущей песни

const questionElement = document.getElementById('question'); // Ссылка на элемент, в котором отображается текст текущего вопроса
const optionsContainer = document.getElementById('options-container'); // Контейнер для отображения вариантов ответа
const feedbackElement = document.getElementById('feedback'); // Элемент для отображения обратной связи (правильный или неправильный ответ)
const nextButton = document.getElementById('next-question'); // Кнопка для перехода к следующему вопросу
const imageContainer = document.getElementById('image-container'); // Контейнер для изображения артиста и информации о нем
const songImage = document.getElementById('song-image'); // Элемент для отображения изображения текущей песни
const artistElement = document.getElementById('artist'); // Элемент для отображения имени артиста текущей песни
const restartButton = document.getElementById('restart-quiz'); // Кнопка для перезапуска викторины

// Загрузка текущего вопроса и вариантов ответа
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `Lyrics: ${currentQuestion.lyrics}`;

    // Очищение предыдущих вариантов
    optionsContainer.innerHTML = '';

    // Генерация вариантов ответа
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => {
            clickSound.play(); // Воспроизведение клика
            checkAnswer(option); // Проверка ответа
        });
        optionsContainer.appendChild(button);
    });

    feedbackElement.textContent = ''; // Скрываем обратную связь
    nextButton.classList.add('hidden'); // Скрываем кнопку "Next Question"

    // Скрываем изображение и информацию об исполнителе
    imageContainer.classList.add('hidden');

    // Останавливаем песню при загрузке нового вопроса
    if (currentSong) {
        currentSong.pause();
        currentSong.currentTime = 0; // Сбрасываем время трека в начало
    }
}

// Проверка ответа
function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer; // Правильный ответ
    const currentQuestion = questions[currentQuestionIndex]; // Текущий вопрос

    // Показать изображение исполнителя, независимо от правильности ответа
    songImage.src = currentQuestion.image;
    artistElement.textContent = `Artist: ${currentQuestion.artist}`;
    imageContainer.classList.remove('hidden');

    // Проигрывание песни 
    if (currentSong) {
        currentSong.pause(); // Остановить предыдущую песню
    }
    currentSong = new Audio(currentQuestion.songAudio);
    currentSong.play();

    // Проверка правильности ответа
    if (selectedOption === correctAnswer) {
        feedbackElement.textContent = 'Correct!'; // Правильный ответ
        feedbackElement.style.color = 'green'; 
        correctSound.play(); // Проигрывание звука для правильного ответа
        score++; // Увеличение счета
    } else {
        feedbackElement.textContent = `Wrong! The correct answer was: ${correctAnswer}`; // Неправильный ответ
        feedbackElement.style.color = 'red';
        incorrectSound.play(); // Проигрывание звука для неправильного ответа
    }

    // Отключить все кнопки после выбора ответа
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => button.disabled = true);

    nextButton.classList.remove('hidden'); // Показываем кнопку "Next Question"
}


// Загрузка следующего вопроса
function nextQuestion() {
    clickSound.play();
    // Если это последний вопрос, скрываем картинку и имя артиста
    if (currentQuestionIndex === questions.length - 1) {
        imageContainer.classList.add('hidden'); // Скрыть изображение исполнителя
    }

    currentQuestionIndex++; // Переход к следующему вопросу

    // Загрузка следующего вопроса или завершение игры
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Загрузить новый вопрос
    } else {
        questionElement.textContent = `Quiz over! Your score is ${score}/${questions.length}.`; // Показать итоговый результат
        optionsContainer.innerHTML = '';  // Очистить варианты ответов
        nextButton.classList.add('hidden'); // Скрыть кнопку "Next Question"
        restartButton.classList.remove('hidden'); // Показать кнопку "Start Quiz Again"
    }
}


// Перезапуск викторины
function restartQuiz() {
    clickSound.play(); // Проигрывание звука для клика
    currentQuestionIndex = 0; // Сброс индекса текущего вопроса
    score = 0;  // Сброс счета
    restartButton.classList.add('hidden'); // Скрыть кнопку перезапуска
    loadQuestion(); // Загрузить первый вопрос
}

// Инициализация викторины
loadQuestion();

nextButton.addEventListener('click', nextQuestion); // При нажатии на кнопку "Next Question" вызывается nextQuestion()
restartButton.addEventListener('click', restartQuiz); // При нажатии на кнопку "Start Quiz Again" вызывается restartQuiz()
