import cytoscape from "cytoscape";
import layout from "./graphLayout";

const cy = cytoscape({
  container: document.getElementById("cy"),

  boxSelectionEnabled: false,
  autounselectify: true,

  style: cytoscape
    .stylesheet()
    .selector("node")
    .style({
      content: "data(id)",
    })
    .selector("edge")
    .style({
      "curve-style": "bezier",
      width: 4,
      "line-color": "#ddd",
      label: "data(weight)", // maps to data.label
    })
    .selector(".highlighted")
    .style({
      "background-color": "#61bffc",
      "line-color": "#61bffc",
      "transition-property": "background-color, line-color",
      "transition-duration": "0.5s",
    }),

  elements: {
    nodes: [
      { data: { id: "a" } },
      { data: { id: "b" } },
      { data: { id: "c" } },
      { data: { id: "d" } },
      { data: { id: "e" } },
    ],

    edges: [
      { data: { id: "ae", weight: 1, source: "a", target: "e" } },
      { data: { id: "ab", weight: 3, source: "a", target: "b" } },
      { data: { id: "be", weight: 4, source: "b", target: "e" } },
      { data: { id: "bc", weight: 5, source: "b", target: "c" } },
      { data: { id: "ce", weight: 6, source: "c", target: "e" } },
      { data: { id: "cd", weight: 2, source: "c", target: "d" } },
      { data: { id: "de", weight: 7, source: "d", target: "e" } },
    ],
  },

  layout,

  zoom: 1,
  pan: { x: 0, y: 0 },
});

export default cy;
