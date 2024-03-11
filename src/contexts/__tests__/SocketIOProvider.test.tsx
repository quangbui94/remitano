import React from "react";
import { render } from "@testing-library/react";
import { SocketProvider } from "contexts/SocketIOProvider";

describe("SocketIOProvider", () => {
  it("renders children without throwing an error", () => {
    const { getByText } = render(
      <SocketProvider>
        <div>Test Children</div>
      </SocketProvider>
    );

    expect(getByText("Test Children")).toBeInTheDocument();
  });
});
