const express = require('express');
const app = express();

const PORT = 9001;

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const server = app.listen(PORT, () => {
  console.log(`Node server running on: [Port: ${server.address().port}]`);
});
