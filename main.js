import "./style.css";
import cy from "./scripts/graph";

var route = dijkstra("a", "c");

var i = 0;
var highlightNextEle = function () {
  if (i < route.length) {
    route[i].addClass("highlighted");
    i++;
    setTimeout(highlightNextEle, 1000);
  }
};

// kick off first highlight
highlightNextEle();

function dijkstra(source, dest) {
  let visited = new Set();
  const nodes = cy.nodes();
  let graph = new Map();  //{id: {cost, prev, edge}}
  nodes.forEach(element => {
    graph.set(element.id(), {cost: Infinity, prev: "", edge: null});
  });
  graph.get(source)["cost"] = 0;

  let traversed = [];

  while(graph.size > 0){

    let minCost = Infinity;
    let minNode = "";
    for(let key of graph.keys()){
      if(!visited.has(key) && graph.get(key)['cost'] < minCost){
        minCost = graph.get(key)['cost'];
        minNode = key;
      }
    }
    
    if(minNode === ""){
      alert("No Path Exists!");
      console.log("Graph doesnt connect");
      return [];
    }

    if(minNode === dest) break;

    visited.add(minNode);
    traversed.push(cy.nodes(`#${minNode}`));
    //graph.delete(minNode);

    //check and update neighbours
    let adjacent = cy.$(`#${minNode}`).connectedEdges();
    adjacent.forEach(edge => {
      //pick other node than the minNode visited
      let connectedNode =  edge.source().id() === minNode ? edge.target() : edge.source();
      
      //ensure connected node not already visited
      if(!visited.has(connectedNode.id())){
        let newWeight = minCost + edge.data("weight");
        //console.log(newWeight);
        if(newWeight < graph.get(connectedNode.id())["cost"]){
          graph.get(connectedNode.id())["cost"] = newWeight;
          graph.get(connectedNode.id())["prev"] = minNode;
          graph.get(connectedNode.id())["edge"] = edge;

          traversed.push(edge);
        }
      } 
    })
    //console.log(adjacent);
  }

  //construct path
  let path = [];

  let trav = dest;
  while(trav !== source){
    let prev = graph.get(trav)['prev'];
    path.push(cy.nodes(`#${trav}`));
    path.push(graph.get(trav)['edge']);
    trav = prev;
  }
  path.push(cy.nodes(`#${source}`)) //add source
  

  //render traversed here
  return traversed;

  //render path here
  //return path.reverse(); //make it render properly
}