const path = require('path');

const express = require('express');
const nodeZip = require('node-zip');
const multer = require('multer')

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const inMemory = multer.memoryStorage();

app.post('/upload', multer({storage: inMemory}).single('file'), (req, res) => {
    const {file} = req;
    const buff = new Buffer(file.buffer);
    const base64 = buff.toString('base64')
    const data = new nodeZip(base64, {base64: true, checkCRC32: true});
    res.send(data)
})

app.listen(4000, () => {
    console.log('Server Listem 4000')
})