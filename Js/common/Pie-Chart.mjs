// Pie charts code
export const PieChart = () => {

    Highcharts.chart("pie-chart-container", {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
        },
        series: [
            {
                type: "pie",
                backgroundColor: "transparent",
                // name: "Total",
                data: [
                    {
                        name: "Organic",
                        y: 619,
                        color: "#0937B2",
                    },
                    {
                        name: "Social",
                        y: 586,
                        color: "#D9D9D9",
                    },
                    {
                        name: "Direct",
                        y: 647,
                        color: "#3C68D0",
                    },
                    {
                        name: "Refferal",
                        y: 247,
                        color: "#9EACCE",
                    },
                ],
                center: [75, 65],
                size: 190,
                innerSize: "70%",
                showInLegend: false,
                dataLabels: {
                    enabled: false,
                },
            },
        ],
    });
}