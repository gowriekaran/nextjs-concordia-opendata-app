import express, { json } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Headers } from "node-fetch";
import fetch from "node-fetch";

dotenv.config();

const meta = {
  "Content-Type": "text/xml",
};
const headers = new Headers(meta);

let url = "https://opendata.concordia.ca/API/v1/library/";
let username = process.env.CONCORDIA_API_USER;
let password = process.env.CONCORDIA_API_PASSWORD;

headers.set(
  "Authorization",
  "Basic " + Buffer.from(username + ":" + password).toString("base64")
);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hi",
  });
});

app.get("/request", async (req, res) => {
  fetch(url + req.query.url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((json) => res.status(200).send(json));
});

app.listen(5000, () => console.log("Server started on http://localhost:5000"));
