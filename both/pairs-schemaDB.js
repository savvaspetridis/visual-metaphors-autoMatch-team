import './schema-setup.js'

Schemas.Pairs = new SimpleSchema({
  metaphorPair_id: {
    type: String, /* _id string, index into MetaphorPairs */
    index: 1,
    unique: false    
  },
metaphorPair_id_1: {
    type: String, /* Starbucks */
    index: 1,
    unique: false    
  },
  metaphorPair_id_2: {
    type: String, /* Summer */
    index: 1,
    unique: false    
  }, 
  image1_obj: {
    type: Object, /* {url: "", ...} */
    index: 1,
    unique: false,
    blackbox: true,  
  },
  image2_obj: {
    type: Object, /* {url: "", ...}  */
    index: 1,
    unique: false,
      blackbox: true,
  }, 
    label: {
    type: String,
    index: 1,
    unique: false,  
    optional: true
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


Pairs = Collections.Pairs = new Mongo.Collection("Pairs");
Pairs.attachSchema(Schemas.Pairs);





if(Meteor.isServer){
  Meteor.publish(null, function () {
    return Pairs.find();
  });


  Pairs.allow({
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });  
}
