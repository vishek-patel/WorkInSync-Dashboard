
// Importing functions
import { filterData, getCountries, updateUserData } from "./common/common-functions.mjs";
import { AreaGraphDraw } from './common/Area-graph.mjs';
import { stack_chart } from "./common/stack-chart.mjs";
import { mapHighChart } from './common/map.mjs';
import { PieChart } from './common/Pie-Chart.mjs';

// Main function
const main = () => {
    filterData()
    // getCountries()
    // AreaGraphDraw()
    // stack_chart()
    mapHighChart()
    // PieChart()
    // updateUserData()
}

main()