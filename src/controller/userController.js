const User = require('../model/User')

module.exports = {
    async getAll(req, res){
        try {
            const user = await User.findAll({
                where: { state: true }
            })
    
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },
    async getById(req, res){
        try { 
            const { id } = req.params
            const user = await User.findOne({
                where: { id: Number(id), state: true }
            })
            
            if(user === null)
                return res.status(200).json("Nenhum usuário correspondente encontrado")

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },    
    async create(req, res){
        try{
            const { name, email, password, date_birth } = req.body

            const user = await User.findOrCreate({
                where: { name, email },
                defaults:{ name, email, password, date_birth, state: true }
            })
            
            if(!user[1])
                return res.status(400).json("Usuário já possui cadastro")            
            
            return res.status(200).json(user)
        }catch(error){
            return res.status(500).json(error.message)
        }        
    },
    async update(req, res){
        try{
            const { id } = req.params
            const { name, email, password, date_birth, state } = req.body
            let user = await User.findOne({
                where: { id: Number(id) }
            })
            
            if(user === null)
                return res.status(400).json("Usuário não encontrado")

            await User.update({ name, email, password, date_birth, state }, { where: { id: Number(id) } })

            user = await User.findOne({  where: { id: Number(id) } })

            return res.status(200).json( user )
        }catch(error){
            return res.status(500).json(error.message)
        }        
    },
    async delete(req, res){
        try{
            const { id } = req.params
            let user = await User.findOne({
                where: { id: Number(id), state: true}
            })
            
            if(user === null)
                return res.status(400).json("Usuário não encontrado")

            await User.update({ state: false }, { where: { id: Number(id), state: true } })

            user = await User.findOne({  where: { id: Number(id) } })

            return res.status(200).json("Deletado com sucesso!")
        }catch(error){
            return res.status(500).json(error.message)
        }        
    },
}