//Controller Biometria

const BiometriModel = require("../models/BiometriaModel");

module.exports = {
    ping: (req,res) => {
        res.json({pong: true});
    },
    all: async (req, res)=>{
        let json = {error:'', result:[]};
        
        let biometrias = await BiometriModel.getAll();
        for(let i in biometrias){
            json.result.push({
                id: biometrias[i].id,
                idunidade: biometrias[i].idunidade,
                dataamostra: biometrias[i].dataamostra,
                qtdpeixesamostra: biometrias[i].qtdpeixesamostra,
                pesoamostra: biometrias[i].pesoamostra,
                tara: biometrias[i].tara,  
                usuario: biometrias[i].usuario,  
                isactive: biometrias[i].isactive
            })
        }
        res.json(json);
    },
    one: async (req, res)=>{
        let json = {error:'', result:{}};

        let id = req.params.id;
        let biometria = await BiometriModel.findById(id);
        if(biometria){
            json.result = biometria;
        }

        res.json(json);
    },
    new: async (req, res)=>{
        let json = {error:'', result:{}};

        let idunidade = req.body.idunidade;
        let dataamostra = req.body.dataamostra;
        let qtdpeixesamostra = req.body.qtdpeixesamostra;
        let pesoamostra = req.body.pesoamostra;
        let tara = req.body.tara;
        let usuario = req.body.usuario;
        let isactive = req.body.isactive;

        if(dataamostra && qtdpeixesamostra && pesoamostra && tara){
            let biometriaId = await BiometriModel.add(idunidade, dataamostra, qtdpeixesamostra, pesoamostra, tara, usuario, isactive);
            json.result = {
                id: biometriaId,
                idunidade, 
                dataamostra, 
                qtdpeixesamostra, 
                pesoamostra, 
                tara, 
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
        let idunidade = req.body.idunidade;
        let dataamostra = req.body.dataamostra;
        let qtdpeixesamostra = req.body.qtdpeixesamostra;
        let pesoamostra = req.body.pesoamostra;
        let tara = req.body.tara;
        let usuario = req.body.usuario;
        let isactive = req.body.isactive;

        if(id && dataamostra && qtdpeixesamostra && pesoamostra && tara){
            await BiometriModel.update(id, idunidade, dataamostra, qtdpeixesamostra, pesoamostra, tara, usuario, isactive);
            json.result = {
                id,
                idunidade, 
                dataamostra, 
                qtdpeixesamostra, 
                pesoamostra, 
                tara, 
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

        await BiometriModel.delete(req.params.id);

        res.json(json);   
    } 
}