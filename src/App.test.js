/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders placeholder app", () => {
  render(<App />);

  const loadingElement = screen.getByText(/...loading/i);
  expect(loadingElement).toBeInTheDocument();
});
