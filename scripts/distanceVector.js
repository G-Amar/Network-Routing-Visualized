import cy from "./graph";

function distanceVector(source, dest) {
  const nodes = cy.nodes();

  let traversal = [];

  let graph = {}; //{id: {map of node: {cost, via, edge}}}
  //via = '' means that there is a direct edge connecting the 2 nodes

  for(let node1 of nodes){
    let n1 = node1.id();
    graph[n1] = {};
    for(let node2 of nodes){
      let n2 = node2.id();
      if(n1 == n2) graph[n1][n2] = {'cost': 0, 'via': '', 'edge': null};
      else graph[n1][n2] = {'cost': Infinity, 'via': '', 'edge': null};
    }
  }

  const edges = cy.edges();
  for(let edge of edges){
    let src = edge.data('source');
    let target = edge.data('target');
    let cost = edge.data('weight');

    graph[src][target]['cost'] = cost;
    graph[src][target]['edge'] = edge;
    graph[target][src]['cost'] = cost;
    graph[target][src]['edge'] = edge;
  }

  //console.log(graph);

  let messages = []  //our message queue

  //push each neighbour to queue to notify change in routing table
  for(let node of nodes){
    let neighbors = node.neighbourhood('node');
    for(let neighbor of neighbors){
      messages.push({'sender': node, 'reciever': neighbor});
    }
    //console.log(neighbors);
    traversal.push(node); //1st visit each node and broadcast neighbors
    let adjacentEdges = node.neighbourhood('edge');
    for(let edge of adjacentEdges){
      traversal.push(edge);
    }
  }

  const MAX_ITER = 100000;
  let iter = 0;
  while(messages.length > 0 && iter < MAX_ITER){  //prevent potential infinite
    iter++;
    let msg = messages.shift();
    let s = msg['sender'];   //actual node
    let r = msg['reciever']; //actual node
    let sender = s.id();
    let reciever = r.id();
    //sender and reciever are ALWAYS neighbours, i.e. edge connects them

    let changed = false;

    for(let each of nodes){
      let node = each.id();
      let currCost = graph[reciever][node]['cost'];
      let id = s.edgesTo(r).id() || r.edgesTo(s).id();
      let connectingEdge = cy.edges(`#${id}`);
      let costToSender = connectingEdge.data('weight');
      let costViaSender = costToSender + graph[sender][node]['cost'];
      // can't use cost to node, HAVE to use cost of edge to node
      // bad edge case where cost to adjacent node is smaller by going via another node
      // in this case the smaller cost is reported, but the edge is of the other node is saved
      
      if(costViaSender < currCost){
        graph[reciever][node]['cost'] = costViaSender;
        graph[reciever][node]['via'] = sender;
        graph[reciever][node]['edge'] = connectingEdge;
        changed = true;
      }
    }

    traversal.push(r);

    if(changed){
      //broadcast to neighbors
      let neighbors = r.neighbourhood('node');
      for(let neighbor of neighbors)
        messages.push({'sender': r, 'reciever': neighbor})

      let adjacentEdges = r.neighbourhood('edge'); //broadcast via edges
      for(let edge of adjacentEdges)
        traversal.push(edge);
    }
  }

  //console.log(graph);

  let shortestPath = [];

  let trav = source;
  while (trav !== '') { //'' indicates no more connections, direct edge to node
    shortestPath.push(cy.nodes(`#${trav}`));
    shortestPath.push(graph[trav][dest]["edge"]);
    trav = graph[trav][dest]['via'];
  }
  shortestPath.push(cy.nodes(`#${dest}`)); //add destination

  //console.log(shortestPath.map(e => {return e.id()}));

  //want traversal to highlight briefly, not sustained
  return {traversal, shortestPath};
}

export default distanceVector;