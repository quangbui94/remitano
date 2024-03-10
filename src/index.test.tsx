import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "contexts/SocketIOProvider";
import App from "App";

test("renders App component with BrowserRouter without crashing", () => {
  render(
    <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  );
});
