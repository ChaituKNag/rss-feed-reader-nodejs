let Parser = require('rss-parser');
let parser = new Parser();

(async function() {
    const urls = process.argv.slice(2);

    if(urls.length === 0) return;

    urls.forEach(async (url, idx) => {
        let feed = await parser.parseURL(url);

        console.log(`
---------------------------------
RSS feed for URL: ${url}
Title: ${feed.title}
Description: ${feed.description}`);

        if(idx === urls.length - 1) {
            console.log('---------------------------------');
        }
    });
    
})();