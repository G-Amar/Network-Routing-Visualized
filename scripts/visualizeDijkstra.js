import dijkstra from "./dijkstra";
import cy from "./graph";
import {
  highlight1,
  highlight2,
  unhighlight1,
  unhighlight2,
} from "./animations";

function sleep() {
  return new Promise((r) => setTimeout(r, 500));
}

function displayTable(distanceTable) {
  let table = document.getElementById("distanceTable");
  table.textContent = ""; //empty inner html
  let header = document.createElement("tr");
  header.innerHTML = "<th>Node</th><th>Cost</th><th>Prev</th><th>Edge</th>";
  table.appendChild(header);

  for (let row of distanceTable) {
    let tableRow = document.createElement("tr");
    for (let cell of row) {
      let tableCell = document.createElement("td");
      tableCell.innerHTML = cell === null ? "None" : cell; //None string if null
      tableRow.appendChild(tableCell);
    }
    table.appendChild(tableRow);
  }
}

//step forward/backward

let t_global = null;
let i_global = null;
let shortestPath_global = null;
let traversal_global = null;
let distanceTable_global = null;

const isInit = () => {
  if (
    !shortestPath_global ||
    !traversal_global ||
    !distanceTable_global ||
    t_global == null ||
    i_global == null
  ) {
    alert("Must run algorithm first.");
    return false;
  }
  return true;
};

const resetDijkstra = (starting, ending) => {
  if (starting == undefined || ending == undefined) {
    alert("Starting or ending value is undefined");
    return;
  }

  for (const t of cy.$()) {
    t.removeClass("highlighted");
    t.removeClass("highlighted2");
  }
  let { shortestPath, traversal, distanceTable } = dijkstra(
    `${starting}`,
    `${ending}`
  );
  t_global = -1;
  i_global = 0;

  shortestPath_global = shortestPath;
  traversal_global = traversal;
  distanceTable_global = distanceTable;

  displayTable(distanceTable_global[i_global]);
};

//return false if complete
const stepForwardDijkstra = function () {
  if (!isInit()) return true;
  if (t_global + 1 < traversal_global.length + shortestPath_global.length)
    t_global++; // always increment traversal index if possible

  if (t_global >= traversal_global.length) {
    highlight2(shortestPath_global[t_global - traversal_global.length]); // highlight updated shortest path index
  } else {
    highlight1(traversal_global[t_global]); // highlight updated traversal index

    if (i_global + 1 < distanceTable_global.length) i_global++; // increment and update table index
    displayTable(distanceTable_global[i_global]);
  }

  if (t_global == traversal_global.length + shortestPath_global.length - 1)
    return false;
  return true;
};

// return false if complete
const stepBackwardDijkstra = function () {
  if (!isInit()) return;

  if (t_global >= traversal_global.length) {
    unhighlight2(shortestPath_global[t_global - traversal_global.length]);
  } else if (t_global >= 0) {
    unhighlight1(traversal_global[t_global]);
    if (i_global - 1 >= 0) i_global--;
    displayTable(distanceTable_global[i_global]);
  }
  if (t_global - 1 >= -1) {
    t_global--; // do not understep
    return true;
  }
  return false;
};

const runToCompleteDijkstra = async () => {
  if (!isInit()) return;

  let res = stepForwardDijkstra();
  while (res) {
    await sleep();
    res = stepForwardDijkstra();
  }
};

export {
  resetDijkstra,
  stepBackwardDijkstra,
  stepForwardDijkstra,
  runToCompleteDijkstra,
};

// LEGACY
// const visualizeDijkstra = async function (
//   traversal,
//   shortestPath,
//   distanceTable
// )
//   //console.log(distanceTable);
//   let i = 0;
//   displayTable(distanceTable[i]);
//   for (const t of traversal) {
//     i++;
//     displayTable(distanceTable[i]);
//     //setTimeout(() => {displayTable(distanceTable[i])}, 500);
//     flash(t);
//     await sleep();
//   }

//   for (const t of shortestPath) {
//     t.addClass("highlighted2");
//     await sleep();
//   }
// };
