/**
 * Projects Manager
 * Handles dynamic project rendering and management
 */

import { PROJECTS_DATA, PROJECT_CONFIG } from '../config/index.js';

export class ProjectsManager {
  constructor(translationManager) {
    this.translationManager = translationManager;
    this.projectsContainer = null;
  }

  /**
   * Initialize projects functionality
   */
  init() {
    this.cacheElements();
    this.renderProjects();
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.projectsContainer = document.querySelector('.projects-grid');
  }

  /**
   * Render all projects dynamically
   */
  renderProjects() {
    if (!this.projectsContainer) return;

    // Clear existing projects
    this.projectsContainer.innerHTML = '';

    // Sort projects by order
    const sortedProjects = [...PROJECTS_DATA].sort((a, b) => a.order - b.order);

    // Apply dynamic layout based on project count
    this.applyDynamicLayout(sortedProjects.length);

    // Render each project
    sortedProjects.forEach((project, index) => {
      const projectElement = this.createProjectCard(project, index);
      this.projectsContainer.appendChild(projectElement);
    });
  }

  /**
   * Apply dynamic layout based on number of projects
   */
  applyDynamicLayout(projectCount) {
    if (!this.projectsContainer) return;

    let layoutConfig;
    
    if (projectCount === 1) {
      layoutConfig = PROJECT_CONFIG.LAYOUT.SINGLE_PROJECT;
    } else if (projectCount === 2) {
      layoutConfig = PROJECT_CONFIG.LAYOUT.TWO_PROJECTS;
    } else {
      layoutConfig = PROJECT_CONFIG.LAYOUT.MULTIPLE_PROJECTS;
    }

    // Apply the layout styles
    this.projectsContainer.style.gridTemplateColumns = layoutConfig.GRID_COLUMNS;
    this.projectsContainer.style.justifyContent = layoutConfig.JUSTIFY_CONTENT;
    this.projectsContainer.style.maxWidth = layoutConfig.MAX_WIDTH;
    this.projectsContainer.style.margin = layoutConfig.MARGIN;
    
    // Add specific classes for styling
    this.projectsContainer.className = `projects-grid projects-count-${projectCount}`;
  }

  /**
   * Create a project card element
   */
  createProjectCard(project, index) {
    const article = document.createElement('article');
    article.className = 'project-card';
    article.tabIndex = 0;
    article.setAttribute('data-project-id', project.id);
    
    // Add animation delay
    article.style.animationDelay = `${index * PROJECT_CONFIG.CARD_ANIMATION_DELAY}ms`;

    const currentLang = this.translationManager?.getCurrentLanguage() || 'en';

    article.innerHTML = `
      <div class="project-header">
        <h3 class="project-title">${project.title[currentLang]}</h3>
        <div class="project-status" aria-label="Status" style="color: ${this.getStatusColor(project.status[currentLang])}">${project.status[currentLang]}</div>
      </div>

      <div class="project-image" aria-hidden="true">
        <img src="${project.image}" alt="${project.title[currentLang]}" loading="lazy">
      </div>

      <div class="project-content">
        <p class="project-genre">${project.genre[currentLang]}</p>
        <p class="project-platforms">${project.platforms[currentLang]}</p>

        <div class="project-divider"></div>

        <div class="project-meta">
          <div class="project-number">${String(index + 1).padStart(2, '0')}</div>
          <div class="project-tags in-card">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>

        <h4 class="project-subtitle">${project.subtitle[currentLang]}</h4>
        <p class="project-description">${project.description[currentLang]}</p>

        <div class="project-actions">
          <a href="${project.link}" class="project-link">
            <span class="project-link-text">${this.getViewProjectText(currentLang)}</span> 
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    `;

    return article;
  }

  /**
   * Get status color based on status text
   */
  getStatusColor(status) {
    return PROJECT_CONFIG.STATUS_COLORS[status] || '#22c55e';
  }

  /**
   * Get "View Project" text in current language
   */
  getViewProjectText(lang) {
    return lang === 'ar' ? 'عرض المشروع' : 'View Project';
  }

  /**
   * Update projects when language changes
   */
  updateProjectsLanguage() {
    this.renderProjects();
  }

  /**
   * Add a new project
   */
  addProject(projectData) {
    PROJECTS_DATA.push({
      ...projectData,
      id: projectData.id || `project-${Date.now()}`,
      order: projectData.order || PROJECTS_DATA.length + 1
    });
    this.renderProjects();
  }

  /**
   * Remove a project
   */
  removeProject(projectId) {
    const index = PROJECTS_DATA.findIndex(p => p.id === projectId);
    if (index > -1) {
      PROJECTS_DATA.splice(index, 1);
      this.renderProjects();
    }
  }

  /**
   * Update a project
   */
  updateProject(projectId, updates) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (project) {
      Object.assign(project, updates);
      this.renderProjects();
    }
  }

  /**
   * Get project by ID
   */
  getProject(projectId) {
    return PROJECTS_DATA.find(p => p.id === projectId);
  }

  /**
   * Get all projects
   */
  getAllProjects() {
    return PROJECTS_DATA;
  }

  /**
   * Get featured projects only
   */
  getFeaturedProjects() {
    return PROJECTS_DATA.filter(p => p.featured);
  }
}
