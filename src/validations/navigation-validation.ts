import Joi from 'joi'

class NavigationValidation {

    create = Joi.object({
        page_name:Joi.string().min(2).max(100).required(),
        url : Joi.string().min(2).max(10).required(),
        icon : Joi.string().min(2).max(10).required(),
        tree_view: Joi.number().default(0),
        parent: Joi.number().default(0),
        order_by: Joi.number().default(0),
        depth: Joi.number().default(0),
    });

    update = Joi.object({                
        page_name:Joi.string().min(2).max(100).optional(),
        url : Joi.string().min(2).max(10).optional(),
        icon : Joi.string().min(2).max(10).optional(),
        tree_view: Joi.number().default(0),
        parent: Joi.number().default(0),
        order_by: Joi.number().default(0),
        depth: Joi.number().default(0),
    });

}

export default new NavigationValidation