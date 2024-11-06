//Controller Unidade

const UnidadeModel = require("../models/UnidadeModel");

module.exports = {
    ping: (req,res) => {
        res.json({pong: true});
    },
    all: async (req, res)=>{
        let json = {error:'', result:[]};
        
        let unidades = await UnidadeModel.getAll();
        for(let i in unidades){
            json.result.push({
                id: unidades[i].id,
                nome: unidades[i].nome,
                area: unidades[i].area,
                profundidade: unidades[1].profundidade,
                volume: unidades[i].volume,
                datacriacao: unidades[i].datacriacao,
                usuario: unidades[i].usuario,
                isactive: unidades[i].isactive
            })
        }
        res.json(json);
    },
    one: async (req, res)=>{
        let json = {error:'', result:{}};

        let id = req.params.id;
        let unidade = await UnidadeModel.findById(id);
        if(unidade){
            json.result = unidade;
        }

        res.json(json);
    },
    new: async (req, res)=>{
        let json = {error:'', result:{}};

        let nome = req.body.nome;
        let area = req.body.area;
        let profundidade = req.body.profundidade;
        let volume = req.body.volume;
        let datacriacao = req.body.datacriacao;
        let usuario = req.body.usuario;
        let isactive = req.body.isactive;

        if(nome && area && volume){
            let unidadeId = await UnidadeModel.add(nome, area, profundidade, volume, datacriacao, usuario, isactive);
            json.result = {
                id: unidadeId,
                nome,
                area,
                profundidade,
                volume,
                datacriacao,
                usuario,
                isactive
            }
        }else{
            json.error = "Campos em branco!";
        }

        res.json(json);
    },
    edit: async (req, res)=>{
        let json = {error:'', result:{}};

        let id = req.params.id;
        let nome = req.body.nome;
        let area = req.body.area;
        let profundidade = req.body.profundidade;        
        let volume = req.body.volume;
        let datacriacao = req.body.datacriacao;
        let usuario = req.body.usuario;
        let isactive = req.body.isactive;

        if(id && nome && area && volume){
            await UnidadeModel.update(id, nome, area, profundidade, volume, datacriacao, usuario, isactive);
            json.result = {
                id,
                nome,
                area,
                volume,
                datacriacao,
                usuario,
                isactive
            }
        }else{
            json.error = "Campos não enviados!";
        }
    
        res.json(json);        
    },
    delete: async (req, res)=>{
        let json = {error:'', result:{}};

        await UnidadeModel.delete(req.params.id);

        res.json(json);   
    } 
}