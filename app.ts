import express from "express";
import { urlencoded } from "body-parser";
import { confirmHandler } from "./confirm";
import { input1Handler } from "./input1";
import { input2Handler } from "./input2";
import { thanksHandler } from "./thanks";

const app = express();
app.use(urlencoded({ extended: false }));

app.get("/", (req: express.Request, res: express.Response) =>
  res.redirect("/input")
);
app.get("/input", input1Handler);
app.post("/input", input1Handler);
app.post("/input/2", input2Handler);
app.post("/confirm", confirmHandler);
app.post("/thanks", thanksHandler);

app.listen(80);
