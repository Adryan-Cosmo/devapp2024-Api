
const db = require("../db");

module.exports = {
    findUser: (email, senha) => {
        return new Promise((resolve, reject)=>{
            db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (error, results)=>{
                if(error){reject(error); return;}
                if(results.length > 0){
                    resolve(results[0]);
                }else{
                    resolve(false);
                }
            })
        });
    },
    getAll: ()=>{
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM usuarios', (error, results)=>{
                if(error) { reject(error); return; }
                resolve(results);
            });

        });        
    },
    findById: (id)=>{
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results)=>{
                if(error) { reject(error); return; }
                if(results.length > 0){
                    resolve(results[0]);
                }else{
                    resolve(false);
                }
            })

        });
    },
    add: (nome, cpf, email, senha, role, isactive)=>{
        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO usuarios (cpf, nome, email, senha, isActive, role) VALUES (?,?,?,?,?,?)',[cpf, nome, email, senha, isactive, role],
            (error, results) =>{
                if(error) { reject(error); return; }
                resolve(results.insertId);
            })
        });
    },
}