const axios = require('axios');
const cheerio = require('cheerio');
const Doctor = require('./src/model/doctorModel');
const {dbConnection} = require('./src/config/dbConfig')
const baseURL = 'https://onmc.cm/tableau_de_lordre';

dbConnection()

async function fetchData(page) {
    try {
        const { data } = await axios.get(`${baseURL}?page=${page}`);
        const $ = cheerio.load(data);

        const doctors = [];

        $('.bloc-nom').each((index, element) => {
            const username = $(element).text().trim();
            const licenseNumber = $(element).siblings('.bloc-numero').text().trim();
            const speciality = $(element).siblings('.bloc-specialite').text().trim();

            if (username && licenseNumber && speciality) {
                doctors.push({ username, licenseNumber, speciality });
            }
        });

        await Doctor.insertMany(doctors);
        console.log(`Page ${page} scraped and saved.`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function scrapeAllPages() {
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
        const { data } = await axios.get(`${baseURL}?page=${page}`);
        const $ = cheerio.load(data);
        const doctorsOnPage = $('.bloc-nom').length;

        if (doctorsOnPage === 0) {
            hasMorePages = false;
        } else {
            await fetchData(page);
            page++;
        }
    }

    console.log('Scraping completed.');
}

scrapeAllPages();
