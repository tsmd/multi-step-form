import express from "express";
import { validateInput1 } from "./input1";
import { validateInput2 } from "./input2";
import { escapeHtml } from "./lib";

export const thanksHandler = (req: express.Request, res: express.Response) => {
  if (!validateInput1(req.body).result) {
    res.redirect(307, "/input");
    return;
  }
  if (!validateInput2(req.body).result) {
    res.redirect(307, "/input/2");
    return;
  }

  // language=HTML
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>thanks</title>
</head>
<body>
  <p>
    Thanks! Your name is:
    ${escapeHtml(req.body.given_name)} ${escapeHtml(req.body.family_name)}
  </p>
</body>
</html>`);
};
