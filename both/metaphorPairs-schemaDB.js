import './schema-setup.js'

Schemas.MetaphorPair = new SimpleSchema({
  concept1: {
    type: String,
    index: 1,
    unique: false,
    //optional: true, //this is weird, but I want it to be undefined for the "all pairs" case
  },
  concept2: {
    type: String,
    index: 1,
    unique: false,
    //optional: true, //this is weird, but I want it to be undefined for the "all pairs" case
  },

});


MetaphorPairs = Collections.MetaphorPairs = new Mongo.Collection("MetaphorPairs");
MetaphorPairs.attachSchema(Schemas.MetaphorPair);





if(Meteor.isServer){
  Meteor.publish(null, function () {
    return MetaphorPairs.find();
  });


  MetaphorPairs.allow({
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });  
}
