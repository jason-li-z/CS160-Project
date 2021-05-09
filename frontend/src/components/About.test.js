import * as React from "react";
import * as ReactDom from "react-dom";
import About from "./About"

test("renders the correct content", () => {
  const root = document.createElement("div");
  ReactDom.render(<About/>, root);
 // render(<About/>);
  //const a = screen.ge
  expect(root.querySelector("h1").textContent).toBe("About Us");
  //expect(true).toBe(true);
});