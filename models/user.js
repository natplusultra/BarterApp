module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
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
    website_link: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    linkedin_link: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    },
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
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Service, {
      onDelete: "cascade"
    });
  };

  return User;
};
