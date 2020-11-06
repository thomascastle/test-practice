import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { useState } from "react";

const UploadFile = () => {
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const handleFileUpload = ({ target: { files } }) =>
    setUploadedFileName(files[0].name);

  return (
    <div>
      <label htmlFor="upload-file">Upload File</label>
      <input
        id="upload-file"
        name="upload-file"
        onChange={handleFileUpload}
        type="file"
      />

      {uploadedFileName && (
        <div>You have uploaded a file named {uploadedFileName}</div>
      )}
    </div>
  );
};

it("displays the uploaded file name", () => {
  const file = new File(["(⌐□_□)"], "chucknorris.png", {
    type: "image/png",
  });

  render(<UploadFile />);

  const inputEl = screen.getByLabelText(/upload file/i);

  userEvent.upload(inputEl, file);

  expect(screen.getByText(/chucknorris\.png/i)).toBeInTheDocument();
});
