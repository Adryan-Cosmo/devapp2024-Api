//Modelo User

const db = require('../db');

module.exports = {
    findByEmail: (email, senha)=>{
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (error, results)=>{
                if(error) { reject(error); return; }
                if(results.length > 0){
                    resolve(results[0]);
                }else{
                    resolve(false);
                }
            })

        });
    }
}