'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');
const comment = require('./comment.model');
const collection = require('../collections/user-comment-routes')

// const POSTGRES_URL = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL

const POSTGRES_URL = process.env.DATABASE_URL || 'postgresql://skokash:1094@localhost:5432/401-whiteboard';

// const sequelizeOption = {
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// } 

// for local testing 
const sequelizeOption = { } 

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);
const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize, DataTypes);

// relations
postModel.hasMany(commentModel, {foreignKey: 'postID', sourceKey: 'id'})
commentModel.belongsTo(postModel, {foreignKey: 'postID', targetKey: 'id'})

// collections
const postCollection = new collection(postModel);
const commentCollection = new collection(commentModel);

module.exports = {
    db: sequelize,
    Post: postCollection,
    Comment: commentCollection,
    commentModel: commentModel
}