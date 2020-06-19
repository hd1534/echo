/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('echo_tags', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    owner_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'idx'
      }
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    join_option: {
      type: DataTypes.ENUM('private','request','free_for_all'),
      allowNull: true
    }
  }, {
    tableName: 'echo_tags'
  });
};
