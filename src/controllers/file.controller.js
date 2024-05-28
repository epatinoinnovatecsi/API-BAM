
const File = require('../models/File')
const catchError = require("../utils/catchError")
const path = require("path")
const fs = require("fs")

const getAll = catchError(async (req, res) => {
    const result = await File.findAll()
    return res.json(result)
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
    getAll,
    create,
    remove
}