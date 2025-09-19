const express = require("express");
const app = express();
const router = require("./router");

const PORT = 3000;

app.use(router);

app.listen(PORT, () => {
  console.log(`La broche tourne sur : http://localhost:${PORT}`);
});
