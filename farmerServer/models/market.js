module.exports = (sequelize, DataTypes) => {
  const Market = sequelize.define('market', {
    marketName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  return Market
}