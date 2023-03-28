const User = require('../model/User')

module.exports = {
    async getAll(req, res){
        try {
            const user = await User.findAll({
                where: {state: true}
            })
    
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },    
    async create(req, res){
        try{
            const { name, email, password, date_birth } = req.body

            const user = await User.findOrCreate({
                where: { email },
                defaults:{ name, email, password, date_birth, state: true }
            })
            
            if(!user[1])
                return res.status(400).json("Usuário já possui cadastro")            
            
            return res.status(200).json(user)
        }catch(error){
            return res.status(500).json(error.message)
        }
        
    },
}