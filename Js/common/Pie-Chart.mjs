import { fetchData } from "./common-functions.mjs";

// Pie charts code
export const PieChart = async () => {
    try {
        const [organic_data, social_data, direct_data, refferal_data] = await fetchData("https://pie-chart-data.free.beeceptor.com/pie-chart-data")
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
                            y: organic_data,
                            color: "#0937B2",
                        },
                        {
                            name: "Social",
                            y: social_data,
                            color: "#D9D9D9",
                        },
                        {
                            name: "Direct",
                            y: direct_data,
                            color: "#3C68D0",
                        },
                        {
                            name: "Refferal",
                            y: refferal_data,
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
    } catch (err) {
        console.log(err)
    }

}