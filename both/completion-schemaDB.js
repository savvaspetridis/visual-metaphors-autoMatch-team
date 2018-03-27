
import './schema-setup.js'

Schemas.Completion = new SimpleSchema({
  template: {
    type: String,
    index: 1,
    unique: false    
  },
  concept: {
    type: String,
    index: 1,
    unique: false ,
    optional: true,   
  },
  createdBy: {
      type: String,
      autoValue:function(){ return this.userId }
  },
  timestamp: {
      type: Number,
      autoValue:function(){ return (new Date()).getTime() }
  },
  
});


Completion = Collections.Completion = new Mongo.Collection("Completion");
Completion.attachSchema(Schemas.Completion);





if(Meteor.isServer){
  Meteor.publish(null, function () {
    return Completion.find();
  });


  Completion.allow({
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });  
}
