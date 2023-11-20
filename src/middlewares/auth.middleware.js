const User = require("../models/user.model");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("esto es lo que el middleware recibe " + token);

        if (!token) {
            return res.status(403).json({
                message: "no se proporcionó un token",
            });
        }

        const decoded = await User.verifyToken(token);
        console.log(decoded);
        req.usuario_id = decoded.id;

        console.log(req.usuario_id + " esto es lo que se envia al controlador");

        const user = User.findById(req.usuario_id);

        if (!user || !decoded.id) {
            return res.status(404).json({
                message: "usuario no encontrado",
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: "No autorizado",
        });
    }
};
module.exports = {
    verifyToken,
};
