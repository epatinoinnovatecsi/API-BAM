
const File = require('../models/File')
const catchError = require("../utils/catchError")
const path = require("path")
const fs = require("fs")
const upload = require('../utils/multer')

const p = path.join(path.dirname(require.main.filename), 'programs', 'BasicOTADrive.ino.bin');

const getAll = catchError(async (req, res) => {
    const result = await File.findAll()
    return res.json(result)
})

const getOne = catchError(async (req, res) => {
    const dataRange = req.headers.range;
    fs.readFile(p, (err, fileData) => {
        if(err){
            console.log("Error reading file");
            return res.sendStatus(404);
        }
        if (dataRange){
            const fromByte = parseInt(dataRange.substring(dataRange.indexOf("=")+1,dataRange.indexOf("-")));
            const toByte = parseInt(dataRange.substring(dataRange.indexOf("-")+1));
            const partialContent = Buffer.alloc((toByte -fromByte) + 1);
            fileData.copy(partialContent, 0, fromByte, toByte + 1);
            res.header('Content-Range', `bytes ${fromByte}-${toByte}/${fileData.length}`);
            return res.status(206).send(partialContent);
        }
        return res.send(fileData);
    })

})

const create = catchError(async (req, res) => {
    const { filename } = req.file
    // console.log(filename);
    const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`
    const newBody = { filename, url }
    console.log(newBody);
    const result = await File.create(newBody)
    return res.status(201).json(result)
})

const remove = catchError(async (req, res) => {
    const { id } = req.params
    
    const result = await File.findByPk(id)
    if (!result) return res.sendStatus(404)

    const imageFilePath = path.join(__dirname, "..", "public", 'uploads', `${result.filename}`);

    //bloqueante
    fs.unlinkSync(imageFilePath)

    await result.destroy()

    return res.sendStatus(204)

})

module.exports = {
    getOne,
    getAll,
    create,
    remove
}