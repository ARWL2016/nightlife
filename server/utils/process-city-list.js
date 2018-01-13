// utility method for creating json city data - not needed by live app

const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, '../../ref/uk-cities'), 'utf8'); 

const cityListArr = text.split(' '); 
let dataArr = [];

cityListArr.forEach(city => {
  city = city.replace(/_/g, ' ');
  let obj = {name: city};
  dataArr.push(obj); 
}); 

dataArr
  .sort((a, b) => {
    a = a.name.toLowerCase();
    b = b.name.toLowerCase();
    if (a < b) return -1; 
    if (b < a) return 1; 
    else return 0;
  })

fs.writeFileSync(path.join(__dirname, '../../ref/uk-cities.json'), JSON.stringify(dataArr));
