function updateNotificationCount(count) {
  const badge = document.getElementById("signatory_sidebar_notification_count");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById("signatory_sidebar");
  const backdrop = document.getElementById("signatory_sidebar_sidebarBackdrop");

  if (window.innerWidth <= 768) {
    signatory_sidebar.classList.remove("collapsed");
    signatory_sidebar.classList.toggle("show");
    signatory_sidebar_backdrop.classList.toggle("active");
  } else {
    signatory_sidebar.classList.toggle("collapsed");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const dateSpan = document.getElementById("signatory_messages_dateToday");
  const today = new Date();
  const formatted = today.toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  dateSpan.textContent = formatted;
});

window.addEventListener("resize", function () {
  const signatory_sidebar = document.getElementById("signatory_sidebar");
  const signatory_sidebar_backdrop = document.getElementById("signatory_sidebar_sidebarBackdrop");
  if (window.innerWidth > 768) {
    signatory_sidebar.classList.remove("show");
    signatory_sidebar_backdrop.classList.remove("active");
  }
});



function toggleProfile() {
  const profile = document.getElementById("signatory_messages_profile_sidebar");
  profile.classList.toggle("show");
}

function openChat() {
  document.getElementById("signatory_messages_main_chat").classList.add("show");
  document.getElementById("signatory_messages_profile_sidebar").classList.remove("show");
}

function closeChat() {
  document.getElementById("signatory_messages_main_chat").classList.remove("show");
}