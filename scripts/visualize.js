function sleep() {
  return new Promise((r) => setTimeout(r, 500));
}

const visualize = async function (traversal, shortestPath) {
  for (const t of traversal) {
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
