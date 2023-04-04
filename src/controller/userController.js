const Model = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const blacklist = []

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
            const { name, email, password, birthdate } = req.body
            let password_crypt = password

            password_crypt = await bcrypt.hashSync(password, 10)

            const data = await Model.findOrCreate({
                where: { name, email },
                defaults:{ name, email, password_crypt, birthdate, state: true }
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
            const { name, email, password, birthdate, state } = req.body
            let password_crypt = password

            let data = await Model.findOne({
                where: { id: Number(id) }
            })
            
            if(data === null)
                return res.status(400).json("Informação não encontrada")

            if(data.password !== password){
                password_crypt = await bcrypt.hashSync(password, 10)
                await Model.update({ name, email, password_crypt, birthdate, state }, { where: { id: Number(id) } })
            }

            await Model.update({ name, email, password, birthdate, state }, { where: { id: Number(id) } })

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