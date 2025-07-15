function updateNotificationCount(count) {
  const badge = document.getElementById("bm_sidebar_notification_count");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}

function toggleSidebar() {
  const bm_sidebar = document.getElementById("bm_sidebar");
  const bm_sidebar_backdrop = document.getElementById("bm_sidebar_sidebarBackdrop");

  if (window.innerWidth <= 768) {
    bm_sidebar.classList.remove("collapsed");
    bm_sidebar.classList.toggle("show");
    bm_sidebar_backdrop.classList.toggle("active");
  } else {
    bm_sidebar.classList.toggle("collapsed");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const dateSpan = document.getElementById("bm_generate_report_dateToday");
  const today = new Date();
  const formatted = today.toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  dateSpan.textContent = formatted;
});

window.addEventListener("resize", function () {
  const bm_sidebar = document.getElementById("bm_sidebar");
  const bm_sidebar_backdrop = document.getElementById("bm_sidebar_sidebarBackdrop");
  if (window.innerWidth > 768) {
    bm_sidebar.classList.remove("show");
    bm_sidebar_backdrop.classList.remove("active");
  }
});



  function bm_generate_report_toggleGeneratedReportsPanel() {
    const panel = document.getElementById("bm_generate_report_generatedPanel");
    panel.classList.toggle("show");
  }
  
  
  function bm_generate_report_generateReport() {
    // Dummy action for now
    alert("Report generated successfully!");
  }