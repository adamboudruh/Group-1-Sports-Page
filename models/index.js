const User = require('./User'); // Import the User model
const Comments = require('./Comments'); // Import the Comments model
const Game = require('./Game'); // Import the Game model

// Define associations between models
// User and Game association
User.belongsTo(Game, { 
    foreignKey: 'game_id' }); // Each user belongs to one game
Game.hasMany(User, { 
    foreignKey: 'game_id' }); // Each game can have multiple users

// Comments and Game association
Comments.belongsTo(Game, { 
    foreignKey: 'game_id' }); // Each comment belongs to one game
Game.hasMany(Comments, { 
    foreignKey: 'game_id' }); // Each game can have multiple comments

// User and Comments association
User.hasMany(Comments, { 
    foreignKey: 'user_id' }); // Each user can have multiple comments
Comments.belongsTo(User, { 
    foreignKey: 'user_id' }); // Each comment belongs to one user

// Export the models for usage in other files
module.exports = { 
    User,
    Comments,
    Game
};
