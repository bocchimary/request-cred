function updateNotificationCount(count) {
    const badge = document.getElementById("alumni_sidebar_notification_count");
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-block" : "none";
    }
  }
  
  function toggleSidebar() {
    const sidebar = document.getElementById("alumni_sidebar");
    const backdrop = document.getElementById("alumni_sidebar_sidebarBackdrop");
  
    if (window.innerWidth <= 768) {
      alumni_sidebar.classList.remove("collapsed");
      alumni_sidebar.classList.toggle("show");
      alumni_sidebar_backdrop.classList.toggle("active");
    } else {
      alumni_sidebar.classList.toggle("collapsed");
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const dateSpan = document.getElementById("alumni_profile_dateToday");
    const today = new Date();
    const formatted = today.toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    dateSpan.textContent = formatted;
  });
  
  window.addEventListener("resize", function () {
    const alumni_sidebar = document.getElementById("alumni_sidebar");
    const alumni_sidebar_backdrop = document.getElementById("alumni_sidebar_sidebarBackdrop");
    if (window.innerWidth > 768) {
      alumni_sidebar.classList.remove("show");
      alumni_sidebar_backdrop.classList.remove("active");
    }
  });
  