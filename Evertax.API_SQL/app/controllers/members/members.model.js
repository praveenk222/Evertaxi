const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        UserID	:{ type: DataTypes.NUMBER, allowNull: false },
        EmailID	:{ type: DataTypes.STRING, allowNull: false },
        MobileNo:{ type: DataTypes.STRING, allowNull: false },
        Password	:{ type: DataTypes.STRING, allowNull: false },
        FirstName	:{ type: DataTypes.STRING, allowNull: true },
        LastName	:{ type: DataTypes.STRING, allowNull: true },
        MemberType	:{ type: DataTypes.NUMBER, allowNull: false },
        OTP	:{ type: DataTypes.STRING, allowNull: false },
        IsOTPSent	:{ type: DataTypes.BOOLEAN, allowNull: false },
        OTPSentDate	:{ type: DataTypes.DATE, allowNull: true },
        IsResendOTP	:{ type: DataTypes.BOOLEAN, allowNull: true },
        IsOTPVerified	:{ type: DataTypes.BOOLEAN, allowNull: true },
        IsEmailVerified	:{ type: DataTypes.BOOLEAN, allowNull: true },
        IsActive	:{ type: DataTypes.BOOLEAN, allowNull: true },
        CreatedOn	:{ type: DataTypes.DATE, allowNull: true },
        ProfilePhoto	:{ type: DataTypes.STRING, allowNull: true },
        Token	:{ type: DataTypes.STRING, allowNull: true },
        ParentID	:{ type: DataTypes.NUMBER, allowNull: false },
        IsRegisteredByMobile	:{ type: DataTypes.BOOLEAN, allowNull: true },
      
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Member', attributes, options);
}