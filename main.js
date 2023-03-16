import "./style.css";
import cy from "./scripts/graph";

var bfs = cy.elements().bfs("#a", function () {}, true);

var i = 0;
var highlightNextEle = function () {
  if (i < bfs.path.length) {
    bfs.path[i].addClass("highlighted");
    i++;
    setTimeout(highlightNextEle, 1000);
  }
};

// kick off first highlight
highlightNextEle();
