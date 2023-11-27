import express from "express";
import { createServer } from "http";


const app = express();
const port = 4000 || process.env.PORT;

createServer(app);

app.listen(port, () => {
  console.log(`Kisi API Server listening on ${port}`);
});

app.get("/health", (req, res) => {
	return res.status(200).send({ message: "kizi server is healthy" });
});
