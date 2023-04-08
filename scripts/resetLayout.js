import graphLayout from "./graphLayout";
import cy from "./graph";

const resetLayout = () => {
  cy.layout(graphLayout).run();
};

export default resetLayout;
