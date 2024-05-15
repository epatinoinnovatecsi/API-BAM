const Activity = require("./Activity");
const User = require("./User");

Activity.belongsTo(User) // --> userId
User.hasMany(Activity)