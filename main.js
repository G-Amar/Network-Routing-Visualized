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

document.getElementById('addNodeBtn').addEventListener('click', addNode);