import "./style.css";
import dijkstra from "./scripts/dijkstra";
import visualize from "./scripts/visualize";
import distanceVector from "./scripts/distanceVector";
import cy from "./scripts/graph";

let addNode = event => {
    let input = document.getElementById("addNode").value;
    cy.add({
        group: 'nodes',
        data: {id: input},
        position: {x: 200, y: 200}
    }
    )
}

let removeNode = event => {
    let input = document.getElementById("removeNode").value;
    var toRemove = cy.$(`#${input}`)
    cy.remove(toRemove);
}

let addEdge = event => {
    let node1 = document.getElementById("edge1").value;
    let node2 = document.getElementById("edge2").value;
    let weight  = document.getElementById("weight").value;
    cy.add({ group: 'edges', data: { id: `${node1}${node2}`, source: `${node1}`, target: `${node2}`, weight: `${weight}` }})
}

var shortestPath, traversal;

let runAlgo = event => {
    

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

    for (const t of cy.$()) {
        t.removeClass("highlighted");
        t.removeClass("highlighted2");
    }
    
}



document.getElementById("algoBtn").addEventListener("click", runAlgo);
document.getElementById('addEdgeBtn').addEventListener("click", addEdge);
document.getElementById('removeNodeBtn').addEventListener('click', removeNode);
document.getElementById('addNodeBtn').addEventListener('click', addNode);