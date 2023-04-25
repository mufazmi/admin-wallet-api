import Joi from "joi"
import Constants from "../utils/constants";

class MerchantValidation {

    update = Joi.object({
        
    });

    updateKycStatus = Joi.object({
        status : Joi.string().valid(Constants.TYPE.PENDING, Constants.TYPE.SUBMITTED, Constants.TYPE.ACTIVE, Constants.TYPE.REJECTED).required()
    });

}

export default new MerchantValidation