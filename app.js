var express = require('express');
var https = require('https');
var app = express();

/*
const scrapeIt = require("scrape-it");

// Fetch the articles on the page (list)
scrapeIt("https://myanimelist.net/forum/?topicid=1602544", {
    listItem: ".forum_border_around",
    name: "articles",
    titles: ".forum_boardrow1 a",
    scores: ".forum_boardrow1 ~ .forum_boardrow1 a"
}, (err, page) => {
    console.log(err || page);
});
*/

var scraperjs = require('scraperjs');
scraperjs.StaticScraper.create('https://myanimelist.net/forum/?topicid=1602544')
    .scrape(function($) {
        return $(".forum_boardrow1 a").map(function() {
        	console.log($(this).attr("href"));
            return $(this).text();
        }).get();
    })
    .then(function(news) {
        console.log(news);
    })

//use the 'public' directory
app.use(express.static(__dirname + '/public'));

const port = 3000;

app.listen(port, function () {
 	console.log(`Express app listening on ${port}`);
});
