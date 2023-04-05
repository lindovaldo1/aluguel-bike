const Model = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const blacklist = []

module.exports = {
    async getAll(req, res){
        try {
            const data = await Model.findAll({
                // where: { state: true }
            })
    
            if(data.length == 0)
                return res.status(400).json("Nenhuma informação encontrada")

            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },
    async getAllFalse(req, res){
        try {
            const data = await Model.findAll()
    
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
            const data = await Model.findAll({
                where: { id: Number(id), state: true }
            })
            
            if(data.length == 0)
                return res.status(200).json("Nenhuma informação correspondente encontrada")

            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },    
    async create(req, res){
        try{
            const { name, email, password, birthdate, role } = req.body
            let password_crypt = password

            password_crypt = await bcrypt.hashSync(password, 10)

            
            const data = await Model.findOrCreate({
                where: { name, email },
                defaults:{ name, email, password:password_crypt, birthdate, state: true, role }
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
            const { name, email, password, birthdate, state, role } = req.body
            let password_crypt

            let data = await Model.findOne({
                where: { id: Number(id) }
            })
            
            if(data === null)
                return res.status(400).json("Informação não encontrada")

               
            if(data.password != password){
                password_crypt = await bcrypt.hashSync(password, 10)
                console.log('\n\n' + password_crypt)
                await Model.update({ name, email, password: password_crypt, birthdate, state, role }, { where: { id: Number(id) } })
                
                data = await Model.findOne({  where: { id: Number(id) } })
                return res.status(200).json( data )
            }

            await Model.update({ name, email, password, birthdate, state, role }, { where: { id: Number(id) } })

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
    async getLogin(req, res) {
        try {
            const { email, password } = req.body;
            
            const data = await Model.findOne({
                where: {
                    email: email,
                    state: true
                }
            });

            if (data === null) {
                return res.status(401).json("Usuário não encontrado!");
            }

            if (await bcrypt.compare(password, data.password)) {
                return res.json({ userId: data.id , role: data.role, auth: true })
                
            } else {
                return res.status(401).json("Senha incorreta!");
            }

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}