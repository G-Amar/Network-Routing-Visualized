import "./style.css";
import dijkstra from "./scripts/dijkstra";
import visualize from "./scripts/visualize";
import distanceVector from "./scripts/distanceVector";

//var { shortestPath, traversal } = dijkstra("a", "c");

var { shortestPath, traversal } = distanceVector("a", "c");

visualize(traversal, shortestPath);
