import { fetchData } from "./common-functions.mjs";

// Pie charts code
export const PieChart = async () => {
    try {
        const data = await fetchData("https://pie-data.free.beeceptor.com/pie-chart-data");
        Highcharts.chart("pie-chart-container", {
            chart: {
                type: "pie",
                backgroundColor: "transparent",
            },
            series: [
                {
                    type: "pie",
                    backgroundColor: "transparent",
                    data,
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
    } catch (err) {
        console.log(err)
    }

}