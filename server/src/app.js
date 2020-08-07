const express = require("express");
const cors = require("cors");
const subscriptionRoute = require("./subscriptionRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", subscriptionRoute);

const port = 4000; // TODO: use an env variable
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
