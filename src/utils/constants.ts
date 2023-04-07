
class Constants {

   static ADMIN = {
      ROLE_DIRECTOR: 'Director',
      ROLE_TECHNICAL: 'Technical',
      ROLE_OPERATOR: 'Operator'
   }

   static SERVER_MESSAGE = {
      NOT_FOUND: "Oops..! It's 404",
      FORBIDDEN: "Oops..! It's 403",
      BAD_REQUEST: "Bad Request",
      SERVER_ERROR: "Oops..! Something went wrong"
   }

   static STATUS_CODE = {
      SUCCESS: 200,
      NOT_FOUND: 404,
      FORBIDDEN: 403,
      BAD_REQUEST: 400,
      SERVER_ERROR: 500
   }

   static OTP_TYPE = {
      MOBILE_VERIFICATION: 'mobile_verification',
      FORGOT_PASSWORD: 'forgot_password'
   }

   static TYPE = {
      KYC_PENDING: 'kyc_pending',
      KYC_SUBMITTED: 'kyc_submitted',
      ACTIVE: 'active',
      SUSPENDED: 'suspended',
   }

   static LOCK = {
      NOTHING: 'no_lock',
      PASSCODE: 'password_lock',
      DEVICE: 'device_lock'
   }

}

export default Constants