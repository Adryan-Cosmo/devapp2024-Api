//Controller User

const UserModel = require("../models/UserModel");

module.exports = {
    ping: (req,res) => {
        res.json({pong: true});
    },
    one: async (req, res)=>{
        let json = {error:'', result:{}};

        let email = req.params.email;
        let senha = req.params.senha;
        let user = await UserModel.findByEmail(email, senha);
        if(user){
            json.result = user;
        }

        res.json(json);
    }
   
}