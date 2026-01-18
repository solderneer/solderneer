export interface Note {
  slug: string;
  title: string;
  pubDate: string;
  tags: string[];
  wordCount: number;
  minutesRead: string;
  refNum: number;
}

export interface NotesSearchConfig {
  currentTag?: string;
  pageSize?: number;
  onError?: (error: Error) => void;
}

export class NotesSearch {
  private searchInput: HTMLInputElement;
  private searchHint: HTMLElement;
  private filterStatus: HTMLElement | null;
  private paginatedNotes: HTMLElement;
  private filteredResults: HTMLElement;
  private pagination: HTMLElement;
  private originalPaginationHtml: string;

  private currentSearch = '';
  private allNotesCache: Note[] | null = null;
  private currentPage = 1;
  private readonly pageSize: number;
  private readonly currentTag: string | null;
  private readonly onError: (error: Error) => void;

  constructor(config: NotesSearchConfig = {}) {
    this.pageSize = config.pageSize ?? 25;
    this.currentTag = config.currentTag ?? null;
    this.onError = config.onError ?? console.error;

    this.searchInput = document.getElementById('search-input') as HTMLInputElement;
    this.searchHint = document.querySelector('.search-hint') as HTMLElement;
    this.filterStatus = document.getElementById('filter-status');
    this.paginatedNotes = document.getElementById('paginated-notes') as HTMLElement;
    this.filteredResults = document.getElementById('filtered-results') as HTMLElement;
    this.pagination = document.getElementById('pagination') as HTMLElement;
    this.originalPaginationHtml = this.pagination.innerHTML;

    this.init();
  }

  private init(): void {
    this.setupKeyboardShortcuts();
    this.setupSearchInput();
  }

