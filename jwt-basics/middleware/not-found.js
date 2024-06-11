const notFound = async (req,res) => {
    res.status(404).json({ msg: "Route Not Found"});
}

export {
    notFound,
}