// Utility: Show alert
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
  alertDiv.innerHTML = `
    <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  document.body.appendChild(alertDiv);
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// Dashboard Table Pagination Variables
let dashboardCurrentPage = 1;
let dashboardRowsPerPage = 5;
let dashboardAllRows = [];

// Dashboard Table Pagination Functions
function initializeDashboardPagination() {
  const dashboardTable = document.getElementById('student-dashboard-table');
  if (!dashboardTable) return;
  
  // Get all rows from the table body
  const tbody = dashboardTable.querySelector('tbody');
  if (!tbody) return;
  
  dashboardAllRows = Array.from(tbody.querySelectorAll('tr'));
  dashboardCurrentPage = 1;
  
  updateDashboardPagination();
  showDashboardPage(1);
}

function showDashboardPage(page) {
  const dashboardTable = document.getElementById('student-dashboard-table');
  if (!dashboardTable) return;
  
  const tbody = dashboardTable.querySelector('tbody');
  if (!tbody) return;
  
  // Hide all rows
  dashboardAllRows.forEach(row => {
    row.style.display = 'none';
  });
  
  // Calculate start and end indices
  const startIndex = (page - 1) * dashboardRowsPerPage;
  const endIndex = Math.min(startIndex + dashboardRowsPerPage, dashboardAllRows.length);
  
  // Show rows for current page
  for (let i = startIndex; i < endIndex; i++) {
    if (dashboardAllRows[i]) {
      dashboardAllRows[i].style.display = '';
    }
  }
  
  // Update pagination info
  updateDashboardPaginationInfo(startIndex + 1, endIndex, dashboardAllRows.length);
}

function updateDashboardPagination() {
  const totalPages = Math.ceil(dashboardAllRows.length / dashboardRowsPerPage);
  const paginationControls = document.getElementById('dashboard-pagination-controls');
  if (!paginationControls) return;
  
  // Clear existing page buttons (except Previous and Next)
  const pageButtons = paginationControls.querySelectorAll('li:not(:first-child):not(:last-child)');
  pageButtons.forEach(button => button.remove());
  
  // Add page buttons
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${i === dashboardCurrentPage ? 'active' : ''}`;
    li.innerHTML = `<button class="page-link" data-page="${i}">${i}</button>`;
    paginationControls.insertBefore(li, paginationControls.lastElementChild);
  }
  
  // Update Previous/Next buttons
  const prevBtn = document.getElementById('dashboard-prev-btn');
  const nextBtn = document.getElementById('dashboard-next-btn');
  
  if (prevBtn) {
    prevBtn.parentElement.className = `page-item ${dashboardCurrentPage === 1 ? 'disabled' : ''}`;
    prevBtn.disabled = dashboardCurrentPage === 1;
  }
  
  if (nextBtn) {
    nextBtn.parentElement.className = `page-item ${dashboardCurrentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.disabled = dashboardCurrentPage === totalPages;
  }
  
  // Update pagination info
  const startIndex = (dashboardCurrentPage - 1) * dashboardRowsPerPage;
  const endIndex = Math.min(startIndex + dashboardRowsPerPage, dashboardAllRows.length);
  updateDashboardPaginationInfo(startIndex + 1, endIndex, dashboardAllRows.length);
}

function updateDashboardPaginationInfo(start, end, total) {
  const startRecord = document.getElementById('dashboard-start-record');
  const endRecord = document.getElementById('dashboard-end-record');
  const totalRecords = document.getElementById('dashboard-total-records');
  
  if (startRecord) startRecord.textContent = start;
  if (endRecord) endRecord.textContent = end;
  if (totalRecords) totalRecords.textContent = total;
}

function goToDashboardPage(page) {
  const totalPages = Math.ceil(dashboardAllRows.length / dashboardRowsPerPage);
  if (page < 1 || page > totalPages) return;
  
  dashboardCurrentPage = page;
  showDashboardPage(page);
  updateDashboardPagination();
}

// Event listeners for dashboard pagination
function setupDashboardPaginationEvents() {
  const paginationControls = document.getElementById('dashboard-pagination-controls');
  if (!paginationControls) return;
  
  paginationControls.addEventListener('click', function(e) {
    if (e.target.classList.contains('page-link')) {
      e.preventDefault();
      
      if (e.target.id === 'dashboard-prev-btn') {
        goToDashboardPage(dashboardCurrentPage - 1);
      } else if (e.target.id === 'dashboard-next-btn') {
        goToDashboardPage(dashboardCurrentPage + 1);
      } else if (e.target.dataset.page) {
        goToDashboardPage(parseInt(e.target.dataset.page));
      }
    }
  });
}

// Utility: Show content section
function showContent(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.classList.add('d-none'));

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove('d-none');
  }
  
  // Special handling for request section - check if user has submitted forms
  if (sectionId === 'request') {
    // Check if user has any submitted request form data (not just saved drafts)
    const allRequestKeys = Object.keys(localStorage).filter(key => key.startsWith('requestFormDraft_'));
    const hasSubmittedForms = allRequestKeys.some(key => {
      const data = JSON.parse(localStorage.getItem(key));
      return data && data.isSubmitted === true;
    });
    const shouldShowHistory = sessionStorage.getItem('showRequestHistory') === 'true' || hasSubmittedForms;
    
    if (shouldShowHistory) {
      // Show the request history section instead of the initial form
      const requestFormSection = document.getElementById('requestHomesection');
      const requestHistorySection = document.getElementById('requestHistorySection');
      
      if (requestFormSection) requestFormSection.classList.add('d-none');
      if (requestHistorySection) requestHistorySection.classList.remove('d-none');
      
      // Render the history table
      setTimeout(() => {
        if (typeof renderRequestFormHistoryTable === 'function') {
          renderRequestFormHistoryTable();
        }
      }, 100);
    } else {
      // Show the initial request form
      const requestFormSection = document.getElementById('requestHomesection');
      const requestHistorySection = document.getElementById('requestHistorySection');
      
      if (requestFormSection) requestFormSection.classList.remove('d-none');
      if (requestHistorySection) requestHistorySection.classList.add('d-none');
    }
  }

  // Special handling for clearance section - check if user has submitted clearance forms
  if (sectionId === 'clearance') {
    // Check if user has any submitted clearance form data (not just saved drafts)
    const allClearanceKeys = Object.keys(localStorage).filter(key => key.startsWith('clearanceFormDraft_'));
    const hasSubmittedClearance = allClearanceKeys.some(key => {
      const data = JSON.parse(localStorage.getItem(key));
      return data && data.submitted === true; // Fixed: changed from isSubmitted to submitted
    });
    const shouldShowHistory = sessionStorage.getItem('showClearanceHistory') === 'true' || hasSubmittedClearance;
    
    if (shouldShowHistory) {
      // Show the clearance history section instead of the initial form
      const clearanceFormSection = document.getElementById('clearanceHomesection');
      const clearanceHistorySection = document.getElementById('clearanceHistorySection');
      
      if (clearanceFormSection) clearanceFormSection.classList.add('d-none');
      if (clearanceHistorySection) clearanceHistorySection.classList.remove('d-none');
      
      // Render the history table
      setTimeout(() => {
        if (typeof renderClearanceFormHistoryTable === 'function') {
          renderClearanceFormHistoryTable();
        }
      }, 100);
    } else {
      // Show the initial clearance form
      const clearanceFormSection = document.getElementById('clearanceHomesection');
      const clearanceHistorySection = document.getElementById('clearanceHistorySection');
      
      if (clearanceFormSection) clearanceFormSection.classList.remove('d-none');
      if (clearanceHistorySection) clearanceHistorySection.classList.add('d-none');
    }
  }

  // Initialize pagination when dashboard is shown
  if (sectionId === 'dashboard') {
    setTimeout(() => {
      initializeDashboardPagination();
      // Also render the dashboard table to ensure it's up to date
      if (typeof renderStudentDashboardTable === 'function') {
        renderStudentDashboardTable();
      }
    }, 100);
  }
}

// Function to handle clearance form submission and update session storage
function handleClearanceFormSubmission() {
  sessionStorage.setItem('showClearanceHistory', 'true');
  showContent('clearance');
}

// Function to reset clearance history view
function resetClearanceHistoryView() {
  sessionStorage.removeItem('showClearanceHistory');
  showContent('clearance');
}

// Function to handle "Fill out new form" button click
function handleNewClearanceForm() {
  // Reset the form and show home section
  resetClearanceHistoryView();
  
  // Clear any existing form data
  if (typeof clearClearanceFormFromLocalStorage === 'function') {
    clearClearanceFormFromLocalStorage();
  }
}

// Utility: Close all open modals and remove backdrops
function closeAllModals() {
  // Hide all Bootstrap modals
  document.querySelectorAll('.modal.show').forEach(modalEl => {
    const modalInstance = bootstrap.Modal.getInstance(modalEl) || bootstrap.Modal.getOrCreateInstance(modalEl);
    modalInstance.hide();
  });
  // Remove all modal backdrops
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
  // Clean up body classes
  document.body.classList.remove('modal-open');
  document.body.style = '';
}

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('collapsed');
    sidebar.classList.toggle('show');
    backdrop.classList.toggle('active');
  } else {
    sidebar.classList.toggle('collapsed');
  }
}

// Modal triggers rebinding (shared)
function rebindModalTriggers() {
  document.querySelectorAll('[data-bs-toggle="modal"]').forEach(trigger => {
    if (!trigger.dataset.bound) {
      const targetId = trigger.getAttribute('data-bs-target');
      const modalEl = document.querySelector(targetId);
      if (modalEl && typeof bootstrap !== 'undefined') {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const modal = new bootstrap.Modal(modalEl);
          // --- Special handling for edit-request-btn ---
          if (trigger.classList.contains('edit-request-btn')) {
            const loadOnShown = function () {
              if (typeof loadFormFromLocalStorage === 'function') loadFormFromLocalStorage();
              modalEl.removeEventListener('shown.bs.modal', loadOnShown);
            };
            modalEl.addEventListener('shown.bs.modal', loadOnShown);
          }
          // --- Special handling for edit-clearance-btn ---
          if (trigger.classList.contains('edit-clearance-btn')) {
            const loadOnShown = function () {
              if (typeof loadClearanceFormFromLocalStorage === 'function') loadClearanceFormFromLocalStorage();
              modalEl.removeEventListener('shown.bs.modal', loadOnShown);
            };
            modalEl.addEventListener('shown.bs.modal', loadOnShown);
          }
          modal.show();
        });
        trigger.dataset.bound = "true";
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const dateSpan = document.getElementById('dateToday');
  if (dateSpan) {
    const today = new Date();
    const formatted = today.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    dateSpan.textContent = formatted;
  }
  
  // Set up dashboard pagination events
  setupDashboardPaginationEvents();
  
  showContent('dashboard');
  sessionStorage.removeItem('showRequestHistory');
  sessionStorage.removeItem('showClearanceHistory'); // Added: clear clearance history flag
  
  // Initialize pagination after a short delay to ensure DOM is ready
  setTimeout(() => {
    initializeDashboardPagination();
  }, 200);
  rebindModalTriggers();
  
  // Set up "Fill out new form" button for clearance section
  // Removed: toggling to home section when clicking fill up new form

  // Patch sidebar navigation links to close all modals before navigating
  document.querySelectorAll('a[onclick^="showContent("]').forEach(link => {
    const origOnClick = link.getAttribute('onclick');
    link.onclick = function(e) {
      closeAllModals();
      // Use eval to call the original showContent('...')
      // (since the HTML uses inline onclick)
      // eslint-disable-next-line no-eval
      eval(origOnClick);
    };
  });
});

document.addEventListener('hidden.bs.modal', function () {
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) backdrop.remove();
  document.body.classList.remove('modal-open');
  document.body.style.paddingRight = '';
});

// Sidebar responsive behavior
window.addEventListener('resize', function () {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (window.innerWidth > 768) {
    if (sidebar) sidebar.classList.remove('show');
    if (backdrop) backdrop.classList.remove('active');
  }
});


