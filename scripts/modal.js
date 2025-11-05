// modal.js
function showProjectDetails(projectId) {
    const projectDetails = {
        1: {
            title: 'Личный сайт-портфолио',
            description: 'Полностью адаптивный сайт-портфолио с современным дизайном и интерактивными элементами.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
            features: ['Адаптивный дизайн', 'Интерактивная навигация', 'Анимации CSS', 'Оптимизация для мобильных устройств'],
            status: 'Завершен',
            github: '#',
            demo: '#'
        },
        2: {
            title: 'Игра "Лабиринт"',
            description: 'Консольная игра с рандомной генерацией лабиринта и поиском пути.',
            technologies: ['C++', 'QT', 'Алгоритмы'],
            features: ['Рандомная генерация лабиринта', 'Консольный интерфейс', 'Кастомизация уровней и создание собственного'],
            status: 'В разработке',
            github: '#',
            demo: '#'
        },

        3: {
            title: 'Визуализированная база данных',
            description: 'База данных на тему аэропорта',
            technologies: ['Python'],
            features: ['Добавление данных', 'Чтение данных', 'Редактирование данных'],
            status: 'В разработке',
            github: '#',
            demo: '#'
        }
    };

    const project = projectDetails[projectId];
    if (!project) return;

    const modalTitle = document.getElementById('projectModalTitle');
    const modalBody = document.getElementById('projectModalBody');

    modalTitle.textContent = project.title;

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-8">
                <p class="text-muted">${project.description}</p>
                
                <h6 class="mt-4">Основные функции:</h6>
                <ul class="list-unstyled">
                    ${project.features.map(feature => `<li><i class="bi text-success me-2"></i>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Технологии</h6>
                        <div class="d-flex flex-wrap gap-1 mb-3">
                            ${project.technologies.map(tech => `<span class="badge bg-primary">${tech}</span>`).join('')}
                        </div>
                        
                        <h6 class="card-title mt-3">Статус</h6>
                        <span class="badge ${project.status === 'Завершен' ? 'bg-success' : 'bg-warning'}">
                            ${project.status}
                        </span>
                        
                        <div class="mt-4">
                            <a href="${project.github}" class="btn btn-outline-dark btn-sm me-2">
                                <i class="bi bi-github"></i> GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}