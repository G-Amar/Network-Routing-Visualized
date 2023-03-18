import "./style.css";
import dijkstra from "./scripts/dijkstra";
import visualize from "./scripts/visualize";

var { shortestPath, traversal } = dijkstra("a", "c");

visualize(traversal, shortestPath);
