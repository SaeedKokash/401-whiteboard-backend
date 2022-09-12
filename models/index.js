'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model')

// const POSTGRES_URL = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL

const POSTGRES_URL = process.env.DATABASE_URL || 'postgresql://skokash:1094@localhost:5432/401-whiteboard';

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
} 

// let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

let sequelize = new Sequelize(POSTGRES_URL);

module.exports = {
    db: sequelize,
    Post: post(sequelize, DataTypes),

}