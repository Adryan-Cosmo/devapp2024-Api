//Controller Alojamento

const AlojamentoModel = require("../models/AlojamentoModel");

module.exports = {
    ping: (req,res) => {
        res.json({pong: true});
    },
    all: async (req, res)=>{
        let json = {error:'', result:[]};
        
        let alojamentos = await AlojamentoModel.getAll();
        for(let i in alojamentos){
            json.result.push({
                id: alojamentos[i].id,
                idunidadealoj: alojamentos[i].idunidadealoj,
                data: alojamentos[i].data,
                qtdpeixes: alojamentos[i].qtdpeixes,
                pesomodelo: alojamentos[i].pesomodelo,
                lote: alojamentos[i].lote,
                usuario: alojamentos[i].usuario,
                isactive: alojamentos[i].isactive
            })
        }
        res.json(json);
    },
    one: async (req, res)=>{
        let json = {error:'', result:{}};

        let id = req.params.id;
        let alojamento = await AlojamentoModel.findById(id);
        if(alojamento){
            json.result = alojamento;
        }

        res.json(json);
    },
    new: async (req, res)=>{
        let json = {error:'', result:{}};

        let idunidadealoj = req.body.idunidadealoj;
        let data = req.body.data;
        let qtdpeixes= req.body.qtdpeixes;
        let pesomedio = req.body.pesomedio;
        let lote = req.body.lote;
        let usuario = req.body.usuario;
        let isactive = req.body.isactive;

        if(data && qtdpeixes && pesomedio && lote){
            let alojamentoId = await AlojamentoModel.add(idunidadealoj, data, qtdpeixes, pesomedio, lote, usuario, isactive);
            json.result = {
                id: alojamentoId,
                idunidadealoj, 
                data, 
                qtdpeixes, 
                pesomedio, 
                lote, 
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
        let idunidadealoj = req.body.idunidadealoj;
        let data = req.body.data;
        let qtdpeixes= req.body.qtdpeixes;
        let pesomedio = req.body.pesomedio;
        let lote = req.body.lote;
        let usuario = req.body.usuario;
        let isactive = req.body.isactive;

        if(id && data && qtdpeixes && pesomedio && lote){
            await AlojamentoModel.update(id, idunidadealoj, data, qtdpeixes, pesomedio, lote, usuario, isactive);
            json.result = {
                id, 
                idunidadealoj, 
                data, 
                qtdpeixes, 
                pesomedio, 
                lote, 
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

        await AlojamentoModel.delete(req.params.id);

        res.json(json);   
    } 
}