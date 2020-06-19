/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_type: {
      type: DataTypes.ENUM('T','D','S','P','O'),
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('M','F',''),
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
