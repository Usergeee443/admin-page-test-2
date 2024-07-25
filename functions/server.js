const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const dataFile = path.join(__dirname, '../data/uploads.json');

app.post('/upload', (req, res) => {
  const { image, text } = req.body;
  const imagePath = path.join(__dirname, '../public/uploads', image.name);

  fs.writeFileSync(dataFile, JSON.stringify({ image: image.name, text }), 'utf-8');
  
  // Save the image file
  fs.writeFileSync(imagePath, image.data);

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});