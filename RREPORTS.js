function updateNotificationCount(count) {
    const badge = document.getElementById("registrar_sidebar_notification_count");
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-block" : "none";
    }
  }

  function toggleSidebar() {
    const sidebar = document.getElementById("registrar_sidebar");
    const backdrop = document.getElementById("registrar_sidebar_sidebarBackdrop");

    if (window.innerWidth <= 768) {
      registrar_sidebar.classList.remove("collapsed");
      registrar_sidebar.classList.toggle("show");
      registrar_sidebar_backdrop.classList.toggle("active");
    } else {
      registrar_sidebar.classList.toggle("collapsed");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const dateSpan = document.getElementById("registrar_generate_report_dateToday");
    const today = new Date();
    const formatted = today.toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    dateSpan.textContent = formatted;
  });

  window.addEventListener("resize", function () {
    const registrar_sidebar = document.getElementById("registrar_sidebar");
    const registrar_sidebar_backdrop = document.getElementById("registrar_sidebar_sidebarBackdrop");
    if (window.innerWidth > 768) {
      registrar_sidebar.classList.remove("show");
      registrar_sidebar_backdrop.classList.remove("active");
    }
  });


  function registrar_generate_report_toggleGeneratedReportsPanel() {
    const panel = document.getElementById("registrar_generate_report_generatedPanel");
    panel.classList.toggle("show");
  }
  
  
  function registrar_generate_report_generateReport() {
    // Dummy action for now
    alert("Report generated successfully!");
  }