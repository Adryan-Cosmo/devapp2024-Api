//Modelo Unidade

const db = require('../db');

module.exports = {
    getAll: ()=>{
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM unidades', (error, results)=>{
                if(error) { reject(error); return; }
                resolve(results);
            });

        });
    },
    findById: (id)=>{
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM unidades WHERE id = ?', [id], (error, results)=>{
                if(error) { reject(error); return; }
                if(results.length > 0){
                    resolve(results[0]);
                }else{
                    resolve(false);
                }
            })

        });
    },
    add: (nome, area, profundidade, volume, datacriacao, usuario, isactive)=>{
        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO unidades (nome, area, profundidade, volume, datacriacao, usuario, isactive) VALUES (?,?,?,?,?,?,?)',[nome, area, profundidade, volume, datacriacao, usuario, isactive],
            (error, results) =>{
                if(error) { reject(error); return; }
                resolve(results.insertId);
            })
        });
    },
    update: (id, nome, area, profundidade, volume, datacriacao, usuario, isactive)=>{
        return new Promise((resolve, reject)=>{
            db.query('UPDATE unidades SET nome = ?, area = ?, profundidade = ?, volume = ?, datacriacao = ?, usuario = ?, isactive = ?  WHERE id = ?',[nome, area, profundidade, volume, datacriacao, usuario, isactive, id],
            (error, results) =>{
                if(error) { reject(error); return; }
                resolve(results);
            })
        });
    },
    delete: (id)=>{
        return new Promise((resolve, reject)=>{
            db.query('DELETE FROM unidades WHERE id = ?', [id], (error, results)=>{
                if(error) { reject(error); return; }
                resolve(results);
            })
        });
    }
}