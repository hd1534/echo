/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('echo_post_not_tags', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'echo_posts',
        key: 'idx'
      }
    },
    tag_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'echo_tags',
        key: 'idx'
      }
    }
  }, {
    tableName: 'echo_post_not_tags'
  });
};
