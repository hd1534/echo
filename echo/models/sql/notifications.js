/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Notifications",
    {
      idx: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_idx: {
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
      notification_type: {
        type: DataTypes.ENUM("post", "comment"),
        allowNull: false,
      },
      target_type: {
        type: DataTypes.ENUM("post", "comment"),
        allowNull: false,
      },
      target_idx: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
    },
    {
      tableName: "notifications",
    }
  );
};
