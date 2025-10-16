// Данные проектов для модального окна
const projectsData = {
    1: {
        title: "Личный сайт-портфолио",
        description: "Адаптивный сайт-портфолио с современным дизайном. Реализована светлая и тёмная темы, модальные окна для обратной связи, фильтрация проектов и адаптивная верстка для всех устройств.",
        technologies: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
        features: [
            "Адаптивный дизайн для всех устройств",
            "Система светлой/тёмной темы",
            "Фильтрация проектов по технологиям",
            "Модальные окна для обратной связи",
            "Оптимизированная производительность"
        ],
        github: "https://github.com/ishikhin?tab=repositories",
        demo: "#",
        image: "../images/project1.jpg"
    },
    2: {
        title: "Анализ данных",
        description: "Программа для анализа и визуализации данных с использованием библиотек Pandas и Matplotlib. Обработка больших наборов данных, создание интерактивных графиков и отчетов.",
        technologies: ["Python", "Pandas", "Matplotlib", "NumPy"],
        features: [
            "Обработка CSV и Excel файлов",
            "Создание интерактивных графиков",
            "Статистический анализ данных",
            "Генерация отчетов в PDF",
            "Автоматизация процессов анализа"
        ],
        github: "#",
        demo: "#",
        image: "../images/project2.jpg"
    },
    3: {
        title: "Todo приложение",
        description: "Интерактивное приложение для управления задачами с возможностью добавления, редактирования, удаления и фильтрации задач. Локальное хранение данных в браузере.",
        technologies: ["JavaScript", "HTML5", "CSS3", "Local Storage"],
        features: [
            "Добавление и удаление задач",
            "Отметка выполненных задач",
            "Фильтрация по статусу",
            "Локальное хранение данных",
            "Адаптивный интерфейс"
        ],
        github: "#",
        demo: "#",
        image: "../images/project3.jpg"
    },
    4: {
        title: "React Weather App",
        description: "Погодное приложение на React с использованием OpenWeather API. Отображение текущей погоды, прогноза на 5 дней, поиск по городам и геолокация.",
        technologies: ["React", "JavaScript", "CSS Modules", "OpenWeather API"],
        features: [
            "Текущая погода и прогноз на 5 дней",
            "Поиск по названию города",
            "Автоматическая геолокация",
            "Анимации перехода",
            "Оффлайн-режим"
        ],
        github: "#",
        demo: "#",
        image: "../images/project4.jpg"
    },
    5: {
        title: "Игра 'Змейка'",
        description: "Классическая игра 'Змейка' на C++ с использованием библиотеки SFML. Реализована система очков, несколько уровней сложности и сохранение рекордов.",
        technologies: ["C++", "SFML", "CMake"],
        features: [
            "Несколько уровней сложности",
            "Система рекордов",
            "Сохранение прогресса",
            "Плавная анимация движения",
            "Настраиваемое управление"
        ],
        github: "#",
        demo: "#",
        image: "../images/project1.jpg"
    },
    6: {
        title: "Интернет-магазин",
        description: "Полнофункциональный интернет-магазин с корзиной покупок, фильтрацией товаров, системой заказов и панелью администратора.",
        technologies: ["Bootstrap", "JavaScript", "HTML", "CSS", "PHP"],
        features: [
            "Корзина покупок",
            "Фильтрация и поиск товаров",
            "Система заказов",
            "Панель администратора",
            "Интеграция с платежными системами"
        ],
        github: "#",
        demo: "#",
        image: "../images/project2.jpg"
    },
    7: {
        title: "Telegram бот",
        description: "Многофункциональный Telegram бот для автоматизации задач с интеграцией внешних API и баз данных. Поддержка различных команд и уведомлений.",
        technologies: ["Python", "python-telegram-bot", "SQLite", "REST API"],
        features: [
            "Автоматические уведомления",
            "Интеграция с внешними API",
            "База данных пользователей",
            "Различные команды и функции",
            "Система логирования"
        ],
        github: "#",
        demo: "#",
        image: "../images/project3.jpg"
    },
    8: {
        title: "Мини социальная сеть",
        description: "Социальная платформа с возможностью публикации постов, комментариев, лайков и системой друзей. Реализована на React с использованием Firebase.",
        technologies: ["React", "JavaScript", "Firebase", "CSS"],
        features: [
            "Публикация постов и комментариев",
            "Система лайков",
            "Друзья и подписки",
            "Реaltime обновления",
            "Аутентификация пользователей"
        ],
        github: "#",
        demo: "#",
        image: "../images/project4.jpg"
    }
};

// Функция показа деталей проекта
function showProjectDetails(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    const modalTitle = document.getElementById('projectModalTitle');
    const modalBody = document.getElementById('projectModalBody');

    modalTitle.textContent = project.title;

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${project.image}" class="img-fluid rounded mb-3" alt="${project.title}">
            </div>
            <div class="col-md-6">
                <h6 class="text-primary">Описание</h6>
                <p class="mb-3">${project.description}</p>
                
                <h6 class="text-primary">Технологии</h6>
                <div class="mb-3">
                    ${project.technologies.map(tech => `<span class="badge bg-primary me-1 mb-1">${tech}</span>`).join('')}
                </div>
                
                <h6 class="text-primary">Основные функции</h6>
                <ul class="mb-3">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                
                <div class="d-flex gap-2">
                    <a href="${project.github}" class="btn btn-outline-primary btn-sm" target="_blank">
                        <i class="bi bi-github"></i> Исходный код
                    </a>
                    ${project.demo !== '#' ? `
                    <a href="${project.demo}" class="btn btn-primary btn-sm" target="_blank">
                        <i class="bi bi-play-circle"></i> Демо
                    </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    // Показываем модальное окно
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}