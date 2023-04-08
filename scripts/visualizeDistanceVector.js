function sleep() {
  return new Promise((r) => setTimeout(r, 500));
}

import {
  highlight1,
  highlight2,
  unhighlight1,
  unhighlight2,
  flash,
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

const visualizeDistanceVector = async function (
  traversal,
  shortestPath,
  distanceTable
) {
  //console.log(distanceTable);
  let i = 0;
  displayTable(distanceTable[i]);

  for (const t of traversal) {
    //check if t is a node, only update table if t is node, t.isNode()
    if (t.isNode()) {
      i++;
      displayTable(distanceTable[i]);
      //setTimeout(() => {displayTable(distanceTable[i])}, 500);
    }
    t.addClass("highlighted");
    setTimeout(() => {
      t.removeClass("highlighted");
    }, 500);
    await sleep();
  }

  for (const t of shortestPath) {
    t.addClass("highlighted2");
    await sleep();
  }
};

export default visualizeDistanceVector;
