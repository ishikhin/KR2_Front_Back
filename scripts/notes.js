// notes.js
class NotesManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('diaryNotes')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderNotes();
        this.setupEventListeners();
        this.updateStatistics();
    }

    setupEventListeners() {
        // Save note button
        document.getElementById('saveNote').addEventListener('click', () => this.saveNote());

        // Filter buttons
        document.getElementById('filterAll').addEventListener('click', () => this.filterNotes('all'));
        document.getElementById('filterCompleted').addEventListener('click', () => this.filterNotes('completed'));
        document.getElementById('filterInProgress').addEventListener('click', () => this.filterNotes('in-progress'));

        // Clear form when modal is hidden
        const modal = document.getElementById('addNoteModal');
        modal.addEventListener('hidden.bs.modal', () => this.clearForm());
    }

    saveNote() {
        const title = document.getElementById('noteTitle').value.trim();
        const content = document.getElementById('noteContent').value.trim();
        const status = document.getElementById('noteStatus').value;
        const tags = document.getElementById('noteTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);

        if (!title || !content) {
            alert('Пожалуйста, заполните заголовок и содержание заметки');
            return;
        }

        const note = {
            id: Date.now(),
            title,
            content,
            status,
            tags,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.notes.unshift(note);
        this.saveToStorage();
        this.renderNotes();
        this.updateStatistics();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addNoteModal'));
        modal.hide();

        this.showNotification('Заметка успешно добавлена!', 'success');
    }

    deleteNote(noteId) {
        if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
            this.notes = this.notes.filter(note => note.id !== noteId);
            this.saveToStorage();
            this.renderNotes();
            this.updateStatistics();
            this.showNotification('Заметка удалена', 'warning');
        }
    }

    editNote(noteId) {
        const note = this.notes.find(note => note.id === noteId);
        if (!note) return;

        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteContent').value = note.content;
        document.getElementById('noteStatus').value = note.status;
        document.getElementById('noteTags').value = note.tags.join(', ');

        // Remove old note
        this.notes = this.notes.filter(n => n.id !== noteId);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('addNoteModal'));
        modal.show();
    }

    filterNotes(filter) {
        this.currentFilter = filter;
        this.renderNotes();

        // Update active filter button
        document.getElementById('filterAll').classList.remove('active');
        document.getElementById('filterCompleted').classList.remove('active');
        document.getElementById('filterInProgress').classList.remove('active');
        document.getElementById(`filter${filter.charAt(0).toUpperCase() + filter.slice(1)}`).classList.add('active');
    }

    renderNotes() {
        const container = document.getElementById('notesContainer');
        const filteredNotes = this.getFilteredNotes();

        if (filteredNotes.length === 0) {
            container.innerHTML = `
                <div class="text-center text-muted py-4">
                    <i class="bi bi-journal-x display-4"></i>
                    <p class="mt-3">Заметок пока нет</p>
                    <button class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#addNoteModal">
                        Добавить первую заметку
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredNotes.map(note => `
            <div class="note-item" data-status="${note.status}">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h5 class="mb-2">${this.escapeHtml(note.title)}</h5>
                        <p class="text-muted mb-2">${this.escapeHtml(note.content)}</p>
                        <div class="d-flex flex-wrap gap-1 mb-2">
                            ${note.tags.map(tag => `<span class="badge bg-light text-dark">${this.escapeHtml(tag)}</span>`).join('')}
                        </div>
                        <small class="text-muted">
                            Создано: ${new Date(note.createdAt).toLocaleDateString('ru-RU')}
                            ${note.status === 'completed' ? '<span class="badge bg-success ms-2">Завершено</span>' :
            note.status === 'in-progress' ? '<span class="badge bg-warning ms-2">В процессе</span>' :
                '<span class="badge bg-secondary ms-2">Запланировано</span>'}
                        </small>
                    </div>
                    <div class="note-actions ms-3">
                        <button class="btn btn-sm btn-outline-primary" onclick="notesManager.editNote(${note.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="notesManager.deleteNote(${note.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getFilteredNotes() {
        switch (this.currentFilter) {
            case 'completed':
                return this.notes.filter(note => note.status === 'completed');
            case 'in-progress':
                return this.notes.filter(note => note.status === 'in-progress');
            case 'pending':
                return this.notes.filter(note => note.status === 'pending');
            default:
                return this.notes;
        }
    }

    updateStatistics() {
        const completed = this.notes.filter(note => note.status === 'completed').length;
        const inProgress = this.notes.filter(note => note.status === 'in-progress').length;
        const pending = this.notes.filter(note => note.status === 'pending').length;
        const total = this.notes.length;

        document.getElementById('completedCount').textContent = completed;
        document.getElementById('inProgressCount').textContent = inProgress;
        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('totalCount').textContent = total;
    }

    clearForm() {
        document.getElementById('noteForm').reset();
    }

    saveToStorage() {
        localStorage.setItem('diaryNotes', JSON.stringify(this.notes));
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 1060; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Initialize notes manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.notesManager = new NotesManager();
});