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
  let graph = new Map();
  nodes.forEach(element => {
    graph.set(element.id(), {val: Infinity, prev: "", edge: null});
  });
  graph.get(source)["val"] = 0;

  while(graph.size > 0){

    let minVal = Infinity;
    let minNode = "";
    for(let key of graph.keys()){
      if(!visited.has(key) && graph.get(key)['val'] < minVal){
        minVal = graph.get(key)['val'];
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
    //graph.delete(minNode);

    //check and update neighbours
    let adjacent = cy.$(`#${minNode}`).connectedEdges();
    adjacent.forEach(edge => {
      let connectedNode =  edge.source().id() === minNode ? edge.target() : edge.source();
      //console.log(connectedNode.id());
      //ensure connected node not already vosited
      if(!visited.has(connectedNode.id())){
        let newWeight = minVal + edge.data("weight");
        //console.log(newWeight);
        if(newWeight < graph.get(connectedNode.id())["val"]){
          graph.get(connectedNode.id())["val"] = newWeight;
          graph.get(connectedNode.id())["prev"] = minNode;
          graph.get(connectedNode.id())["edge"] = edge;
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
  
  return path.reverse(); //make it render properly
}