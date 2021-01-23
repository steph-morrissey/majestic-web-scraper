const cheerio = require('cheerio');
const axios = require('axios');
const inquirer = require('inquirer');

// List of checkbox options per category allowing user to select specific product types
const questionPrompter = [
  {
    type: 'checkbox',
    name: 'beers',
    message: 'What beer types would you like to include within your inventory?',
    choices: ['lager', 'ale', 'craft-beers', 'cider', 'low-alcohol-beers'],
  },
  {
    type: 'checkbox',
    name: 'wines',
    message: 'What wine types would you like to include within your inventory?',
    choices: ['white-wines', 'rose-wines', 'red-wines'],
  },
  {
    type: 'checkbox',
    name: 'spirits',
    message:
      'What spirits types would you like to include within your inventory?',
    choices: [
      'gin',
      'whisky',
      'vodka',
      'brandy',
      'rum',
      'liqueurs-and-aperitifs',
      'low-and-no-alcohol-spirits',
    ],
  },
];

let inventoryArray = [];
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

const getProductUrls = (productData) => {
  return productData.map((product) => {
    const category = product;
    const url = `https://www.majestic.co.uk/${category}?pagenumber=${pageNum}&paginationType=10`;
    return url;
  });
};

const processCategoriesResponse = async (data) => {
  if (data.beers.length !== 0) {
    const beersData = data.beers;
    const beers = getProductUrls(beersData);
    const beersUrls = { beers };
    inventoryArray.push(beersUrls);
  }
  if (data.wines.length !== 0) {
    const winesData = data.wines;
    const wines = getProductUrls(winesData);
    const winesUrls = { wines };
    inventoryArray.push(winesUrls);
  }
  if (data.spirits.length !== 0) {
    const spiritsData = data.spirits;
    const spirits = getProductUrls(spiritsData);
    const spiritsUrls = { spirits };
    inventoryArray.push(spiritsUrls);
  }
  console.log(inventoryArray);
};

const init = async () => {
  await inquirer.prompt(questionPrompter).then(processCategoriesResponse);
};

init();
