//Modelo Alojamento

const db = require('../db');

module.exports = {
    getAll: ()=>{
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM alojamentos', (error, results)=>{
                if(error) { reject(error); return; }
                resolve(results);
            });

        });
    },
    findById: (id)=>{
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM alojamentos WHERE id = ?', [id], (error, results)=>{
                if(error) { reject(error); return; }
                if(results.length > 0){
                    resolve(results[0]);
                }else{
                    resolve(false);
                }
            })

        });
    },
    add: (idunidadealoj, data, qtdpeixes, pesomedio, lote, usuario, isactive)=>{
        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO alojamentos (idunidadealoj, data, qtdpeixes, pesomedio, lote, usuario, isactive) VALUES (?,?,?,?,?,?,?)',[idunidadealoj, data, qtdpeixes, pesomedio, lote, usuario, isactive],
            (error, results) =>{
                if(error) { reject(error); return; }
                resolve(results.insertId);
            })
        });
    },
    update: (id, idunidadealoj, data, qtdpeixes, pesomedio, lote, usuario, isactive)=>{
        return new Promise((resolve, reject)=>{
            db.query('UPDATE alojamentos SET idunidadealoj=?, data=?, qtdpeixes=?, pesomedio=?, lote=?, usuario=?, isactive=?  WHERE id = ?',[idunidadealoj, data, qtdpeixes, pesomedio, lote, usuario, isactive, id],
            (error, results) =>{
                if(error) { reject(error); return; }
                resolve(results);
            })
        });
    },
    delete: (id)=>{
        return new Promise((resolve, reject)=>{
            db.query('DELETE FROM alojamentos WHERE id = ?', [id], (error, results)=>{
                if(error) { reject(error); return; }
                resolve(results);
            })
        });
    }
}