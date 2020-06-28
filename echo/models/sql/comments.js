/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Comments",
    {
      idx: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      post_idx: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "posts",
          key: "idx",
        },
      },
      target_type: {
        type: DataTypes.ENUM("post", "comment"),
        allowNull: false,
      },
      target_idx: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("normal", "edited", "censored"),
        allowNull: true,
      },
      writer_idx: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "user",
          key: "idx",
        },
      },
      wrote_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      has_a_reply: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      reply_check: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
    },
    {
      tableName: "comments",
    }
  );
};
