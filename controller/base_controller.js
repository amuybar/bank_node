

exports.gethealthCheck = async (req, res) => {
    res.status(200).json({ message: 'Server is up and running' });
    
}
exports.getAdminCheck=async (req, res) => {
    res.status(200).json({ message: 'You are an admin' });
}