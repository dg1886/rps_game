import { render, screen } from "@testing-library/react";

import Chat from "../../components/Chat";

test("Placeholder in chat", () => {
  render(<Chat />);
  const placehokderTextAreaChat = screen.getByPlaceholderText("Message");
  expect(placehokderTextAreaChat).toBeInTheDocument();
});
