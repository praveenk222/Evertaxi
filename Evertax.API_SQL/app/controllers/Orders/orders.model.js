class  Member{
    constructor(UserID,
        EmailID,  MobileNo, Password,
        FirstName, LastName,  MemberType,  OTP,
        IsOTPSent, OTPSentDate, IsResendOTP,  IsOTPVerified,IsEmailVerified, IsActive, CreatedOn, 
        ProfilePhoto,
        Token,  ParentID,  IsRegisteredByMobile){
      this.UserID = UserID;
      this.MobileNo = MobileNo;
      this.Password = Password;
      this.FirstName = FirstName;
      this.LastName = LastName;
      this.MemberType = MemberType;
      this.OTP = OTP;
      this.IsOTPSent = IsOTPSent;
      this.OTPSentDate = OTPSentDate;
      this.IsResendOTP = IsResendOTP;
      this.IsOTPVerified = IsOTPVerified;
      this.IsEmailVerified = IsEmailVerified;
      this.IsActive = IsActive;
      this.CreatedOn = CreatedOn;
      this.ProfilePhoto = ProfilePhoto;
      this.Token = Token;
      this.ParentID = ParentID;
      this.IsRegisteredByMobile = IsRegisteredByMobile;
    }
  }
  
  module.exports = Member;