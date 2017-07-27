var express = require('express');
var https = require('https');
var request = require('request');
var cheerio = require('cheerio');
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

/*
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
*/


var url = 'https://myanimelist.net/forum/?topicid=1602544'
//var url = 'https://myanimelist.net/forum/?topicid=1365483'
//var url = 'https://myanimelist.net/forum/?topicid=1264633'
//var url = 'https://myanimelist.net/forum/?topicid=1240339'
//var url = 'https://myanimelist.net/forum/?topicid=1399634'
//var url = 'https://myanimelist.net/forum/?topicid=1632032'

var globalBoy;

request({url:url}, function(error, response, body){
    if (!error){
        var $ = cheerio.load(body);

        var ratings = $('.forum_boardrow1').text().split("\n");

        var seriesNumber = -1;
        var seriesArray = [];
        var weeksCounter = 0;
        var ratingsArray = [];
        var title = '';

        for (i = 0; i < ratings.length; i++) {
            if (ratings[i].match(/Modified by/) || ratings[i].match(/DATA ANALYSIS SECTION/)) {

               var jsonBoy = {
                    title: title,
                    ratings: ratingsArray
                }  

                seriesArray[seriesNumber] = jsonBoy
                break;    
            }

             if (ratings[i] === ' ' || !ratings[i] || ratings[i].match(/^\[COMP/) || ratings[i].match(/^Subsequent Entries/i) || ratings[i].match(/LEFTOVER/) 
                || ratings[i].match(/^Moved to/) || ratings[i].match(/FINAL WEEK SCORES/) || ratings[i].match(/last vote of each/) || ratings[i].match(/Monitoring Discontinued/) 
                || ratings[i].match(/^Week \d* -$/)) {
                continue;
            }

            if (!ratings[i].match(/^Week \d* - ((?:10|[0-9])\.[0-9][0-9])/)) {
                weeksCounter = 0;

                var jsonBoy = {
                    title: title,
                    ratings: ratingsArray
                }           

                ratingsArray = [];
                if (title !== '') {
                    seriesArray[seriesNumber] = jsonBoy
                }

                title = ratings[i]

                if (title.match(/MSP Score/)){
                    var pattern = "MSP Score";
                    title = title.slice(0, title.indexOf(pattern)).trim();
                }
                if (title.match(/MSP SCORE/)){
                    var pattern = "MSP SCORE";
                    title = title.slice(0, title.indexOf(pattern)).trim();
                }
                if (title.match(/^\[b\]/)){
                    var pattern = "[b]";
                    title = title.slice(title.indexOf(pattern) + pattern.length).trim();
                }
                seriesNumber++;



         //       console.log(ratings[i])
            } else {
                var match = ratings[i].match(/^Week \d* - ((?:10|[0-9])\.[0-9][0-9])/)
                ratingsArray[weeksCounter] = match[1];
                weeksCounter++;
                continue;
            }
        }

   //     ejs.render(str, data, options);
        console.log(seriesArray);

        globalBoy = seriesArray

        //console.log($('.forum_boardrow1').text().split("\n"))
    } else {
        console.log("We’ve encountered an error: " + error);
    }
})


//use the 'public' directory
app.use(express.static(__dirname + '/public'));

app.get('/api/series/:series_id', function(req, res) {
    res.json({ name: globalBoy[req.params.series_id].title , data: globalBoy[req.params.series_id].ratings });   
});

const port = 3000;

app.listen(port, function () {
 	console.log(`Express app listening on ${port}`);
});
