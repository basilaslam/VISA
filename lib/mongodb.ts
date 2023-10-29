import mongoose from 'mongoose'


const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {

    let DB_URI = process.env.MONGODB_URI
       if(!DB_URI){
        console.log('MongoDB_URI not find add the url to env and try again');
        return 
       }
       
    await mongoose.connect(DB_URI);
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;