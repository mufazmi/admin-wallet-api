import Joi from 'joi'

class MerchantFundValidation {

    update = Joi.object({        
        amount:Joi.number().min(1).optional()
    });

    // approved = Joi.object({        
    //     amount:Joi.number().min(1).optional()
    // });

}

export default new MerchantFundValidation