const express = require(`express`);
const cors = require(`cors`);
const dotenv = require(`dotenv`);
//
//routes
const signin_route = require('./general/signin');
dotenv.config();

//middle ware
const app = express();
app.use(cors());
app.use(express.json());


app.use('/signin',signin_route);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`)
} )
