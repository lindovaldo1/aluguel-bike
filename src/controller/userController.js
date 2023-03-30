const Model = require('../model/User')

module.exports = {
    async getAll(req, res){
        try {
            const data = await Model.findAll({
                where: { state: true }
            })
    
            if(data.length == 0)
                return res.status(400).json("Nenhuma informação encontrada")

            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },
    async getById(req, res){
        try { 
            const { id } = req.params
            const data = await Model.findOne({
                where: { id: Number(id), state: true }
            })
            
            if(data === null)
                return res.status(200).json("Nenhuma informação correspondente encontrada")

            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },    
    async create(req, res){
        try{
            const { name, email, password, date_birth } = req.body

            const data = await Model.findOrCreate({
                where: { name, email },
                defaults:{ name, email, password, date_birth, state: true }
            })
            
            if(!data[1])
                return res.status(400).json("Já possui informação correspondente cadastrada")
            
            return res.status(200).json(data)
        }catch(error){
            return res.status(500).json(error.message)
        }        
    },
    async update(req, res){
        try{
            const { id } = req.params
            const { name, email, password, date_birth, state } = req.body
            let data = await Model.findOne({
                where: { id: Number(id) }
            })
            
            if(data === null)
                return res.status(400).json("Informação não encontrada")

            await Model.update({ name, email, password, date_birth, state }, { where: { id: Number(id) } })

            data = await Model.findOne({  where: { id: Number(id) } })

            return res.status(200).json( data )
        }catch(error){
            return res.status(500).json(error.message)
        }        
    },
    async delete(req, res){
        try{
            const { id } = req.params
            let data = await Model.findOne({
                where: { id: Number(id), state: true}
            })
            
            if(data === null)
                return res.status(400).json("Informação não encontrada")

            await Model.update({ state: false }, { where: { id: Number(id), state: true } })

            data = await Model.findOne({  where: { id: Number(id) } })

            return res.status(200).json("Deletado com sucesso!")
        }catch(error){
            return res.status(500).json(error.message)
        }        
    },
}