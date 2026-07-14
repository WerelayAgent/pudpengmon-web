import scrape from 'website-scraper';

const options = {
  urls: ['https://minimon.world/'],
  directory: './site',
  sources: [
    { selector: 'img', attr: 'src' },
    { selector: 'link[rel="stylesheet"]', attr: 'href' },
    { selector: 'script', attr: 'src' },
    { selector: 'link[rel="icon"]', attr: 'href' },
    { selector: 'link[rel="apple-touch-icon"]', attr: 'href' }
  ],
  recursive: true,
  maxRecursiveDepth: 1,
  filenameGenerator: 'bySiteStructure',
};

scrape(options).then((result) => {
    console.log("Scraping completed successfully.");
}).catch((err) => {
    console.error("Scraping failed", err);
});
