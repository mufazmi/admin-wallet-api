
class Constants{

   static ADMIN = {
      ROLE_DIRECTOR:'Director',
      ROLE_TECHNICAL:'Technical',
      ROLE_OPERATOR:'Operator'
   }
 
     static SERVER_MESSAGE = {
        NOT_FOUND : "Oops..! It's 404",
        FORBIDDEN : "Oops..! It's 403",
        BAD_REQUEST : "Bad Request",
        SERVER_ERROR : "Oops..! Something went wrong"
     }

     static STATUS_CODE = {
        SUCCESS : 200,
        NOT_FOUND : 404,
        FORBIDDEN:403,
        BAD_REQUEST:400,
        SERVER_ERROR:500
     }

     static OTP_TYPE = {
      MOBILE_VERIFICATION : 'mobile_verification',
      FORGOT_PASSWORD:'forgot_password'
     }

     static MESSAGE = {
      TEMPLATE_MESSAGE_CREATED : 'Template Created Successfully',
      TEMPLATE_MESSAGE_CREATION_FAILED : 'Failed To Create Template',
     }

}

export default Constants