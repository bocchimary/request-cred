document.addEventListener('DOMContentLoaded', function() {
  // Save button
  const saveBtn = document.getElementById('saveEnrollmentBtn');
  // Submit button
  const submitBtn = document.getElementById('submitEnrollmentBtn');
  // Enrollment form
  const enrollmentForm = document.getElementById('enrollmentForm');
  // Modal (lowercase id)
  const enrollmentModal = document.getElementById('enrollmentModal');
  // Fill out new form button in history section (capital E in data-bs-target)
  const fillOutNewFormBtn = document.querySelector('#enrollmentHistorySection [data-bs-target="#EnrollmentModal"]');
  // Back to Home button in history section
  const backToHomeBtn = document.getElementById('enrollmentBackToHomeBtn');

  // Function to show history and hide home
  function showEnrollmentHistory() {
    // Hide home section
    const homeSection = document.getElementById('enrollmentHomeSection');
    if (homeSection) homeSection.classList.add('d-none');
    // Show history section
    const historySection = document.getElementById('enrollmentHistorySection');
    if (historySection) historySection.classList.remove('d-none');
    // Persist state
    sessionStorage.setItem('showEnrollmentHistory', 'true');
  }

  // Function to show home and hide history
  function showEnrollmentHome() {
    const homeSection = document.getElementById('enrollmentHomeSection');
    if (homeSection) homeSection.classList.remove('d-none');
    const historySection = document.getElementById('enrollmentHistorySection');
    if (historySection) historySection.classList.add('d-none');
    sessionStorage.removeItem('showEnrollmentHistory');
  }

  // Function to close the modal
  function closeEnrollmentModal() {
    if (enrollmentModal) {
      const modalInstance = bootstrap.Modal.getInstance(enrollmentModal) || new bootstrap.Modal(enrollmentModal);
      modalInstance.hide();
    }
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', function(e) {
      showEnrollmentHistory();
      closeEnrollmentModal();
    });
  }

  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent form from reloading the page
      showEnrollmentHistory();
      closeEnrollmentModal();
    });
  }

  // When the enrollment tab is shown, check sessionStorage and show the correct section
  document.addEventListener('show-enrollment-tab', function() {
    if (sessionStorage.getItem('showEnrollmentHistory') === 'true') {
      showEnrollmentHistory();
    } else {
      showEnrollmentHome();
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
      if (enrollmentModal) {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(enrollmentModal);
        modalInstance.show();
      }
    });
  }

  if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', function() {
      showEnrollmentHome();
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