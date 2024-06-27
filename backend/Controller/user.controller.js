const UserService = require('../Services/user.services')
const UserServiceInstance = new UserService();

const loginUser = async (req, res) =>
{
    try
    {
        const { email, password } = req.body;
        const isValidEmail = await UserServiceInstance.findUserByEmail(email);
        if(!isValidEmail)
            return res.status(404).send('Account not found. Try signing up');

        const isValidUser = await UserServiceInstance.comparePasswords(password, isValidEmail.password);
        if(!isValidUser)
            return res.status(400).send('Incorrect email or password');

        const token = UserServiceInstance.generateToken(isValidEmail._id);
        // res.cookie('token', token, {
        //     httpOnly : true,
        //     secure : true,
        //     sameSite : 'strict',
        //     expires : new Date(Date.now() + 25892000000)
        // })
        res.json({success : true, token : token});
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
}

const signUpUser = async (req,res) =>
{
    try
    {
        const { name, email, password } = req.body;
        const isOldUser = await UserServiceInstance.findUserByEmail(email);
        if(isOldUser)
            return res.status(409).send('Already a user. Log in');

        await UserServiceInstance.createUser(name, email, password);
        res.status(201).send('Account created. Log in') 
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
}

const deleteUser = async () =>
{
    try
    {
        const userId = req.user._id;
        const result = await UserServiceInstance.deleteUser(id);
        res.status(200).json(result);
    }
    catch(error)
    {
        res.status(500);
    }
}

module.exports = { loginUser, signUpUser, deleteUser }