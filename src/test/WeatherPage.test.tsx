import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "../app/App";

describe("WeatherPage", () => {
  it("renders the neutral initial state in Portuguese", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Clima Guarulhos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A previsão do tempo será carregada nas próximas fases."),
    ).toBeInTheDocument();
  });
});
