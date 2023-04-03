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
    })
    .selector(".highlighted2")
    .style({
      "background-color": "#028A0F",
      "line-color": "#028A0F",
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
      { data: { id: "a-e", weight: 1, source: "a", target: "e" } },
      { data: { id: "a-b", weight: 3, source: "a", target: "b" } },
      { data: { id: "b-e", weight: 4, source: "b", target: "e" } },
      { data: { id: "b-c", weight: 5, source: "b", target: "c" } },
      { data: { id: "c-e", weight: 6, source: "c", target: "e" } },
      { data: { id: "c-d", weight: 2, source: "c", target: "d" } },
      { data: { id: "d-e", weight: 7, source: "d", target: "e" } },
    ],
  },

  layout,

  zoom: 1,
  pan: { x: 0, y: 0 },
  
});
export default cy;
