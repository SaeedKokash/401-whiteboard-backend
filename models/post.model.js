'use strict';

const Post = (sequelize, DataTypes) => sequelize.define('Post', {
    postTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postContent: {
        type: DataTypes.STRING,
        defaultValue: 'Just laugh!'
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    creator: {
        type: DataTypes.STRING,
        defaultValue: 'anonymous'
    }

})

module.exports = Post;