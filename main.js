import "./style.css";
import dijkstra from "./scripts/dijkstra";
import visualize from "./scripts/visualize";
import distanceVector from "./scripts/distanceVector";
import cy from "./scripts/graph";

//var { shortestPath, traversal } = dijkstra("a", "c");

var { shortestPath, traversal } = distanceVector("a", "c");

visualize(traversal, shortestPath);

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

document.getElementById('addEdgeBtn').addEventListener("click", addEdge);
document.getElementById('removeNodeBtn').addEventListener('click', removeNode);
document.getElementById('addNodeBtn').addEventListener('click', addNode);