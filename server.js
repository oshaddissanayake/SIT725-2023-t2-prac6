let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://akbosithira7:tkWNln8HVpnZPRfa@cluster0.li1zpwo.mongodb.net/?retryWrites=true&w=majority";
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Fairway');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    res.render('index.html');
});

app.get('/api/fairway', (req,res) => {
    getAllFairway((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all  successful'});
        }
    });
});

app.post('/api/fairway', (req,res)=>{
    let fairway = req.body;
    postFairway(Fairway, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

function postFairway(fairway,callback) {
    collection.insertOne(fairway,callback);
}

function getAllFairway(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
    console.log('express server started');
    runDBConnection();
});