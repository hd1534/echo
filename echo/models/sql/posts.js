/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Posts",
    {
      idx: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      writer_idx: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "users",
          key: "idx",
        },
      },
      posted_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("NOW"),
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "posts",
    }
  );
};
