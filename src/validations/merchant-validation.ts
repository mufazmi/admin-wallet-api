import Joi from "joi"
import Constants from "../utils/constants";

class MerchantValidation {

    update = Joi.object({
        
    });

    updateKycStatus = Joi.object({
        status : Joi.string().valid(Constants.TYPE.KYC_PENDING, Constants.TYPE.KYC_SUBMITTED, Constants.TYPE.ACTIVE, Constants.TYPE.SUSPENDED).required()
    });

}

export default new MerchantValidation