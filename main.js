import "./style.css";
import {
  runToCompleteDijkstra,
  resetDijkstra,
  stepForwardDijkstra,
  stepBackwardDijkstra,
} from "./scripts/visualizeDijkstra";
import {
  reset as resetDV,
  runToComplete as runToCompleteDV,
  stepForward as stepForwardDV,
  stepBackward as stepBackwardDV,
} from "./scripts/visualizeDistanceVector";
import cy from "./scripts/graph";

var nodes = cy.json().elements.nodes;

var edges = cy.edges();

var nodeSelect = document.querySelectorAll(".nodeSelect");

var edgeSelect = document.querySelectorAll(".edgeSelect");

nodeSelect.forEach((select) => {
  for (var c = 0; c < nodes.length; c++) {
    var opt = nodes[c].data.id;
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
});

edgeSelect.forEach((select) => {
  for (let edge of edges) {
    var opt = edge.id();
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
});

let addNode = () => {
  let input = document.getElementById("addNode").value;
  cy.add({
    group: "nodes",
    data: { id: input },
    position: { x: 200, y: 200 },
  });

  nodeSelect.forEach((select) => {
    var el = document.createElement("option");
    el.textContent = input;
    el.value = input;
    select.appendChild(el);
  });
};

let removeNode = () => {
  let input = document.getElementById("removeSelect").value;
  if (input != "") {
    var toRemove = cy.$(`#${input}`);
    cy.remove(toRemove);
  }

  nodeSelect.forEach((select) => {
    for (var i = 0; i < select.length; i++) {
      if (select.options[i].value == input) {
        select.remove(i);
        break;
      }
    }
  });

  //recompute the remaining edges
  edgeSelect.forEach((select) => {
    select.textContent = ""; //empty inner html
    edges = cy.edges();
    for (let edge of edges) {
      var opt = edge.id();
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  });
};

let removeEdge = () => {
  let input = document.getElementById("removeEdgeSelect").value;
  //console.log(input);
  if (input != "") {
    var toRemove = cy.$(`#${input}`);
    cy.remove(toRemove);
  }

  edgeSelect.forEach((select) => {
    for (var i = 0; i < select.length; i++) {
      if (select.options[i].value == input) {
        select.remove(i);
        break;
      }
    }
  });
};

let updateEdge = () => {
  let input = document.getElementById("updateEdgeSelect").value;
  let newWeight = parseFloat(document.getElementById("updateEdgeWeight").value);
  //console.log(input, newWeight);
  if (isNaN(newWeight) || newWeight < 0) {
    alert("Invalid weight [Negative or Not a Number]");
    return;
  }
  if (input != "") {
    cy.$(`#${input}`).data("weight", newWeight);
  }
};

let addEdge = () => {
  let node1 = document.getElementById("edge1").value;
  let node2 = document.getElementById("edge2").value;
  let weight = parseFloat(document.getElementById("weight").value);
  //console.log(cy.edges(`#${node1}${node2}`).length, cy.edges(`#${node2}${node1}`));
  if (
    cy.edges(`#${node1}-${node2}`).length > 0 ||
    cy.edges(`#${node2}-${node1}`).length > 0
  ) {
    alert("Edge already exists");
    return;
  }
  if (node1 === node2) {
    alert("No single node edges allowed!");
    return;
  }
  if (isNaN(weight) || weight < 0) {
    alert("Invalid weight [Negative or Not a Number]");
    return;
  }
  cy.add({
    group: "edges",
    data: {
      id: `${node1}-${node2}`,
      source: `${node1}`,
      target: `${node2}`,
      weight: weight,
    },
  });

  //add edge to each edgeSelect
  edgeSelect.forEach((select) => {
    var el = document.createElement("option");
    el.textContent = `${node1}-${node2}`;
    el.value = `${node1}-${node2}`;
    select.appendChild(el);
  });
};

let runAlgo = () => {
  var algo = document.getElementById("algorithm").value;
  var starting = document.getElementById("start").value;
  var ending = document.getElementById("end").value;

  if (algo == "dijkstra") {
    resetDijkstra(starting, ending);
  } else {
    resetDV(starting, ending);
  }
};

let runToComplete = () => {
  var algo = document.getElementById("algorithm").value;

  if (algo == "dijkstra") {
    runToCompleteDijkstra();
  } else {
    runToCompleteDV();
  }
};

let stepForward = () => {
  var algo = document.getElementById("algorithm").value;

  if (algo == "dijkstra") {
    stepForwardDijkstra();
  } else {
    stepForwardDV();
  }
};

let stepBackward = () => {
  var algo = document.getElementById("algorithm").value;

  if (algo == "dijkstra") {
    stepBackwardDijkstra();
  } else {
    stepBackwardDV();
  }
};

document.getElementById("algoBtn").addEventListener("click", runAlgo);
document.getElementById("addEdgeBtn").addEventListener("click", addEdge);
document.getElementById("removeNodeBtn").addEventListener("click", removeNode);
document.getElementById("addNodeBtn").addEventListener("click", addNode);
document.getElementById("removeEdgeBtn").addEventListener("click", removeEdge);
document.getElementById("updateEdgeBtn").addEventListener("click", updateEdge);

document
  .getElementById("runToComplete")
  .addEventListener("click", runToComplete);
document.getElementById("stepForward").addEventListener("click", stepForward);
document.getElementById("stepBackward").addEventListener("click", stepBackward);
