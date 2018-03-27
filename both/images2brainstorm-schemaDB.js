import './schema-setup.js'

Schemas.Images2Brainstorm = new SimpleSchema({
  
  timestamp: {
    type: Number,
    unique: false,
    autoValue:function(){ return Date.now() }    
  },
/*
  metaphorPair_id: {
    type: String,
    index: 1,
    unique: false    
  },
  */
  label: {
    type: String,
    index: 1,
    unique: false    
  },
    concept: {
    type: String,
    index: 1,
    unique: false    
  },

  soap: {
    type: Object,
    unique: false, 
    optional: true, 
    blackbox: true,
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


Images2Brainstorm = Collections.Images2Brainstorm = new Mongo.Collection("Images2Brainstorm");
Images2Brainstorm.attachSchema(Schemas.Images2Brainstorm);





if(Meteor.isServer){
  Meteor.publish(null, function () {
    return Images2Brainstorm.find();
  });


  Images2Brainstorm.allow({
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });  
}
