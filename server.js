var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res) {
    url = 'https://www.epicgames.com/store/en-US/';

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var title, price, rating;
            var json = [];

            $('[class*="CardGrid-card_"]').each(function(i, e) {
                var data = $(this);
                title = data.find('[class*="Card-title_"]').text();
                price = data.find('[class*="Price-original_"]').text();

                json[i] = { 'title': title, 'price': price };
            })
            console.log('JSON', json);
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;