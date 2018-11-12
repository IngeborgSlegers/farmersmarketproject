module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('vendor', {
    vendorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  return Vendor
}