import cy from "./graph";

function customCopy(graph){
  let copy = [];

  const nodes = cy.nodes();
  nodes.forEach((element) => {
    let node = graph.get(element.id())
    copy.push([element.id(), node["cost"], node["prev"], node["edge"] && node["edge"].id()])
  });
  
  return copy;
}

function dijkstra(source, dest) {
  let visited = new Set();
  const nodes = cy.nodes();
  let graph = new Map(); //{id: {cost, prev, edge}}
  nodes.forEach((element) => {
    graph.set(element.id(), { cost: Infinity, prev: "-", edge: null });
  });
  graph.get(source)["cost"] = 0;

  let traversal = [];

  let distanceTable = []; //store graphs
  // first one might be optional
  distanceTable.push(customCopy(graph)); //store deep copy

  while (visited.size < graph.size) {
    let minCost = Infinity;
    let minNode = "";
    for (let key of graph.keys()) {
      if (!visited.has(key) && graph.get(key)["cost"] < minCost) {
        minCost = graph.get(key)["cost"];
        minNode = key;
      }
    }

    if (minNode === "") {
      alert("No Path Exists!");
      return {traversal, shortestPath:[], distanceTable};
    }

    visited.add(minNode);
    
    //console.log(graph);

    //adds previous edge
    // if (graph.get(`${minNode}`)?.edge != null) {
    //   traversal.push(graph.get(`${minNode}`).edge);
    // }
    traversal.push(cy.nodes(`#${minNode}`));
    distanceTable.push(customCopy(graph)); //store deep copy

    if (minNode === dest) break;

    //check and update neighbours
    let adjacent = cy.$(`#${minNode}`).connectedEdges();
    adjacent.forEach((edge) => {
      //pick other node than the minNode visited
      let connectedNode =
        edge.source().id() === minNode ? edge.target() : edge.source();

      //ensure connected node not already visited
      if (!visited.has(connectedNode.id())) {
        //this adds each edge if not already visited connecting node
        traversal.push(edge);

        let newWeight = minCost + edge.data("weight");
        //console.log(newWeight);
        if (newWeight < graph.get(connectedNode.id())["cost"]) {
          graph.get(connectedNode.id())["cost"] = newWeight;
          graph.get(connectedNode.id())["prev"] = minNode;
          graph.get(connectedNode.id())["edge"] = edge;
        }
        // store updates to each edge
        distanceTable.push(customCopy(graph)); //store deep copy
      }
    });
    //console.log(adjacent);
  }

  //construct path
  let shortestPath = [];

  let trav = dest;
  while (trav !== source) {
    let prev = graph.get(trav)["prev"];
    shortestPath.push(cy.nodes(`#${trav}`));
    shortestPath.push(graph.get(trav)["edge"]);
    trav = prev;
  }
  shortestPath.push(cy.nodes(`#${source}`)); //add source
  shortestPath.reverse();
  //render traversed here
  return { traversal, shortestPath, distanceTable};
}

export default dijkstra;
