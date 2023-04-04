function sleep() {
  return new Promise((r) => setTimeout(r, 500));
}

function displayTable(distanceTable){
  let table = document.getElementById("distanceTable");
  table.textContent = ""; //empty inner html
  let header = document.createElement("tr");
  header.innerHTML = "<th>Node</th><th>Cost</th><th>Prev</th><th>Edge</th>"
  table.appendChild(header);

  for(let row of distanceTable){
    let tableRow = document.createElement("tr"); 
    for(let cell of row){
      let tableCell = document.createElement("td");
      tableCell.innerHTML = cell === null ? "None": cell; //None string if null
      tableRow.appendChild(tableCell);
    }
    table.appendChild(tableRow);
  }
}

const visualizeDjikstra = async function (traversal, shortestPath, distanceTable) {
  //console.log(distanceTable);
  let i = 0;
  displayTable(distanceTable[i]);
  for (const t of traversal) {
    i++;
    displayTable(distanceTable[i]);
    //setTimeout(() => {displayTable(distanceTable[i])}, 500);
    t.addClass("highlighted");
    setTimeout(() => {t.removeClass("highlighted")}, 500);
    await sleep();
  }

  for (const t of shortestPath) {
    t.addClass("highlighted2");
    await sleep();
  }
};

export default visualizeDjikstra;
