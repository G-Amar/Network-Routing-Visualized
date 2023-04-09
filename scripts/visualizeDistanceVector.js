import distanceVector from "./distanceVector";
import cy from "./graph";

function sleep() {
  return new Promise((r) => setTimeout(r, 500));
}

import {
  highlight1,
  highlight2,
  unhighlight1,
  unhighlight2,
} from "./animations";

function displayTable(distanceTable) {
  let table = document.getElementById("distanceTable");
  table.textContent = ""; //empty inner html

  let header = document.createElement("tr");
  let subheader = document.createElement("tr");
  let subheaderText = "<th></th>"; //empty cell
  header.appendChild(document.createElement("th")); //empty cell

  for (let row of distanceTable) {
    //row[0] contains node names
    let tableCell = document.createElement("th");
    tableCell.colSpan = 3;
    tableCell.innerHTML = row[0];
    header.appendChild(tableCell);
    subheaderText += "<th>Cost</th><th>Via</th><th>Edge</th>";
  }
  subheader.innerHTML = subheaderText;

  table.appendChild(header);
  table.appendChild(subheader);

  //now add data for each row
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

const reset = (starting, ending) => {
  if (starting == undefined || ending == undefined) {
    alert("Starting or ending value is undefined");
    return;
  }

  for (const t of cy.$()) {
    t.removeClass("highlighted");
    t.removeClass("highlighted2");
  }
  let { shortestPath, traversal, distanceTable } = distanceVector(
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
const stepForward = function () {
  if (!isInit()) return true;
  if (t_global + 1 < traversal_global.length + shortestPath_global.length)
    t_global++; // always increment traversal index if possible

  if (t_global >= traversal_global.length) {
    // traveling shortest path
    highlight2(shortestPath_global[t_global - traversal_global.length]);

    //if equal, have to unhighlight last element of traversal array (edge case)
    if(t_global === traversal_global.length){
      unhighlight1(traversal_global[t_global - 1]);
    }
  } else {
    // traveling traversal => only update table here

    /* only for dv, unhighlight previous */
    if (t_global > 0) {
      unhighlight1(traversal_global[t_global - 1]);
    }

    /* highlight current */
    highlight1(traversal_global[t_global]);

    /* update table */
    if (i_global + 1 < distanceTable_global.length) i_global++;
    displayTable(distanceTable_global[i_global]);
  }

  if (t_global == traversal_global.length + shortestPath_global.length - 1)
    return false;
  return true;
};

// return false if complete
const stepBackward = function () {
  if (!isInit()) return;

  if (t_global >= traversal_global.length) {
    unhighlight2(shortestPath_global[t_global - traversal_global.length]);
  } else if (t_global >= 0) {
    unhighlight1(traversal_global[t_global]);
    if (i_global - 1 >= 0) i_global--;
    displayTable(distanceTable_global[i_global]);
  }
  if (t_global - 1 >= -1) {
    t_global--;

    /* only for dv */
    if (t_global >= 0 && t_global < traversal_global.length) {
      highlight1(traversal_global[t_global]);
    }
    return true;
  }
  return false;
};

const runToComplete = async () => {
  if (!isInit()) return;
  let res = stepForward();
  while (res) {
    await sleep();
    res = stepForward();
  }
};

export { reset, stepForward, stepBackward, runToComplete };

// const visualizeDistanceVector = async function (
//   traversal,
//   shortestPath,
//   distanceTable
// ) {
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
