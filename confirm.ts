import express from "express";
import { escapeHtml, renderHidden } from "./lib";

export const confirmHandler = (req: express.Request, res: express.Response) => {
  // language=HTML
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>confirm</title>
</head>
<body>
  <form action="/thanks" method="post">
    <p>
      Given Name: ${escapeHtml(req.body.given_name)}
      <input type="submit" formaction="/input" value="Edit Given Name">
    </p>
    <p>
      Family Name: ${escapeHtml(req.body.family_name)}
      <input type="submit" formaction="/input/2" value="Edit Family Name">
    </p>
    ${renderHidden(req.body)}
    <input type="hidden" name="from" value="confirm"/>
    <input type="submit" value="Submit"/>
  </form>
</body>
</html>`);
};
