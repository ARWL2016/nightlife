const { User, Location } = require('../db');

const util = require('util');

function addToDiary(req, res) {
  const { user, location, datetime } = req.body;

  // create the event object 
  const newEvent = {
    date: datetime.date, 
    hour: datetime.hour,
    amPm: datetime.amPm, 
    displayName: user.displayName,
    place_id: location.place_id, 
    place_name: location.name
  }; 

  // save the event to the user (update)
  User.findOneAndUpdate(
    {displayName: user.displayName}, 
    {$push: {events: newEvent}})
      .then(() => {
          // TODO: check if location is already in DB - update with upsert set to true
          return Location.findOne({place_id: location.place_id});
      })
      .then(existingLocation => {
          if (existingLocation) {
            existingLocation.events.push(newEvent);
            return existingLocation.save();
          } else {
            const newLocation = new Location(location); 
            newLocation.events.push(newEvent);
            return newLocation.save();
          }
      })
      .then(() => {
        res.status(200).send('event added');
      })
      .catch(e => {
        if (e) {
          res.sendStatus(500);
          console.log(e);
        }
      });
}

function getEventsByUser(req, res) {
  const displayName = req.query.name; 
  const { token } = req.query; 

  User.findOne({displayName})
    .then(user => {
      const events = JSON.stringify(user.events);
      res.status(200).send(events);
    })
    .catch(e => {
      if (e) {
        res.sendStatus(500);
      }
    })

  // console.log({displayName, token});
}

function deleteEvent(req, res) {
  const event = req.body;
  const {displayName, place_id, date, hour, amPm} = req.body;
  console.log({event});

  User.findOneAndUpdate({displayName}, {$pull: {events: {place_id, date, hour, amPm} }})
      .then(() => {
        return Location.findOneAndUpdate({place_id}, {$pull: {events: {place_id, date, hour, amPm}}}, {multi: true} )
      })
      .then(() => {
        res.status(200).send('event deleted');
      })
      .catch(e => {
        if (e) {
          console.log(e);
          res.sendStatus(500);
        }
      })
    

    
}



module.exports = {addToDiary, getEventsByUser, deleteEvent };