  private setupKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== this.searchInput) {
        e.preventDefault();
        this.searchInput.focus();
      }
      if (e.key === 'Escape') {
        this.searchInput.blur();
        this.searchInput.value = '';
        this.currentSearch = '';
        this.currentPage = 1;
        this.clearSearch();
      }
    });
  }

  private setupSearchInput(): void {
    this.searchInput.addEventListener('focus', () => {
      this.searchHint.style.opacity = '0';
    });

    this.searchInput.addEventListener('blur', () => {
      if (!this.searchInput.value) {
        this.searchHint.style.opacity = '1';
      }
    });

    this.searchInput.addEventListener('input', (e) => {
      this.currentSearch = (e.target as HTMLInputElement).value.toLowerCase();
      this.currentPage = 1;
      if (this.currentSearch === '') {
        this.clearSearch();
      } else {
        this.filterNotes();
      }
    });
  }

  private clearSearch(): void {
    this.paginatedNotes.style.display = '';
    this.filteredResults.style.display = 'none';
    this.pagination.innerHTML = this.originalPaginationHtml;
    this.pagination.style.display = '';
    if (this.filterStatus) {
      if (this.currentTag) {
        const total = this.pagination.querySelector('.pagination-info')?.textContent?.match(/(\d+) notes/)?.[1] || '0';
        this.filterStatus.textContent = `${total} notes tagged #${this.currentTag}`;
      } else {
        this.filterStatus.textContent = '';
      }
    }
  }

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private highlightMatch(text: string, search: string): string {
    if (!search) return this.escapeHtml(text);
    const escaped = this.escapeHtml(text);
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return escaped.replace(regex, '<mark>$1</mark>');
  }

  private async fetchAllNotes(): Promise<Note[]> {
    if (this.allNotesCache) return this.allNotesCache;

    try {
      const response = await fetch('/notes.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status} ${response.statusText}`);
      }
      this.allNotesCache = await response.json();
      return this.allNotesCache!;
    } catch (error) {
      this.onError(error as Error);
      return [];
    }
  }

  private renderFilteredNotes(notes: Note[]): void {
    const notesByYear: Record<number, Note[]> = {};
    notes.forEach(note => {
      const year = new Date(note.pubDate).getFullYear();
      if (!notesByYear[year]) notesByYear[year] = [];
      notesByYear[year].push(note);
    });

    const years = Object.keys(notesByYear).map(Number).sort((a, b) => b - a);

    let html = '';
    years.forEach(year => {
      html += `<div class="year-group">
        <h2 class="year-label">${year}</h2>
        <ul class="notes-list">`;

      notesByYear[year].forEach(note => {
        const refNum = String(note.refNum).padStart(3, '0');
        const dateStr = this.formatDate(note.pubDate);
        const titleHtml = this.highlightMatch(note.title, this.currentSearch);
        const tag = note.tags[0] || '';

        html += `<li class="note-item">
          <div class="note-date">${dateStr}</div>
          <div class="note-content">
            <a href="/notes/${note.slug}/">
              <span class="note-title">
                <span class="note-ref">N${refNum}</span>
                ${titleHtml}
              </span>
              <span class="note-tag">${this.escapeHtml(tag)}</span>
              <div class="note-details">
                ${note.wordCount ? `<span class="note-detail">${note.wordCount} words</span>` : ''}
                ${note.minutesRead ? `<span class="note-detail">${this.escapeHtml(note.minutesRead)}</span>` : ''}
              </div>
            </a>
          </div>
        </li>`;
      });

      html += `</ul></div>`;
    });

    this.filteredResults.innerHTML = html;
  }

  private renderPagination(totalNotes: number): string {
    const totalPages = Math.ceil(totalNotes / this.pageSize);
    if (totalPages <= 1) return '';

    let pagesHtml = '';
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === this.currentPage;
      pagesHtml += `<button
        class="page-num ${isActive ? 'active' : ''}"
        data-page="${i}"
        aria-label="Go to page ${i}"
        ${isActive ? 'aria-current="page"' : ''}
      >${i}</button>`;
    }

    const prevDisabled = this.currentPage === 1;
    const nextDisabled = this.currentPage === totalPages;

    return `
      <div class="pagination-info">Page ${this.currentPage} of ${totalPages} • ${totalNotes} notes</div>
      <div class="pagination-links">
        <button
          class="pagination-link ${prevDisabled ? 'disabled' : ''}"
          data-page="${this.currentPage - 1}"
          ${prevDisabled ? 'disabled' : ''}
          aria-label="Go to previous page"
        >← Newer</button>
        <div class="pagination-pages">${pagesHtml}</div>
        <button
          class="pagination-link ${nextDisabled ? 'disabled' : ''}"
          data-page="${this.currentPage + 1}"
          ${nextDisabled ? 'disabled' : ''}
          aria-label="Go to next page"
        >Older →</button>
      </div>
    `;
  }

  private async filterNotes(): Promise<void> {
    this.paginatedNotes.style.display = 'none';
    this.filteredResults.style.display = '';

    const allNotes = await this.fetchAllNotes();
    if (allNotes.length === 0) {
      this.filteredResults.innerHTML = '<p class="no-results">Unable to load notes. Please try again.</p>';
      this.pagination.style.display = 'none';
      return;
    }

    const filtered = allNotes.filter(note => {
      const titleLower = note.title.toLowerCase();
      const tagsStr = note.tags.join(',').toLowerCase();
      const matchesSearch = titleLower.includes(this.currentSearch) || tagsStr.includes(this.currentSearch);
      const matchesTag = !this.currentTag || note.tags.includes(this.currentTag);
      return matchesSearch && matchesTag;
    });

    const totalPages = Math.ceil(filtered.length / this.pageSize);
    if (this.currentPage > totalPages) this.currentPage = 1;

    const startIdx = (this.currentPage - 1) * this.pageSize;
    const pageNotes = filtered.slice(startIdx, startIdx + this.pageSize);

    this.renderFilteredNotes(pageNotes);

    this.pagination.innerHTML = this.renderPagination(filtered.length);
    this.pagination.style.display = '';

    // Add click handlers for pagination
    this.pagination.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const newPage = parseInt((e.target as HTMLElement).dataset.page || '1');
        if (newPage >= 1 && newPage <= totalPages) {
          this.currentPage = newPage;
          this.filterNotes();
          // Scroll to top of results
          this.filteredResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    if (this.filterStatus) {
      const tagPart = this.currentTag ? ` in #${this.currentTag}` : '';
      this.filterStatus.textContent = `${filtered.length} note${filtered.length !== 1 ? 's' : ''} matching "${this.currentSearch}"${tagPart}`;
    }
  }
}
