import express from "express";
import { escapeHtml, renderHidden } from "./lib";
import type { MyFormData, ValidationResult } from "./types";

export function validateInput2(data: MyFormData): ValidationResult {
  const result: ValidationResult = { result: true, errors: {} };
  if (!data.family_name) {
    result.result = false;
    result.errors.family_name = "Family name is mandatory.";
  }
  return result;
}

export function input2Handler(req: express.Request, res: express.Response) {
  let result: ValidationResult = { result: true, errors: {} };

  if (req.body.from === "input2") {
    result = validateInput2(req.body);
    if (result.result) {
      res.redirect(307, req.body.next);
      return;
    }
  }

  // language=HTML
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>input 2</title>
</head>
<body>
  <p>Given Name: ${escapeHtml(req.body.given_name)}</p>
  <form action="/input/2" method="post">
    <p>
      <label>
        Family Name (required):
        <input autofocus name="family_name" value="${escapeHtml(
          req.body.family_name || ""
        )}"/>
        ${
          result.errors.family_name
            ? `<strong>${result.errors.family_name}</strong>`
            : ""
        }
      </label>
    </p>
    ${renderHidden(req.body, ["family_name"])}
    <input type="hidden" name="from" value="input2"/>
    <input type="hidden" name="next" value="/confirm"/>
    <p><input type="submit" value="Confirm"/></p>
    <p><input type="submit" formaction="/input" value="Back"/></p>
  </form>
</body>
</html>`);
}
