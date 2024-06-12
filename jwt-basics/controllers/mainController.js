const login = async (req,res,next) => {
    res.send('Fake Login/ Register/Signup Route')
}


const dashboard = async (req,res,next) => {
    const luckNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello, Marcel James`,secret:`Here is your authorized data, your lucky number is ${luckNumber}`})
}


export {
    login,
    dashboard,
}