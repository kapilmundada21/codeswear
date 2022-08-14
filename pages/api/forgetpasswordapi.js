import connectDb from "../../middleware/mongoose"
import ForgetPass from "../../models/forgetpass"
import User from "../../models/user"
let jwt = require('jsonwebtoken');
let cryptoJs = require("crypto-js");

const handler = async (req, res) => {
    if (req.body.sendMail) {
        // Check if the user exists in the Database
        let user = await User.findOne({ "email": req.body.email })
        if (user) {
            let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
            let forgetpass = new ForgetPass({ email: req.body.email, token })
            await forgetpass.save()
            // Send an email to the user
            let email = `We have sent you this email in response to your request to reset your password on Codeswear.com To reset your password, please follow the link below: <a href="${process.env.NEXT_PUBLIC_HOST}/forgetpassword?token=${token}">click here to change password</a> <br/> <br/> We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.`
            res.status(200).json({ sucess: true })
            return
        }
        else {
            res.status(200).json({ sucess: false, error: 'User not found' })
            return
        }
    }
    else {
        let dbtoken = await ForgetPass.findOne({ token: req.body.token })
        if (dbtoken) {
            await User.findOneAndUpdate({ email: dbtoken.email }, { password: cryptoJs.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() })
            res.status(200).json({ sucess: true })
            return
        }
        res.status(200).json({ sucess: false, error:'Invalid Token' })
        return
    }
}
export default connectDb(handler);