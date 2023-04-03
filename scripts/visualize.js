function sleep() {
  return new Promise((r) => setTimeout(r, 500));
}

const visualize = async function (traversal, shortestPath, distanceTable) {
  console.log(distanceTable);
  for (const t of traversal) {
    //console.log(t.isNode()); //check if t is a node, only update table if t is node
    t.addClass("highlighted");
    setTimeout(() => {t.removeClass("highlighted")}, 500);
    await sleep();
  }

  for (const t of shortestPath) {
    t.addClass("highlighted2");
    await sleep();
  }
};

export default visualize;
