const mongoose = require('mongoose');

const connectDB = (url: string) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    dbName: 'Pawtner',
    useUnifiedTopology: true,
  });
};
export default connectDB;
