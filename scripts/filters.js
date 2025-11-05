// filters.js
class ProjectsFilter {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupSearch();
    }

    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.applyFilter(filter);
                this.updateActiveButton(e.target);
            });
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');

        searchButton.addEventListener('click', () => this.performSearch());
        searchInput.addEventListener('input', () => this.performSearch());
    }

    applyFilter(filter) {
        this.currentFilter = filter;
        const projectItems = document.querySelectorAll('.project-item');
        let visibleCount = 0;

        projectItems.forEach(item => {
            const categories = item.dataset.categories.toLowerCase();

            if (filter === 'all' || categories.includes(filter)) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        this.updateNoResultsMessage(visibleCount);
    }

    performSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const projectItems = document.querySelectorAll('.project-item');
        let visibleCount = 0;

        projectItems.forEach(item => {
            const title = item.dataset.title.toLowerCase();
            const categories = item.dataset.categories.toLowerCase();

            const matchesSearch = title.includes(searchTerm) || categories.includes(searchTerm);
            const matchesFilter = this.currentFilter === 'all' || categories.includes(this.currentFilter);

            if (matchesSearch && matchesFilter) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        this.updateNoResultsMessage(visibleCount);
    }

    updateActiveButton(activeButton) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    updateNoResultsMessage(visibleCount) {
        const noResults = document.getElementById('noResults');
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
}

// Initialize filter when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.projectsFilter = new ProjectsFilter();
});