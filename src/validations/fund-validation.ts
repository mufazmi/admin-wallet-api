import Joi from 'joi'
import Constants from '../utils/constants';

class MerchantFundValidation {

    update = Joi.object({        
        status : Joi.string().valid(Constants.STATUS.APPROVED,Constants.STATUS.REJECTED).required(),
        remark : Joi.string().min(1).max(300).optional().allow('')
    });

    // approved = Joi.object({        
    //     amount:Joi.number().min(1).optional()
    // });

}

export default new MerchantFundValidation