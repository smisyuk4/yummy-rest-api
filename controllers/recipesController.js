const {
    getAllRecipes,
  } = require('../services/recipesServices');
  
  // const { contactValidSchema } = require('../service/schemas/contactValidSchema');
  // const { ValidationError } = require('../helpers/error');
  
  const get = async (req, res) => {
    const condition = {}
  
    const results = await getAllRecipes(condition);
  
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
  