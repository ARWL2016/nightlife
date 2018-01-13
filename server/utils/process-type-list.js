// utility method for creating json data - not needed live

const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, '../../ref/types'), 'utf8'); 
const array = JSON.stringify(text.replace(/_/g, ' ').split('\r\n'));

fs.writeFileSync(path.join(__dirname, '../../ref/typesArray.json'), array);
