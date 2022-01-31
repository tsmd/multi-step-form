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
      <button type="submit" formaction="/input" name="mode" value="edit">Edit Given Name</button>
    </p>
    <p>
      Family Name: ${escapeHtml(req.body.family_name)}
      <button type="submit" formaction="/input/2" name="mode" value="edit">Edit Family Name</button>
    </p>
    ${renderHidden(req.body)}
    <input type="hidden" name="from" value="confirm"/>
    <p><button type="submit" name="mode" value="flow">Submit</button></p>
    <p><button type="submit" formaction="/input/2" name="mode" value="flow">Back</button></p>
  </form>
</body>
</html>`);
};
