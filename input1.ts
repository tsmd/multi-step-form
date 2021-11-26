import express from "express";
import { escapeHtml, renderHidden } from "./lib";
import type { MyFormData, ValidationResult } from "./types";

export function validateInput1(data: MyFormData): ValidationResult {
  const result: ValidationResult = { result: true, errors: {} };
  if (!data.given_name) {
    result.result = false;
    result.errors.given_name = "Given name is mandatory.";
  }
  return result;
}

export function input1Handler(req: express.Request, res: express.Response) {
  let result: ValidationResult = { result: true, errors: {} };

  if (req.body.from === "input1") {
    result = validateInput1(req.body);
    if (result.result) {
      res.redirect(307, req.body.next);
      return;
    }
  }

  const next =
    req.body.from === "confirm" || req.body.next === "/confirm"
      ? "/confirm"
      : "/input/2";

  // language=HTML
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>input 1</title>
</head>
<body>
  <form action="/input" method="post">
    <p>
      <label>
        Given Name (required):
        <input autofocus name="given_name" value="${escapeHtml(
          req.body.given_name || ""
        )}"/>
        ${
          result.errors.given_name
            ? `<strong>${result.errors.given_name}</strong>`
            : ""
        }
      </label>
    </p>
    ${renderHidden(req.body, ["given_name"])}
    <input type="hidden" name="from" value="input1"/>
    <input type="hidden" name="next" value="${next}"/>
    <input type="submit" value="Next"/>
  </form>
</body>
</html>`);
}
