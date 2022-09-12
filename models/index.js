'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model')

const POSTGRES_URL = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

module.exports = {
    db: sequelize,
    Post: post(sequelize, DataTypes)

}