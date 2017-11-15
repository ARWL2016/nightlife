const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];

const nextWeek = [];

for (let i = 0; i < 7; i++) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + i);
  const day = week[currentDate.getDay()];
  const date = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const dateString = i === 0 ? 'Today' : `${day}, ${date} ${month}`; 
  nextWeek.push(dateString);
}

console.log(nextWeek);

