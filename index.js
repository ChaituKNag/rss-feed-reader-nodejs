let fetch = require('isomorphic-fetch');
let parseString = require('xml2js').parseString;

(async function() {
    const urls = process.argv.slice(2);

    if(urls.length === 0) return;

    urls.forEach(async (url, idx) => {

    fetch(url)
        .then(res => res.text())
        .then(data => {
            parseString(data, (err, jsonData) => {
                if(err) {
                    console.log('There was an error');
                }


                let title, description;

                if(jsonData.rss) {
                    title = jsonData.rss?.channel[0].title[0];
                    description = jsonData.rss.channel[0].description[0]; 
                } else if(jsonData.feed) {
                    title = jsonData.feed.title[0];
                    description = jsonData.feed.description?.[0] || '';
                }

                console.log('---------------------------------');
                console.log(`RSS feed for URL: ${url}`);
                console.log(`Title: ${title}`);
                console.log(`Description: ${description}`);
                
                
                if(idx === urls.length - 1) {
                    console.log('---------------------------------');
                }
            });
        })
    });
    
})();