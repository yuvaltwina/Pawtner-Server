const mongoose = require("mongoose");

const connectDB = (url: string) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    dbName: "Pawtner",
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
