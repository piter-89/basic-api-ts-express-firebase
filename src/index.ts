import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as products from './products';
import * as cors from 'cors';
import * as firebase from './firebase'

const app = express();
const PORT = process.env.PORT || 3011; // for heroku deploy

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("PUBLIC API");
  next();
});

app.listen(PORT);

app.get('/products', async (req, res, next) => {
  try {
    await firebase.verifyIdToken(req.query.idToken);
    res.send(products.productsList);
    next();
  } catch (err) {
    res.statusCode = 401;
    res.send(err);
    next();
  }
});

app.get('/products/:productId', async (req, res, next) => {
  const productId: number = parseInt(req.params.productId);

  try {
    await firebase.verifyIdToken(req.query.idToken);
    res.send(products.productsList.find((product) => product.id === productId));
    next();
  } catch (err) {
    res.statusCode = 401;
    res.send(err);
    next();
  }
  

  next();
});

app.post('/products', async (req, res, next) => {
  try {
    await firebase.verifyIdToken(req.query.idToken);
    let newProduct: products.Product = req.body;

    products.productsList.push( products.createNewProductFromData(newProduct) );

    res.send(products.productsList);
    
    next();
  } catch (err) {
    res.statusCode = 401;
    res.send(err);
    next();
  }

})

console.log("server works on port " + PORT);