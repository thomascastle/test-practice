import React from "react";
import { render, waitFor } from "@testing-library/react";
import { HelloMessage } from "./HelloMessage";

it("renders personalized greeting", async () => {
  const { getByText } = render(<HelloMessage name="Satoshi" />);

  await waitFor(() => getByText(/hello Satoshi/i));
});
