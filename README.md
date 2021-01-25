# Majestic Web Scraper

A web scraper that uses Node JS packages (Axios, Cheerio, Inquirer) to get product information for particular categories from Majestic.co.uk in order to create an inventory list as seed data for a database.

## Technologies

- Axios
- Cheerio
- Inquirer

## User Stories

Mock Majestic.co.uk websites data

- [x] Create mock data based off Majestic.co.uk HTML

Ensure user has control of what products they wish to have within their inventory

- [x] Use checkbox prompt for each category so user is able to specify what products are required

Collect all relevant data for a set of products within a search results list

- [ ] Isolate specific classes to be used by cheerio for product details using Google Dev Tools

- [x] Get URL links for products displayed within a particular results page

- [ ] Using URL links from a particular results page, get all product details for each link

- [ ] Ensure that numerous results pages are used to ensure enough product data is collected

Store data collected within a useable format

- [ ] Store data within a products array

- [ ] Ensure each product has specific category identifiers

- [ ] Write information to a file which can be used as SEED data for mongoDB database

## Licence

ISC
