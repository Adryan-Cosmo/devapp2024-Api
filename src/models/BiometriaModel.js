//Modelo Biometria

const db = require('../db');

module.exports = {
    getAll: ()=>{
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM biometrias', (error, results)=>{
                if(error) { reject(error); return; }
                resolve(results);
            });

        });
    },
    findById: (id)=>{
        return new Promise((resolve, reject)=>{

            db.query('SELECT * FROM biometrias WHERE id = ?', [id], (error, results)=>{
                if(error) { reject(error); return; }
                if(results.length > 0){
                    resolve(results[0]);
                }else{
                    resolve(false);
                }
            })

        });
    },
    add: (idunidade, dataamostra, qtdpeixesamostra, pesoamostra, tara, usuario, isactive)=>{
        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO biometrias (idunidade, dataamostra, qtdpeixesamostra, pesoamostra, tara, usuario, isactive) VALUES (?,?,?,?,?,?,?)',[idunidadealoj, data, qtdpeixes, pesomedio, lote, usuario, isactive],
            (error, results) =>{
                if(error) { reject(error); return; }
                resolve(results.insertId);
            })
        });
    },
    update: (id, idunidade, dataamostra, qtdpeixesamostra, pesoamostra, tara, usuario, isactive)=>{
        return new Promise((resolve, reject)=>{
            db.query('UPDATE biometrias SET id=?, idunidade=?, dataamostra=?, qtdpeixesamostra=?, pesoamostra=?, tara=?, usuario=?, isactive=?  WHERE id = ?',[id, idunidade, dataamostra, qtdpeixesamostra, pesoamostra, tara, usuario, isactive, id],
            (error, results) =>{
                if(error) { reject(error); return; }
                resolve(results);
            })
        });
    },
    delete: (id)=>{
        return new Promise((resolve, reject)=>{
            db.query('DELETE FROM biometrias WHERE id = ?', [id], (error, results)=>{
                if(error) { reject(error); return; }
                resolve(results);
            })
        });
    }
}