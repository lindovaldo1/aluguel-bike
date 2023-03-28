const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(connection){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            date_birth: DataTypes.STRING,
            state: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        }, {
            sequelize: connection
        })
    }
}

module.exports = User