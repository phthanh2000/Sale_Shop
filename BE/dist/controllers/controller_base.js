"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller_Base = void 0;
class Controller_Base {
}
exports.Controller_Base = Controller_Base;
// Requires token authentication
Controller_Base.authenticateToken = (req, res, next) => {
    // Test: Tokens will not be considered for authentication
    next();
    // Deverlopment: The token will be considered for authentication
    // try {
    //   // Get the token string after removing 'Bearer'
    //   const token = req.headers['authorization']?.split(' ')[1];
    //   // Token string type
    //   const secretKey = 'your_secret_key';
    //   // In case the token string is empty
    //   if (token == null) {
    //     return res.status(400).send('Token does not exist!');
    //   }
    //   // Perform token authentication
    //   jwt.verify(token, secretKey);
    //   // Successful authentication will continue to execute the next function
    //   next();
    // } catch (error) {
    //   return res.status(400).send(`API authenticateToken ${error}`);
    // };
};
