const User = require('../models/user')

const authController = {}

authController.signUp = async (req, res) => {

    let { name, email, password } = req.body
    password = Buffer.from(password).toString('base64')

    let user = await User.findOne({email: email})
    if (user) {
        return res.status(500).json({
            code: 500,
            error: `User already exists`
        })
    } else {
        user = new User({name, email, password})
        await user.save()

        return res.json({
            code: 200,
            data: `User ${user.name} signed up` 
        })
    }

}

authController.signIn = async (req, res) => {
    let { email, password } = req.body
    password = Buffer.from(password).toString('base64')

    const user = await User.findOne({email: email, password: password})
    if (!user) {
        return res.status(500).json({
            code: 500,
            error: `Invalid email or password`
        })
    }

    const token = Buffer.from(user._id + new Date()).toString('base64')
 
    res.json({
        code: 200,
        data: {
            token, 
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
}


module.exports = authController