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
    const dateSpan = document.getElementById("registrar_enrollment_dateToday");
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


  function closeOtpSidebar() {
document.getElementById("registrar_enrollment_otpSidebar").classList.remove("show");
}


let currentApproveId = null;
let currentDisapproveId = null;

document.addEventListener("DOMContentLoaded", () => {
const buttons = document.querySelectorAll(".registrar-enrollment-action-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "Approved") {
      currentApproveId = id;
      clearOtpInput();
      document.getElementById("registrar_enrollment_otpError").style.display = "none";
      closeDisapproveSidebar();
      document.getElementById("registrar_enrollment_otpSidebar").classList.add("show");
    } else {
      currentDisapproveId = id;
      clearDisapproveChecks();
      document.getElementById("registrar_enrollment_disapproveError").style.display = "none";
      document.getElementById("registrar_enrollment_appointmentError").style.display = "none";
      closeOtpSidebar();
      document.getElementById("registrar_enrollment_disapproveSidebar").classList.add("show");
    }
  });
});

// OTP verification
document.getElementById("registrar_enrollment_verifyOtpBtn").addEventListener("click", () => {
  const input = document.getElementById("registrar_enrollment_otpinput");
  const code = input.value.trim();
  const correctCode = "12345678";
  if (code === correctCode) {
    handleApproval("Approved", `registrar_enrollment_timestamp_registrar_${currentApproveId}`);
    closeOtpSidebar();
  } else {
    document.getElementById("registrar_enrollment_otpError").style.display = "block";
  }
});

// Submit Disapproval with appointment
document.getElementById("registrar_enrollment_submit_Appointment_Disapproval_Btn").addEventListener("click", () => {
  let checkedReasons = Array.from(document.querySelectorAll('#registrar_enrollment_disapproveSidebar input[type="checkbox"]:checked')).map(cb => cb.value);
  const appointmentDate = document.getElementById("registrar_enrollment_appointmentDate").value;

  const otherReasonChecked = document.getElementById("registrar_enrollment_reasonOther").checked;
  const otherReasonInput = document.getElementById("registrar_enrollment_otherReasonInput").value.trim();

  // Handle "Other" checkbox logic
  if (otherReasonChecked && otherReasonInput !== "") {
    checkedReasons = checkedReasons.filter(r => r !== "Other");
    checkedReasons.push(otherReasonInput);
  }

  // Reset errors
  document.getElementById("registrar_enrollment_disapproveError").style.display = "none";
  document.getElementById("registrar_enrollment_appointmentError").style.display = "none";

  if (checkedReasons.length === 0) {
    document.getElementById("registrar_enrollment_disapproveError").style.display = "block";
    return;
  }
  if (!appointmentDate) {
    document.getElementById("registrar_enrollment_appointmentError").style.display = "block";
    return;
  }

  // Log timestamp and message
  const timestamp = new Date().toLocaleString(undefined, {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  const target = document.getElementById(`registrar_enrollment_timestamp_registrar_${currentDisapproveId}`);
  if (target) {
    let content = `Disapproved at ${timestamp}<br>— Reason: ${checkedReasons.join(", ")}`;
    content += `<br><span class="text-muted">— Appointment Date: ${appointmentDate}</span>`;
  
    const comment = document.getElementById("registrar_enrollment_disapproveComment").value.trim();
    if (comment) {
      content += `<br><span class="text-muted">— Comment: ${comment}</span>`;
    }
  
    target.innerHTML = content;
  }

  closeDisapproveSidebar();
});

// When toggling the "Other" checkbox
document.getElementById("registrar_enrollment_reasonOther").addEventListener("change", toggleOtherReasonInput);

function clearOtpInput() {
  document.getElementById("registrar_enrollment_otpComment").value = "";
  const input = document.getElementById("registrar_enrollment_otpinput");
  input.value = "";
  input.focus();
}
});

function closeOtpSidebar() {
document.getElementById("registrar_enrollment_otpSidebar").classList.remove("show");
}

function closeDisapproveSidebar() {
document.getElementById("registrar_enrollment_disapproveSidebar").classList.remove("show");
}

function clearDisapproveChecks() {
document.getElementById("registrar_enrollment_disapproveComment").value = "";
document.querySelectorAll('#registrar_enrollment_disapproveSidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
document.getElementById("registrar_enrollment_appointmentDate").value = "";
document.getElementById("registrar_enrollment_appointmentError").style.display = "none";
document.getElementById("registrar_enrollment_disapproveError").style.display = "none";
document.getElementById("registrar_enrollment_otherReasonInput").value = "";
document.getElementById("registrar_enrollment_otherReasonContainer").style.display = "none";
}

function handleApproval(action, timestampId) {
  const el = document.getElementById(timestampId);
  if (el) {
    const now = new Date().toLocaleString(undefined, {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
    const comment = document.getElementById("registrar_enrollment_otpComment").value.trim(); 
    let content = `${action} at ${now}`;
    if (comment) {
      content += `<br><span class="text-muted">— Comment: ${comment}</span>`;
    }
    el.innerHTML = content;
  }
}

function toggleOtherReasonInput() {
const otherCheckbox = document.getElementById("registrar_enrollment_reasonOther");
const otherInputContainer = document.getElementById("registrar_enrollment_otherReasonContainer");
otherInputContainer.style.display = otherCheckbox.checked ? "block" : "none";
}