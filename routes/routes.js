const {Router} = require('express');
const router = Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const {v4} = require('uuid');

let db;

async function createConnection(){
    const adapter = new FileAsync('products.json');
    db = await low(adapter); 
    db.defaults({products: []}).write();
}
const getConnection = () => db;


router.get('/products',(req,res)=>{
    const products = getConnection().get('products').value();
    res.status(200).json(products); 
});

router.get('/products/:id',(req,res)=>{
    const product = getConnection().get('products').find({id:req.params.id}).value();
    res.json(product);
});

router.post('/products/', (req,res)=>{
    const newProduct = {
        id: v4(),
        title: req.body.title,
        description: req.body.description,
        precio: req.body.precio,
        img: req.body.img
    };

    getConnection().get('products').push(newProduct).write();
    res.send(newProduct);
});

router.put('/products/:id',async (req,res)=>{
    const product = await getConnection().get('products').find({id: req.params.id})
    .assign(req.body)
    .write();
    res.json(product);
});

router.delete('/products/:id', (req,res)=>{
    const product = getConnection().get('products').remove({id:req.params.id}).write();
    res.json(product);
});

module.exports = {
    router,
    createConnection,
    getConnection
}