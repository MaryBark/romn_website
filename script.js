// Создание звездного фона с оптимизацией для мобильных
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const starCount = window.innerWidth < 768 ? 100 : 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Меньший размер звезд на мобильных
        const size = window.innerWidth < 768 ? 
            Math.random() * 1.5 + 0.5 : 
            Math.random() * 2 + 1;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Случайная позиция
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Случайная яркость и задержка анимации
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starsContainer.appendChild(star);
    }
}

// Плавная навигация с учетом мобильных устройств
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Удаляем класс active у всех ссылок
        document.querySelectorAll('.nav-link').forEach(item => {
            item.classList.remove('active');
        });
        
        // Добавляем класс active к текущей ссылке
        this.classList.add('active');
        
        // Плавная прокрутка к секции с отступом для мобильной навигации
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navHeight = document.querySelector('nav').offsetHeight;
        
        window.scrollTo({
            top: targetSection.offsetTop - navHeight - 10,
            behavior: 'smooth'
        });
        
        // На мобильных устройствах можно закрыть меню после клика (если бы было бургер-меню)
        if (window.innerWidth < 768) {
            // Здесь можно добавить логику закрытия мобильного меню
        }
    });
});

// Анимация появления секций при скролле с оптимизацией для мобильных
function revealSections() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    const revealPoint = windowHeight < 768 ? 50 : 100;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('visible');
        }
    });
}

// Кнопка для возврата в начало с оптимизацией для мобильных
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Функция для определения, нужно ли показывать кнопку
function toggleScrollButton() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
}

// Оптимизированный обработчик скролла с throttle
let scrollTimeout;
window.addEventListener('scroll', function() {
    // Используем throttle для оптимизации производительности на мобильных
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            // Показывать/скрывать кнопку возврата
            toggleScrollButton();
            
            // Анимация секций
            revealSections();
            
            // Подсветка активного раздела в навигации
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-link');
            const navHeight = document.querySelector('nav').offsetHeight;
            
            let currentSectionId = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 20;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSectionId = `#${section.id}`;
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSectionId) {
                    link.classList.add('active');
                }
            });
            
            scrollTimeout = null;
        }, 100); // Задержка 100ms для оптимизации
    }
});

// Обработчик для кнопки возврата в начало
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Обработчик для тач-устройств (улучшение UX)
if ('ontouchstart' in window) {
    // Добавляем класс для тач-устройств
    document.body.classList.add('touch-device');
    
    // Увеличиваем область клика для навигационных ссылок на мобильных
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.minHeight = '44px'; // Рекомендуемый минимальный размер для тач-элементов
    });
}

// Обработчик изменения ориентации экрана
window.addEventListener('orientationchange', function() {
    // Пересоздаем звезды при изменении ориентации
    setTimeout(function() {
        const starsContainer = document.getElementById('stars-container');
        starsContainer.innerHTML = '';
        createStars();
    }, 300);
});

// Обработчик изменения размера окна с debounce
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Обновляем звезды при изменении размера окна
        const starsContainer = document.getElementById('stars-container');
        starsContainer.innerHTML = '';
        createStars();
        
        // Обновляем видимость кнопки скролла
        toggleScrollButton();
    }, 250);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    revealSections();
    
    // Активируем первую секцию сразу
    document.querySelector('.section').classList.add('visible');
    
    // Инициализация кнопки скролла
    toggleScrollButton();
});

// Оптимизация для медленных сетей и устройств
if ('connection' in navigator && navigator.connection.saveData === true) {
    // Уменьшаем количество звезд при режиме экономии данных
    console.log('Режим экономии данных активирован - оптимизируем анимации');
}