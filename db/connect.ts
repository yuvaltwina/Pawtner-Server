const mongoose = require('mongoose');

const connectDB = (url: string) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    dbName: 'Pawtner',
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  });
};
export default connectDB;

// module.exports = connectDB;
