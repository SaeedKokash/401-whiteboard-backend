"use strict";

class userCommentRoutes {
  constructor(model) {
    this.model = model;
  }

  async create(obj) {
    try {
      return await this.model.create(obj);
    } catch (error) {
      console.error("Error while creation");
    }
  }

  async read(id) {
    try {
      if (id) {
        return await this.model.findOne({ where: { id: id } });
      } else {
        return await this.model.findAll();
      }
    } catch (error) {
      console.error(`Error while reading from id: ${id}`);
    }
  }

  async update(id, obj) {
    try {
        const dataById = await this.model.findOne({where: {id: id}})
        return await dataById.update(obj);
    } catch (error) {
        console.error(`Error while updating data with id: ${id}`);
    }
  }

  async delete(id) {
    try {
        return await this.model.destroy({where: {id: id}})
    } catch (error) {
        console.error(`Error while deleting data with id: ${id}`);
    }
  }

  async readWithComments(Comment) {
    try {
        return await this.model.findAll({include: [Comment]})
    } catch (error) {
        console.error(`Error while reading comments for post: ${this.model.name}`);
    }
  }

  async readOneWithComments(id, Comment) {
    try {
        return await this.model.findOne({where: {id: id}, include: [Comment]})
    } catch (error) {
        console.error(`Error while reading comments for post with id: ${id}`);
    }
  }

}

module.exports = userCommentRoutes;
