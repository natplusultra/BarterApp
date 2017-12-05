module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    // website_link: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    //   len: [1]
    // },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    // linkedin_link: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    //   len: [1]
    // },
    firebase_uuid: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    },
  });

  User.associate = function(models) {
    User.hasMany(models.Service, {
      onDelete: "cascade"
    });
  };

  return User;
};
