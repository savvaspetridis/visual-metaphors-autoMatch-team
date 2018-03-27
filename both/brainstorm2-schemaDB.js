import './schema-setup.js'

Schemas.Brainstorm2 = new SimpleSchema({

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

Brainstorm2 = Collections.Brainstorm2 = new Mongo.Collection("Brainstorm2");
Brainstorm2.attachSchema(Schemas.Brainstorm2);





if(Meteor.isServer){
  Meteor.publish(null, function () {
    return Brainstorm2.find();
  });


  Brainstorm2.allow({
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