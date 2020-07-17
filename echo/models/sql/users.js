const xss = require("xss");

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Users",
    {
      idx: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        set(value) {
          this.setDataValue("name", xss(value));
        },
      },
      id: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("T", "D", "S", "P", "O"),
        default: "O",
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("M", "F", "O"),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("NOW"),
      },
    },
    {
      tableName: "users",
    }
  );
};
