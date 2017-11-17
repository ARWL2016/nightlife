const {User, Location } = require('../db');

const util = require('util');

function addToDiary(req, res) {
  console.log('************ ADD TO DIARY **********************');
  // console.log(req.body);
  // console.log(util.inspect(req, {depth: 0}));

  const { user, location, datetime } = req.body;
  console.log({datetime, user});
  

  // create the event object 
  const newEvent = {
    date: datetime.date, 
    hour: datetime.hour,
    amPm: datetime.amPm, 
    displayName: user.displayName,
    place_id: location.place_id
  }; 

  console.log({newEvent});

  // save the event to the user (update)
  User.findOneAndUpdate(
    {displayName: user.displayName}, 
    {$push: {events: newEvent}})
      .then(() => {
        // TODO: check if location is already in DB - update with upsert set to true
        //https://docs.mongodb.com/manual/reference/method/db.collection.update/ 
        // create and save the location object also with the event
        const newLocation = new Location(location); 
        newLocation.events.push(newEvent);
        return newLocation.save();
      })
      .then(loc => console.log(loc))
      .catch(e => console.log(e));



  
  
}

module.exports = {addToDiary};