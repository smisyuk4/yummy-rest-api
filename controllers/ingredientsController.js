const {
    getAllIngredients,
  } = require('../services/ingredientsServices');
  
  // const { contactValidSchema } = require('../service/schemas/contactValidSchema');
  // const { ValidationError } = require('../helpers/error');
  
  const get = async (req, res) => {
    const condition = {}
  
    const results = await getAllIngredients(condition);
  
    res.json({
      status: 'Success',
      code: 200,
      data: {
        ingretients: results,
      },
    });
  };
  
  module.exports = {
    get,
  };
  