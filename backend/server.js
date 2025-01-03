const express = require('express');
require('dotenv').config();
require('./config/configure');
const cors = require('cors');
const routes = require('./routes/index')
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/taskRoutes')

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});

// Apply to all requests


const app = express();
app.use(limiter);


app.use(cors({
    origin: [
        'https://task-manager-kappa-topaz.vercel.app',  // Vercel frontend URLs
        'https://task-manager-two-woad.vercel.app',
        'https://task-manager-2jrz025z4-abhisheks-projects-1c338bd8.vercel.app',
      'https://task-manager-git-main-abhisheks-projects-1c338bd8.vercel.app',
      'https://task-manager-mv93divea-abhisheks-projects-1c338bd8.vercel.app'
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));


app.options('*', cors()); // Allows preflight requests

const allowedOrigins = [
  'https://task-manager-mv93divea-abhisheks-projects-1c338bd8.vercel.app',
  'https://task-manager-kappa-topaz.vercel.app',
  'https://task-manager-two-woad.vercel.app',
  'https://task-manager-2jrz025z4-abhisheks-projects-1c338bd8.vercel.app',
  'https://task-manager-git-main-abhisheks-projects-1c338bd8.vercel.app'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Check if the origin is in the allowed list
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});




// app.use(cors({
//     origin: true,
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//     credentials: true
// }));




app.use(express.json());
app.use('/api',routes);
app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);







app.get('/',async(req,res)=>{
    res.send("Api is running");
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})
