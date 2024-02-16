const User = require('./User');
const Comments = require('./Comments')
const Game = require('./Game')

// User.belongsTo(Game, { 
//     foreignKey: 'game_id' });
// Game.hasMany(User, { 
//     foreignKey: 'game_id' });

Comments.belongsTo(Game, { 
    foreignKey: 'game_id' });
Game.hasMany(Comments, { 
    foreignKey: 'game_id' });

User.hasMany(Comments, { 
    foreignKey: 'user_id' });
Comments.belongsTo(User, { 
    foreignKey: 'user_id' });

module.exports = { 
    User,
    Comments,
    Game
};
