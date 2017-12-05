module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define("Service", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    },
  });

  Service.associate = function(models) {
    Service.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Service;
};
