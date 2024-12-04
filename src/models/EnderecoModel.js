const db = require('../db');

module.exports = {
    findEnderecoByUsuarioId: (usuarioId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM enderecos WHERE usuarioId = ?', [usuarioId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]); // Retorna o primeiro registro
            });
        });
    },
    updateOrCreateEndereco: (usuarioId, endereco, cidade, estado, cep) => {
        console.log(usuarioId);
        return new Promise((resolve, reject) => {
            // Verifica se o endereço existe
            console.log('1');
            db.query('SELECT * FROM enderecos WHERE usuarioId = ?', [usuarioId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (results.length > 0) {
                    // Atualiza o endereço existente
                    console.log('2');
                    db.query(
                        'UPDATE enderecos SET endereco = ?, cidade = ?, estado = ?, cep = ? WHERE usuarioId = ?',
                        [endereco, cidade, estado, cep, usuarioId],
                        (error, results) => {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(true);
                        }
                    );
                } else {
                    // Cria um novo endereço
                    console.log('3');
                    db.query(
                        'INSERT INTO enderecos (usuarioId, endereco, cidade, estado, cep) VALUES (?, ?, ?, ?, ?)',
                        [usuarioId, endereco, cidade, estado, cep],
                        (error, results) => {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(true);
                        }
                    );
                }
            });
        });
    },
    addHistoricoEndereco: async (usuarioId, campo, valorAntigo, valorNovo, dataAlteracao) => {
        if (valorAntigo === valorNovo) return Promise.resolve(false);

        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO historico_alteracoes_endereco (usuarioId, campo, enderecoAntigo, enderecoNovo, dataAlteracao) VALUES (?,?,?,?,?)',
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

    // Método para logar alterações no histórico
    logAlteracoesEndereco: async function (usuarioId, enderecoAtual, enderecoNovo) {
        const camposEndereco = [
            { campo: 'endereco', valorAntigo: enderecoAtual.endereco, valorNovo: enderecoNovo.endereco },
            { campo: 'cidade', valorAntigo: enderecoAtual.cidade, valorNovo: enderecoNovo.cidade },
            { campo: 'estado', valorAntigo: enderecoAtual.estado, valorNovo: enderecoNovo.estado },
            { campo: 'cep', valorAntigo: enderecoAtual.cep, valorNovo: enderecoNovo.cep },
        ];

        const dataAlteracao = new Date();

        const promises = camposEndereco.map(({ campo, valorAntigo, valorNovo }) => {
            return this.addHistoricoEndereco(usuarioId, campo, valorAntigo, valorNovo, dataAlteracao);
        });

        try {
            await Promise.all(promises);
            return true;
        } catch (error) {
            console.error('Erro ao registrar histórico de alterações de endereço:', error);
            return false;
        }
    },
};
