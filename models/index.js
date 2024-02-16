const User = require('./User');
const Comments = require('./Comments')
const Game = require('./Game')

Comments.belongsTo(User, { 
    foreignKey: 'user_id' 
});

User.hasMany(Comments,{
    foreignKey: "user_id"
});

Comments.belongsTo(Game, { 
    foreignKey: 'game_id' 
});





module.exports = { 
    User,
    Comments,
    Game
};
