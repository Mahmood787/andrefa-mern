import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;
dotenv.config();
connectDB();
const app = express()
app.use(cors(
    {
        origin: ["https://andrefa-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use('/api/users', userRoutes);


// app.get("/", (req, res) => {
//     res.json("Hello");
// })

// app.post('/register', (req, res) => {
//     const {name, email, password} = req.body;
//     RegisterModel.findOne({email: email})
//     .then(user => {
//         if(user) {
//             res.json("Already have an account")
//         } else {
//             RegisterModel.create({name: name, email: email, password: password})
//             .then(result => res.json(result))
//             .catch(err => res.json(err))
//         }
//     }).catch(err => res.json(err))
// })


app.listen(port, () => console.log(`Server started on port ${port}`));
