const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScrapeUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Welcome to the Amazon Scraper API');
});

// Get Product Details
app.get('/products/:productId',async(req,res)=>{
    const {productId} = req.params;
    const {apiKey} = req.query;

    try{
        const response = await request(`${generateScrapeUrl(apiKey)}&url=https://www.amazon.in/dp/${productId}`);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }
});

// Get Product Reviews
app.get('/products/:productId/reviews',async(req,res)=>{
    const {productId} = req.params;
    const {apiKey} = req.query;

    try{
        const response = await request(`${generateScrapeUrl(apiKey)}&url=https://www.amazon.in/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }
});

// Get Product Offers
app.get('/products/:productId/offers',async(req,res)=>{
    const {productId} = req.params;
    const {apiKey} = req.query;

    try{
        const response = await request(`${generateScrapeUrl(apiKey)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }
});

//Get Search Results
app.get('/search/:searchQuery',async(req,res)=>{
    const {searchQuery} = req.params;
    const {apiKey} = req.query;
    try{
        const response = await request(`${generateScrapeUrl(apiKey)}&url=https://www.amazon.in/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }
});

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));