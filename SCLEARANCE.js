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
    const dateSpan = document.getElementById("signatory_clearance_dateToday");
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


  function closeOtpSidebar() {
document.getElementById("signatory_clearance_otpSidebar").classList.remove("show");
}


let currentApproveId = null;
let currentDisapproveId = null;

document.addEventListener("DOMContentLoaded", () => {
const buttons = document.querySelectorAll(".signatory-clearance-action-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "Approved") {
      currentApproveId = id;
      clearOtpInput();
      document.getElementById("signatory_clearance_otpError").style.display = "none";
      closeDisapproveSidebar();
      document.getElementById("signatory_clearance_otpSidebar").classList.add("show");
    } else {
      currentDisapproveId = id;
      clearDisapproveChecks();
      document.getElementById("signatory_clearance_disapproveError").style.display = "none";
      document.getElementById("signatory_clearance_appointmentError").style.display = "none";
      closeOtpSidebar();
      document.getElementById("signatory_clearance_disapproveSidebar").classList.add("show");
    }
  });
});

// OTP verification
document.getElementById("signatory_clearance_verifyOtpBtn").addEventListener("click", () => {
  const input = document.getElementById("signatory_clearance_otpinput");
  const code = input.value.trim();
  const correctCode = "12345678";
  if (code === correctCode) {
    handleApproval("Approved", `signatory_clearance_timestamp_signatory_${currentApproveId}`);
    closeOtpSidebar();
  } else {
    document.getElementById("signatory_clearance_otpError").style.display = "block";
  }
});

// Submit Disapproval with appointment
document.getElementById("signatory_clearance_submit_Appointment_Disapproval_Btn").addEventListener("click", () => {
  let checkedReasons = Array.from(document.querySelectorAll('#signatory_clearance_disapproveSidebar input[type="checkbox"]:checked')).map(cb => cb.value);
  const appointmentDate = document.getElementById("signatory_clearance_appointmentDate").value;

  const otherReasonChecked = document.getElementById("signatory_clearance_reasonOther").checked;
  const otherReasonInput = document.getElementById("signatory_clearance_otherReasonInput").value.trim();

  // Handle "Other" checkbox logic
  if (otherReasonChecked && otherReasonInput !== "") {
    checkedReasons = checkedReasons.filter(r => r !== "Other");
    checkedReasons.push(otherReasonInput);
  }

  // Reset errors
  document.getElementById("signatory_clearance_disapproveError").style.display = "none";
  document.getElementById("signatory_clearance_appointmentError").style.display = "none";

  if (checkedReasons.length === 0) {
    document.getElementById("signatory_clearance_disapproveError").style.display = "block";
    return;
  }
  if (!appointmentDate) {
    document.getElementById("signatory_clearance_appointmentError").style.display = "block";
    return;
  }

  // Log timestamp and message
  const timestamp = new Date().toLocaleString(undefined, {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  const target = document.getElementById(`signatory_clearance_timestamp_signatory_${currentDisapproveId}`);
  if (target) {
    let content = `Disapproved at ${timestamp}<br>— Reason: ${checkedReasons.join(", ")}`;
    content += `<br><span class="text-muted">— Appointment Date: ${appointmentDate}</span>`;
  
    const comment = document.getElementById("signatory_clearance_disapproveComment").value.trim();
    if (comment) {
      content += `<br><span class="text-muted">— Comment: ${comment}</span>`;
    }
  
    target.innerHTML = content;
  }

  closeDisapproveSidebar();
});

// When toggling the "Other" checkbox
document.getElementById("signatory_clearance_reasonOther").addEventListener("change", toggleOtherReasonInput);

function clearOtpInput() {
  document.getElementById("signatory_clearance_otpComment").value = "";
  const input = document.getElementById("signatory_clearance_otpinput");
  input.value = "";
  input.focus();
}
});

function closeOtpSidebar() {
document.getElementById("signatory_clearance_otpSidebar").classList.remove("show");
}

function closeDisapproveSidebar() {
document.getElementById("signatory_clearance_disapproveSidebar").classList.remove("show");
}

function clearDisapproveChecks() {
document.getElementById("signatory_clearance_disapproveComment").value = "";
document.querySelectorAll('#signatory_clearance_disapproveSidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
document.getElementById("signatory_clearance_appointmentDate").value = "";
document.getElementById("signatory_clearance_appointmentError").style.display = "none";
document.getElementById("signatory_clearance_disapproveError").style.display = "none";
document.getElementById("signatory_clearance_otherReasonInput").value = "";
document.getElementById("signatory_clearance_otherReasonContainer").style.display = "none";
}

function handleApproval(action, timestampId) {
  const el = document.getElementById(timestampId);
  if (el) {
    const now = new Date().toLocaleString(undefined, {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
    const comment = document.getElementById("signatory_clearance_otpComment").value.trim(); 
    let content = `${action} at ${now}`;
    if (comment) {
      content += `<br><span class="text-muted">— Comment: ${comment}</span>`;
    }
    el.innerHTML = content;
  }
}

function toggleOtherReasonInput() {
const otherCheckbox = document.getElementById("signatory_clearance_reasonOther");
const otherInputContainer = document.getElementById("signatory_clearance_otherReasonContainer");
otherInputContainer.style.display = otherCheckbox.checked ? "block" : "none";
}