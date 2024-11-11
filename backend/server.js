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

// app.use(cors({
//     origin: [
//         'https://task-manager-kappa-topaz.vercel.app',  // Current Vercel frontend URL
//         'https://task-manager-two-woad.vercel.app'  ,
//         'https://task-manager-2jrz025z4-abhisheks-projects-1c338bd8.vercel.app',
//             // Another Vercel URL if needed
//     ],
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'],  // Allowed methods
//     credentials: true  // If you need to handle cookies or authentication
// }));
// app.use(cors());

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));


app.options('*', cors());


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
