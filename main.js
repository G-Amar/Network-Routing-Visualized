import "./style.css";
import dijkstra from "./scripts/dijkstra";
import visualize from "./scripts/visualize";
import distanceVector from "./scripts/distanceVector";
import cy from "./scripts/graph";

var shortestPath, traversal;

var nodes = cy.json().elements.nodes;

var removeSelect = document.getElementById("removeSelect");

for(var c = 0; c < nodes.length; c++){
    var opt = nodes[c].data.id;
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    removeSelect.appendChild(el);
}

let addNode = event => {
    let input = document.getElementById("addNode").value;
    cy.add({
        group: 'nodes',
        data: {id: input},
        position: {x: 200, y: 200}
    }
    )
    var el = document.createElement("option");
    el.textContent = input;
    el.value = input;
    removeSelect.appendChild(el);
}

let removeNode = event => {
    let input = document.getElementById("removeSelect").value;
    if(input != ''){
        var toRemove = cy.$(`#${input}`)
        cy.remove(toRemove);
    }
    
    removeSelect.remove(removeSelect.selectedIndex);
}

let addEdge = event => {
    let node1 = document.getElementById("edge1").value;
    let node2 = document.getElementById("edge2").value;
    let weight  = document.getElementById("weight").value;
    cy.add({ group: 'edges', data: { id: `${node1}${node2}`, source: `${node1}`, target: `${node2}`, weight: `${weight}` }})
}

let runAlgo = event => {
    
    for (const t of cy.$()) {
        t.removeClass("highlighted");
        t.removeClass("highlighted2");
    }
    var algo = document.getElementById("algorithm").value;
    var starting = document.getElementById("start").value;
    var ending = document.getElementById("end").value;
   
    if (algo == "dijkstra"){
        var { shortestPath, traversal } = dijkstra(`${starting}`, `${ending}`);
        visualize(traversal, shortestPath); 
    } else {
        var { shortestPath, traversal } = distanceVector(`${starting}`, `${ending}`);
        visualize(traversal, shortestPath); 
    }  
}

document.getElementById("algoBtn").addEventListener("click", runAlgo);
document.getElementById('addEdgeBtn').addEventListener("click", addEdge);
document.getElementById('removeNodeBtn').addEventListener('click', removeNode);
document.getElementById('addNodeBtn').addEventListener('click', addNode);
