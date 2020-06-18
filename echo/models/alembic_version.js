/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('alembic_version', {
    version_num: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'alembic_version'
  });
};
