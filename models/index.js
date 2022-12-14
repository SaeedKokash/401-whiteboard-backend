'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');
const comment = require('./comment.model');
const user = require('./user.model');

const collection = require('../collections/user-comment-routes');

const POSTGRES_URL = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL
const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
} 

// for local testing 
// const POSTGRES_URL = 'postgresql://skokash:1094@localhost:5432/401-whiteboard';
// const sequelizeOption = { } 

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

// check if you  are authenticated and the connection is connected or not
sequelize.authenticate().then(() => {
    console.log('Database Connected to postgres')
}).catch((error) => {
    console.log(error)
});

const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize, DataTypes);
const userModel = user(sequelize, DataTypes);

// relations between post and comment
postModel.hasMany(commentModel, {foreignKey: 'postID', sourceKey: 'id'})
commentModel.belongsTo(postModel, {foreignKey: 'postID', targetKey: 'id'})

// relations between user and comment
userModel.hasMany(commentModel, {foreignKey: 'userID', sourceKey: 'id'})
commentModel.belongsTo(userModel, {foreignKey: 'userID', targetKey: 'id'})

// relations between user and post
userModel.hasMany(postModel, {foreignKey: 'userID', sourceKey: 'id'})
postModel.belongsTo(userModel, {foreignKey: 'userID', targetKey: 'id'})

// adding creator from userModel userName to commentModel creator
commentModel.addHook('beforeCreate', async (comment) => {
    const user = await userModel.findOne({where: {id: comment.userID}})
    comment.creator = user.userName
})

// adding creator from userModel userName to postModel creator
postModel.addHook('beforeCreate', async (post) => {
    const user = await userModel.findOne({where: {id: post.userID}})
    post.creator = user.userName
})

// collections
const postCollection = new collection(postModel);
const commentCollection = new collection(commentModel);

module.exports = {
    db: sequelize,
    Post: postCollection,
    Comment: commentCollection,
    commentModel: commentModel,
    userModel: userModel
}

// another way for exporting sequelize 
// const sequelize = new Sequelize(POSTGRES_URL);
// const db = {};
// db.sequelize = sequelize;
// db.userModel = require('./user.model') (sequelize, DataTypes);
// module.exports = db;