const User = require('./User');
const Comments = require('./Comments')

Comments.belongsTo(User, { 
    foreignKey: 'user_id' 
});

User.hasMany(Comments,{
    foreignKey: "comments_id"
});

module.exports = { 
    User,
    Comments,
};
