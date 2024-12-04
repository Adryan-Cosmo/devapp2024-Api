const db = require('../db');

module.exports = {
    findUser: (email, senha) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });
        });
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM usuarios', (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    },
    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });
        });
    },
    add: (nome, cpf, email, senha, role, isactive, dataCadastro) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO usuarios (cpf, nome, email, senha, isActive, role, dataCadastro) VALUES (?,?,?,?,?,?,?)',
                [cpf, nome, email, senha, isactive, role, dataCadastro],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.insertId);
                }
            );
        });
    },
    updateById: (id, nome, cpf, email, isactive) => {
        console.log('Chegou aqui 2');
        console.log('Parâmetros recebidos para updateById:', { id, nome, cpf, email, isactive });
        return new Promise((resolve, reject) => {
            db.query('UPDATE usuarios SET nome = ?, cpf = ?, email = ?, isActive = ? WHERE id = ?', [nome, cpf, email, isactive, id], (error, results) => {
                if (error) {
                    console.error('Erro ao executar query:', error);
                    reject(error);
                    return;
                }
                resolve(results.affectedRows > 0);
            });
        });
    },
    addHistorico: (usuarioId, campo, valorAntigo, valorNovo, dataAlteracao) => {
        if (valorAntigo === valorNovo) return Promise.resolve(false);
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO historico_alteracoes (usuarioId, campo, valorAntigo, valorNovo, dataAlteracao) VALUES (?,?,?,?,?)',
                [usuarioId, campo, valorAntigo, valorNovo, dataAlteracao],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.insertId);
                }
            );
        });
    },
};
