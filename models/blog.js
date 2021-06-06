'use strict';
module.exports = function (sequelize, DataTypes) {
  const blog = sequelize.define(
    'blog',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
    }
  );

  blog.associate = function (models) {
    blog.belongsTo(models.user);
  };
  return blog;
};
