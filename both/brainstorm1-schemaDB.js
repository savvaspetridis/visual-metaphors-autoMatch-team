import './schema-setup.js'

Schemas.Brainstorm1 = new SimpleSchema({

   concept: {
    type: String,
    index: 1,
    unique: false,
    optional: true,    
  },

  brainstorm_type: {
    type: String,
    //label: "Shape",
    allowedValues: ["setting", "object", "activity", "person",  "other"],//["circle", "rectangle", "cylinder", "other"],
    optional: true,    
  },
   
   idea: {
    type: String,
    index: 1,
    unique: false    
  }, 

  // FOLLOW UPS

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

})

Brainstorm1 = Collections.Brainstorm1 = new Mongo.Collection("Brainstorm1");
Brainstorm1.attachSchema(Schemas.Brainstorm1);





if(Meteor.isServer){
  Meteor.publish(null, function () {
    return Brainstorm1.find();
  });


  Brainstorm1.allow({
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    },
    update: function() {
      return true;
    }
  });  
}