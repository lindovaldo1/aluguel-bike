const { Model, DataTypes } = require('sequelize')

class Bike extends Model {
    static init(connection){
        super.init({
            model: DataTypes.STRING,
            color: DataTypes.STRING,
            fabrication_year: DataTypes.DATE,
            wheels: DataTypes.INTEGER,
            state: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        }, {
            sequelize: connection
        })
    }
}

module.exports = Bike