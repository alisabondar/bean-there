var { Sequelize, DataTypes } = require("sequelize");
var db = require("../db/database");

var LocationModel = require("../models/locationModel");

const User = db.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue:
        "https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg",
    },
    banner_photo: {
      type: DataTypes.STRING,
      defaultValue: "https://picsum.photos/800/400",
    },
    about: {
      type: DataTypes.TEXT,
      defaultValue:
        "Welcome to my coffee adventure! I''m on a never-ending quest to explore the world of coffee. From trying unique beans to experimenting with brewing methods, I''m here to share my passion for all things caffeine. Join me on this aromatic journey, and let''s raise our cups to the wonderful world of coffee!",
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    otp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    timestamps: false,
  }
);

const OtpModel = db.define('otp', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  timestamps: false,
});

const Wishlist = db.define(
  "wishlists",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visited: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const Friend = db.define(
  "friends",
  {
    friend_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Friend.belongsTo(User, { foreignKey: "friend_id", as: "users" });

module.exports = { User, Wishlist, Friend, OtpModel };
