const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(connection){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            birthdate: DataTypes.STRING,
            state: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        }, {
            sequelize: connection,
            modelName: "users",
        })
    }
}

module.exports = User