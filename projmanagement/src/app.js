import express from "express"
import cors from "cors"

const app = express()

// app.use middleware - BASIC CONFIGURATION

//to accept json data 
app.use(express.json({ limit: "16kb" }))

//to accept data from url + encoding like spaces into %20 and all
app.use(express.urlencoded({extended: true, limit : "16kb"}))

// to make public folder publicly viewable such that i can serve content from it directly
app.use(express.static("public"))

// CORS CONFIGURATION
app.use(cors({
    origin : process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods : ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
}))



app.get("/", (req,res) => {
    res.send("Welcome to base camp!")
})

app.get("/instagram", (req,res) => {
    res.send("Welcome to base camp's insta page!")
})

export default app;