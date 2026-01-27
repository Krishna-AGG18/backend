import express from "express"

const app = express()

app.get("/", (req,res) => {
    res.send("Welcome to base camp!")
})

app.get("/instagram", (req,res) => {
    res.send("Welcome to base camp's insta page!")
})

export default app;