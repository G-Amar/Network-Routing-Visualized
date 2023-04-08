const highlight1 = (item) => item.addClass("highlighted");
const unhighlight1 = (item) => item.removeClass("highlighted");
const highlight2 = (item) => item.addClass("highlighted2");
const unhighlight2 = (item) => item.removeClass("highlighted2");

function flash(item) {
  highlight1(item);
  setTimeout(() => {
    unhighlight1(item);
  }, 500);
}

export { highlight1, unhighlight1, highlight2, unhighlight2, flash };
