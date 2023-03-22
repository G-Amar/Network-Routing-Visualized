function sleep() {
  return new Promise((r) => setTimeout(r, 500));
}

const visualize = async function (traversal, shortestPath) {
  for (const t of traversal) {
    t.removeClass("highlighted");
    t.removeClass("highlighted2");
  }

  for (const t of traversal) {
    t.addClass("highlighted");
    await sleep();
  }

  for (const t of shortestPath) {
    t.addClass("highlighted2");
    await sleep();
  }
};

export default visualize;
