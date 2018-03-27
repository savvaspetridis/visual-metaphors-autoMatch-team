import './schema-setup.js'

Schemas.ConceptNames = new SimpleSchema({

  url: {
    type: String,
    index: 1,
    unique: false
  },
  input: {
    type: String,
    index: 1,
    unique: false
  },
  conceptName: {
    type: String,
    index: 1,
    unique: false
  },    

  timestamp: {
    type: Number,
    unique: false,
    autoValue:function(){ return Date.now() }    
  },
  createdBy: {
      type: String,
      autoValue:function(){ 
          if (this.isSet){
              return this.value
          }else{
          return this.userId 
            }
      }
  },
  
});


ConceptNames = Collections.ConceptNames = new Mongo.Collection("ConceptNames");
ConceptNames.attachSchema(Schemas.ConceptNames);





if(Meteor.isServer){
  Meteor.publish(null, function () {
    return ConceptNames.find(
        {$or: [{createdBy: this.userId}, {createdBy: "admin"}]}
    );
  });


  ConceptNames.allow({
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });  
}
