document.addEventListener('DOMContentLoaded', function() {
    // Save button
    const saveBtn = document.getElementById('saveAlumniRequestBtn');
    // Submit button
    const submitBtn = document.getElementById('submitAlumniRequestBtn');
    // AlumniRequest form
    const alumniRequestForm = document.getElementById('alumniRequestForm');
    // Modal (lowercase id)
    const alumniRequestModal = document.getElementById('alumniRequestModal');
    // Fill out new form button in history section (capital E in data-bs-target)
    const fillOutNewFormBtn = document.querySelector('#alumniRequestHistorySection [data-bs-target="#alumniRequestModal"]');
    // Back to Home button in history section
    const backToHomeBtn = document.getElementById('alumniRequestBackToHomeBtn');
  
    // Function to show history and hide home
    function showAlumniRequestHistory() {
      // Hide home section
      const homeSection = document.getElementById('alumniRequestHomesection');
      if (homeSection) homeSection.classList.add('d-none');
      // Show history section
      const historySection = document.getElementById('AlumniRequestHistorySection');
      if (historySection) historySection.classList.remove('d-none');
      // Persist state
      sessionStorage.setItem('showAlumniRequestHistory', 'true');
    }
  
    // Function to show home and hide history
    function showAlumniRequestHome() {
      const homeSection = document.getElementById('alumniRequestHomesection');
      if (homeSection) homeSection.classList.remove('d-none');
      const historySection = document.getElementById('AlumniRequestHistorySection');
      if (historySection) historySection.classList.add('d-none');
      sessionStorage.removeItem('showAlumniRequestHistory');
    }
  
    // Function to close the modal
    function closeAlumniRequestModal() {
      if (alumniRequestModal) {
        const modalInstance = bootstrap.Modal.getInstance(alumniRequestModal) || new bootstrap.Modal(alumniRequestModal);
        modalInstance.hide();
      }
    }
  
    if (saveBtn) {
      saveBtn.addEventListener('click', function(e) {
        showAlumniRequestHistory();
        closeAlumniRequestModal();
      });
    }
  
    if (alumniRequestForm) {
      alumniRequestForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from reloading the page
        showAlumniRequestHistory();
        closeAlumniRequestModal();
      });
    }
  
    // When the enrollment tab is shown, check sessionStorage and show the correct section
    document.addEventListener('show-enrollment-tab', function() {
      if (sessionStorage.getItem('showAlumniRequestHistory') === 'true') {
        showAlumniRequestHistory();
      } else {
        showAlumniRequestHome();
      }
    });
  
    // Patch showContent to dispatch a custom event for enrollment
    const origShowContent = window.showContent;
    window.showContent = function(sectionId) {
      origShowContent.apply(this, arguments);
      if (sectionId === 'enrollment') {
        document.dispatchEvent(new Event('show-enrollment-tab'));
      }
    };
  
    // On page load, if enrollment is visible, trigger the event
    if (document.getElementById('enrollment') && !document.getElementById('enrollment').classList.contains('d-none')) {
      document.dispatchEvent(new Event('show-enrollment-tab'));
    }
  
    // Open modal when 'Fill out new form' is clicked
    if (fillOutNewFormBtn) {
      fillOutNewFormBtn.addEventListener('click', function(e) {
        if (alumniRequestModal) {
          const modalInstance = bootstrap.Modal.getOrCreateInstance(alumniRequestModal);
          modalInstance.show();
        }
      });
    }
  
    if (backToHomeBtn) {
      backToHomeBtn.addEventListener('click', function() {
        showAlumniRequestHome();
      });
    }
  
    // Ensure backdrop is removed when modal is hidden
    if (alumniRequestModal) {
      alumniRequestModal.addEventListener('hidden.bs.modal', function () {
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      });
    }
  }); 
    // --- Function to get formatted date for a specific time ---
    function getFormattedDate(date = new Date()) {
      const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      return date.toLocaleString('en-US', options).replace(',', ' –');
    }