import './schema-setup.js'

Schemas.Images2 = new SimpleSchema({
  brandOrConcept: {
    type: String,
    allowedValues: ["brand", "concept"],
    optional: true,  
  },
  prompt: {
    type: String,
    index: 1,
    unique: false,
    optional: true,
  },
  label: {
    type: String,
    index: 1,
    unique: false,
    optional: true,
    label: "Object",
  },
  url: {
    type: String,
    index: 1,
    unique: false,
    label: "URL",
  },
  canvas_data: {
    type: String,
    unique: false, 
    optional: true, 
    //blackbox: true,
  },
  timestamp: {
    type: Number,
    unique: false,
    autoValue:function(){ 
      if (this.isInsert) {
        return Date.now();
      } else if (this.isUpsert ) {
        return {$setOnInsert: Date.now()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }      
    }    
  },


  iconic: {
    type: String,
    allowedValues: ["yes", "no"],
    optional: true,
        
  },


  shape: {
    type: String,
    label: "Shape",
    allowedValues: ["box", "rectangle", "sphere", "circle",  "cylinder", "other"],//["circle", "rectangle", "cylinder", "other"],
    optional: true,    
  },
  drawnShape: {
    type: String,
    allowedValues: ["circle", "rect"],
    optional: true,    
  },

  complexity: {
    type: String,
    label: "Coverage",
    allowedValues: ["whole", "part", "other"],
    optional: true,        
  },
  dimensionality: {
    type: String,
    allowedValues: ["2D", "3D"],
    optional: true,        
  },

  concept: {
    type: String,
    index: 1,
    //unique: false,  
    optional: true,  
  },

  metaphorPair_id: {
    type: String,
    index: 1,
    unique: false,  
    optional: true,  
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


Images2 = Collections.Images2 = new Mongo.Collection("Images2");
Images2.attachSchema(Schemas.Images2);





if(Meteor.isServer){
  Meteor.publish(null, function () {
    return Images2.find(
      //{$or: [{createdBy: this.userId}, {createdBy: "admin"}]}
      );
  });


  Images2.allow({
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
