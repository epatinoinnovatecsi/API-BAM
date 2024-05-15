const catchError = require('../utils/catchError');
const Activity = require('../models/Activity');
const User = require('../models/User');

const create = catchError(async(req, res) => {
    const {userEmail} = req.body
    console.log(userEmail);
    const user = await User.findOne({where: {email: userEmail}})
    if (!user) return res.status(404).json({ error: "User not register"})
    console.log(user.id);
    const result = await Activity.create({userId: user.id});
    return res.status(201).json(result);
});

const getById = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Activity.findAll({where: {userId: id}});
    if(!result) return res.status(404);
    return res.json(result);
});

module.exports = {
    getById,
    create,
}