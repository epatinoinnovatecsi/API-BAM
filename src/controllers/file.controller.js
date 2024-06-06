
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
    fs.readFile(p, (err, fileData) => {
        if(err){
            console.log("Error reading file");
            return res.sendStatus(404);
        }
        // res.removeHeader("CF-Ray");
        // res.removeHeader("CF-Cache-Status");
        // res.removeHeader("Access-Control-Allow-Origin");
        // res.removeHeader("Strict-Transport-Security");
        // res.removeHeader("content-security-policy");
        // res.removeHeader("Cross-Origin-Opener-Policy");
        // res.removeHeader("Origin-Agent-Cluster");
        // res.removeHeader("Referrer-Policy");
        // res.removeHeader("X-Content-Type-Options");
        // res.removeHeader("X-DNS-Prefetch-Control");
        // res.removeHeader("X-Download-Options");
        // res.removeHeader("X-Permitted-Cross-Domain-Policies");
        // res.removeHeader("X-XSS-Protection");
        // res.removeHeader("X-Frame-Options");
        // // res.removeHeader("ETag");
        // res.removeHeader("rndr-id");
        // res.removeHeader("x-render-origin-server");
        // res.removeHeader("Vary");
        // res.removeHeader("alt-svc");
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