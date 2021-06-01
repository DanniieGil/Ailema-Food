const { v4: uuidv4 } = require("uuid");
const { Diet } = require("../models/db");

class ModelCRUD {
    constructor(model){
        this.model = model
    }

    getAll = (req, res, next) =>  {
        return this.model.findAll()
          .then((results) => res.send(results))
          .catch((error) => next(error));
      };

    getById=  (req, res, next) => {
        const id = req.params.id;
        return this.model.findByPk(id)
          .then((result) => res.send(result))
          .catch((error) => next(error));
      };

    add = (req, res, next) => {
        const body = req.body;
        return this.model.create({
          ...body,
          id: uuidv4(),
        })
          .then((addElement) => res.send(addElement))
          .catch((error) => next(error));
      };

    update = (req, res, next)=>  {
        const id = req.params.id;
        const body = req.body;
        return this.model.update(body, {
          where: {
            id,
          },
        }).then((updateElement) => res.send(updateElement))
          .catch((error) => next(error));
      };

    delete = (req, res, next) =>  {
        const id = req.params.id;
        const body = req.body;
        return this.model.destroy({
          where: {
            id,
          },
        }).then((deleteElement) => res.sendStatus(200))
          .catch((error) => next(error));
      };
}

module.exports = ModelCRUD;
