const jwt = require("jsonwebtoken")

module.exports = checkAuth = (req, res, next)=>{
    try {
        const token = (req.headers.authorization || "").split(" ")[1] 


        if(!token) {
            return res.status(400).json({
                message: "нет доступа"
            })
        }

        //проверка срока жизни токена
        const decoded = jwt.verify(token, 'secretKey');
        console.log("decoded >> ",decoded) //{ login: 'VasyOk', iat: 1722355123, exp: 1722391123 }
        req.login = decoded.login
        next()
      } catch(err) {
        console.log(err.message)
        return res.status(400).json({
            message: "Войдите в учётную запись"
        })
      }
}