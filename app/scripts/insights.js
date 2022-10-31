Chart.defaults.font.size = 15;
Chart.defaults.font.family = "Poppins";
Chart.defaults.font.weight = 500;
Chart.defaults.color = "#3f3f3f80";

// Chart.defaults.scales["timeseries"].ticks.borderDash = [5, 5];
// Chart.defaults.scales["linear"].ticks.display = false;
Chart.defaults.borderWidth = 3;
Chart.defaults.plugins.tooltip.enabled = false;

var user_usage_data = usage();
var island_usage_data = island();

new Chart(document.getElementById("monthly-energy-usage").getContext("2d"), {
    type: "line",
    data: {
        datasets: [{
            data: user_usage_data,
            borderColor: "#30c060ff",
            backgroundColor: "#30c060ff",
            borderWidth: 2
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "month",
                    displayFormats: {
                        month: "MMM dd"
                    }
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

new Chart(document.getElementById("island-energy-sources").getContext("2d"), {
    type: "doughnut",
    title: "Interact with the chart",
    data: {
        labels: island_usage_data.map((x) => x[0]),
        datasets: [{
            data: island_usage_data.map((x) => x[1]),
            backgroundColor: ["#005030ff", "#00a050ff", "#30c060ff", "#50e080ff", "#40f0a0ff", "#20f0d0ff", "#20d0f0ff", "#10b0e0ff", "#1090d0ff"]
        }]
    },
    options: {
        hoverOffset: 4,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: true
            },
            legend: {
                display: false,
                position: "bottom",
                align: "center"
            }
        },
        rotation: -110,
        circumference: 220,
        cutout: "60%"
    }
});

new Chart(document.getElementById("energy-comparison").getContext("2d"), {
    type: "bar",
    data: {
        labels: ["1 Yr Ago", "Last Month", "This Month"],
        datasets: [{
            data: [848, 678, 748],
            backgroundColor: [
                "#00a050ff",
                "#ff5060ff",
                "#10b0e0ff"
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});