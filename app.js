const express = require("express");
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`La broche tourne sur : http://localhost:${PORT}`);
});
