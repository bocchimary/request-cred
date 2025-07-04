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
    const dateSpan = document.getElementById("registrar_user_manager_dateToday");
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




function showUser(
  name, email, status, img, role, lastLogin, phone, address,
  notes = '', department = '', course = '', year = '', section = ''
) {
  // Hide both panels first
  document.getElementById("registrar_user_manager_adminPanel").style.display = "none";
  document.getElementById("registrar_user_manager_studentPanel").style.display = "none";

  // Determine which panel to show
  if (role.toLowerCase() === "admin") {
    const el = document;
    el.getElementById("registrar_user_manager_adminPanel").style.display = "block";
    el.getElementById("registrar_user_manager_adminImg").src = img;
    el.getElementById("registrar_user_manager_adminName").textContent = name;
    el.getElementById("registrar_user_manager_adminEmail").textContent = email;
    el.getElementById("registrar_user_manager_adminStatus").textContent = status;
    el.getElementById("registrar_user_manager_adminStatus").className = "user-status " + (status === "Active" ? "active-status" : "inactive-status");
    el.getElementById("registrar_user_manager_adminRole").textContent = role;
    el.getElementById("registrar_user_manager_adminLastLogin").textContent = lastLogin;
    el.getElementById("registrar_user_manager_adminPhone").textContent = phone;
    el.getElementById("registrar_user_manager_adminEmailDetail").textContent = email;
    el.getElementById("registrar_user_manager_adminAddress").textContent = address;
    el.getElementById("registrar_user_manager_adminNotes").textContent = notes;
    el.getElementById("registrar_user_manager_adminDepartment").textContent = department;
  } else {
    const el = document;
    el.getElementById("registrar_user_manager_studentPanel").style.display = "block";
    el.getElementById("registrar_user_manager_studentImg").src = img;
    el.getElementById("registrar_user_manager_studentName").textContent = name;
    el.getElementById("registrar_user_manager_studentEmail").textContent = email;
    el.getElementById("registrar_user_manager_studentStatus").textContent = status;
    el.getElementById("registrar_user_manager_studentStatus").className = "user-status " + (status === "Active" ? "active-status" : "inactive-status");
    el.getElementById("registrar_user_manager_studentRole").textContent = role;
    el.getElementById("registrar_user_manager_studentCourse").textContent = course;
    el.getElementById("registrar_user_manager_studentYear").textContent = year;
    el.getElementById("registrar_user_manager_studentSection").textContent = section;
    el.getElementById("registrar_user_manager_studentLastLogin").textContent = lastLogin;
    el.getElementById("registrar_user_manager_studentPhone").textContent = phone;
    el.getElementById("registrar_user_manager_studentEmailDetail").textContent = email;
    el.getElementById("registrar_user_manager_studentAddress").textContent = address;
    el.getElementById("registrar_user_manager_studentNotes").textContent = notes;
  }
}

function hideUser() {
  document.getElementById("registrar_user_manager_adminPanel").style.display = "none";
  document.getElementById("registrar_user_manager_studentPanel").style.display = "none";
}

function deleteUser() {
  if (confirm("Are you sure you want to delete this user?")) {
    alert("User deleted (simulation)");
    hideUser();
  }
}
