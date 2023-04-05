const { Model, DataTypes } = require('sequelize')
const User = require('./user')
const Bike = require('./bike')

class Rent extends Model {
    static init(connection){
        super.init({
            user_id: DataTypes.INTEGER,
            bike_id: DataTypes.INTEGER,
            exit_time: DataTypes.DATE,
            return_time: DataTypes.DATE,
            state: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        }, {
            sequelize: connection,
        })     
        this.belongsTo(User)
        this.belongsTo(Bike)   
    }
}

module.exports = Rent