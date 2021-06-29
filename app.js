const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const shortid = require('shortid');

urls = {}

app.use('/', express.static('static'));

app.use(express.json());

app.get('/u/:shortUrlId', (req, res, next)=>{
    const longUrl = urls[req.params.shortUrlId];
    if (longUrl){
        res.redirect(longUrl);
    }else{
        res.status(400).send("Invalid URL");
    }
});

app.post('/url', (req, res, next)=>{
    const shortUrlId = shortid.generate();
    urls[shortUrlId] = req.body.longUrl;
    res.send({
        shortUrl: `https://url-shortner-exp.herokuapp.com/u/${shortUrlId}`
    });
})

app.get('/urls', (req, res, next)=>{
    res.send(urls);
});

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
});