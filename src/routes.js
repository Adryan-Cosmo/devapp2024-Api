//Rotas da API
const express = require('express');
const router = express.Router();

const UnidadeController = require('./controllers/UnidadeController');
const AlojamentoController = require('./controllers/AlojamentoController');
const BiometriaController = require('./controllers/BiometriaController');
const UsuarioController = require('./controllers/UsuarioController');
const Logger = require('./controllers/LogController');
const EnderecoController = require('./controllers/EnderecoController');

router.get('/ping', UnidadeController.ping);

router.get('/usuarios', UsuarioController.all);
router.post('/usuario', UsuarioController.logar);
router.post('/novousuario', UsuarioController.new);
router.get('/usuario/:id', UsuarioController.one);
router.put('/atualizausuario/:id', UsuarioController.update);

router.get('/unidades', UnidadeController.all);
router.get('/unidade/:id', UnidadeController.one);
router.post('/unidade', UnidadeController.new);
router.put('/unidade/:id', UnidadeController.edit);
router.delete('/unidade/:id', UnidadeController.delete);

router.get('/alojamentos', AlojamentoController.all);
router.get('/alojamento/:id', AlojamentoController.one);
router.post('/alojamento', AlojamentoController.new);
router.put('/alojamento/:id', AlojamentoController.edit);
router.delete('/alojamento/:id', AlojamentoController.delete);

router.get('/biometrias', BiometriaController.all);
router.get('/biometria/:id', BiometriaController.one);
router.post('/biometria', BiometriaController.new);
router.put('/biometria/:id', BiometriaController.edit);
router.delete('/biometria/:id', BiometriaController.delete);

router.post('/logs', Logger.add);

router.post('/updateendereco', EnderecoController.updateOrCreateEndereco);
router.get('/enderecos/:usuarioId', EnderecoController.findEndereco);

module.exports = router;
