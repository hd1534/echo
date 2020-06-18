/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('revoked_token', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    jti: {
      type: DataTypes.STRING(120),
      allowNull: true
    }
  }, {
    tableName: 'revoked_token'
  });
};
