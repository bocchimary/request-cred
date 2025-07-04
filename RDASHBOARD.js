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
  const dateSpan = document.getElementById("registrar_dashboard_dateToday");
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

const options = {
  series: [{
    name: 'Accomplishment',
    data: [10, 40, 35, 70, 50, 60, 90]
  }],
  chart: {
    height: 260,
    type: 'area',
    animations: { enabled: true }
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' },
  fill: {
type: 'gradient',
gradient: {
  shadeIntensity: 1,
  opacityFrom: 0.4,
  opacityTo: 1,
  stops: [0, 90, 100]
}
},

  xaxis: {
    type: 'datetime',
    categories: [
      "2025-06-15T00:00:00.000Z",
      "2025-06-16T00:00:00.000Z",
      "2025-06-17T00:00:00.000Z",
      "2025-06-18T00:00:00.000Z",
      "2025-06-19T00:00:00.000Z",
      "2025-06-20T00:00:00.000Z",
      "2025-06-21T00:00:00.000Z"
    ]
  },
  tooltip: { x: { format: 'dd MMM' } }
};

const chart = new ApexCharts(document.querySelector("#registrar_dashboard_totalAccomplishmentChart"), options);
chart.render();

const visitorsOptions = {
series: [{
  name: 'Visitors',
  data: [15, 25, 20, 30, 22, 35, 28]
}],
chart: {
  height: 260,
  type: 'area',
  animations: { enabled: true }
},
dataLabels: { enabled: false },
stroke: { curve: 'smooth' },
xaxis: {
  type: 'datetime',
  categories: [
    "2025-06-15T00:00:00.000Z",
    "2025-06-16T00:00:00.000Z",
    "2025-06-17T00:00:00.000Z",
    "2025-06-18T00:00:00.000Z",
    "2025-06-19T00:00:00.000Z",
    "2025-06-20T00:00:00.000Z",
    "2025-06-21T00:00:00.000Z"
  ]
},
tooltip: { x: { format: 'dd MMM' } }
};

const visitorsChart = new ApexCharts(document.querySelector("#registrar_dashboard_visitorsChart"), visitorsOptions);
visitorsChart.render();

const documentsOptions = {
series: [{
  name: 'Documents Released',
  data: [5, 8, 6, 12, 10, 15, 11]
}],
chart: {
  height: 260,
  type: 'area',
  animations: { enabled: true }
},
dataLabels: { enabled: false },
stroke: { curve: 'smooth' },
xaxis: {
  type: 'datetime',
  categories: [
    "2025-06-15T00:00:00.000Z",
    "2025-06-16T00:00:00.000Z",
    "2025-06-17T00:00:00.000Z",
    "2025-06-18T00:00:00.000Z",
    "2025-06-19T00:00:00.000Z",
    "2025-06-20T00:00:00.000Z",
    "2025-06-21T00:00:00.000Z"
  ]
},
tooltip: { x: { format: 'dd MMM' } }
};

const documentsChart = new ApexCharts(document.querySelector("#registrar_dashboard_documentsReleasedChart"), documentsOptions);
documentsChart.render();