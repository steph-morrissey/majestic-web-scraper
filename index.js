const cheerio = require('cheerio');
const axios = require('axios');

const category = 'lager';
const pageNum = '1';
const url = `https://www.majestic.co.uk/${category}?pagenumber=${pageNum}&paginationType=10`;

// Get specific results page URL links for each product
const getPageResults = async (url) => {
  try {
    const html = await axios.get(url);
    const $ = await cheerio.load(html.data);
    const products = $('.product-name.t-not-link')
      .map(
        (i, product) => 'https://www.majestic.co.uk' + $(product).attr('href'),
      )
      .get();
    console.log(products);
  } catch (err) {
    console.error(err);
  }
};

getPageResults(url);
