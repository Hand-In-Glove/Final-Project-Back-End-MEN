const express = require("express");
require("dotenv").config();
const { db } = require("./db");

const app = express();

const PORT = 8080;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const energisersRouter = require("./routes/energisers");
app.use("/energisers", energisersRouter);

app.get("/", async (req, res) => {
  res.send({ success: true, message: "SERVER BE SERVING" });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
