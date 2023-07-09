'use strict';
class DataCollection {

    constructor(model) {
        this.model = model;
    }

    get(id) {
        if (id) {
            return this.model.findOne({ where: { id } });
        }
        else {
            return this.model.findAll({});
        }
    }

    create(record) {
        return this.model.create(record);
    }

    update(id, data) {
        return this.model.findOne({ where: { id } })
            .then(record => record.update(data));
    }

    delete(id) {
        return this.model.destroy({ where: { id } });
    }

}


// const dataModules = require('../models');

// module.exports = (req, res, next) => {
//     const modelName = req.params.model;
//     if (dataModules[modelName]) {
//         req.model = dataModules[modelName];
//         next();
//     } else {
//         next('Invalid Model');
//     }
// }



module.exports = DataCollection;