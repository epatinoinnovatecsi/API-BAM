const catchError = require('../utils/catchError');
const User = require('../models/User');
const { DataTypes } = require('sequelize');

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    console.log(user)
    if(!user) return res.sendStatus(404);
    const now = new Date()
    const currentDate = now.toISOString();
    return res.json({user, currentDate});
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    delete req.body.password;
    delete req.body.email;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const {password, email} = req.body;
    const user = await User.findOne({ where: { email }});
    if(!user) return res.status(401).json({ error: "Invalid credentials"})
    if (password != user.password) return res.status(401).json({ error: "Invalid credentials"})
    const reqTime = new Date(Date.now());
    return res.json({user, reqTime});
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}