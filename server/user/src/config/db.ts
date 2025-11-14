import mongoose from "mongoose";

const connectDb = async () => {
  const url = process.env.MONGO_URI;
  if(!url) {
    throw new Error("MONGO_URI is not defined in enviroment variable")
  }

  try {
    await mongoose.connect(url, {
      dbName:"Chatapmicroserviceapp"
    })
    console.log("Connected t mongoDb")
  } catch (error) {
    console.log('Failed to connected to mongoDb', error)
    process.exit(1)
  }
};

export default connectDb;