import './schema-setup.js'

Schemas.MixCanvases = new SimpleSchema({
  metaphorPair_id: {
    type: String,
    index: 1,
    unique: false,  
    optional: true,  
  },

  concept1: {
    type: String,
    index: 1,
    unique: false,  
    optional: true,  
  },
  concept2: {
    type: String,
    index: 1,
    unique: false,  
    optional: true,  
  },  

  //image1_id, image1_drawnShape, image1_canvas_data, image2_id, image2_drawnShape, image2_canvas_data, mix_canvas_obj
  
  image1_id: {
    type: String,
    index: 1,
    unique: false,
    optional: true,
  },
  image1_drawnShape: {
    type: String,
    allowedValues: ["circle", "rect"],
    optional: true,    
  },
  image1_canvas_data: {
    type: String,
    unique: false, 
    optional: true, 
  },

  /*
  shape: {
    type: String,
    allowedValues: ["circle", "rectangle", "cylinder", "other"],
    optional: true,    
  },
  */

  image2_id: {
    type: String,
    index: 1,
    unique: false,
    optional: true,
  },
  image2_drawnShape: {
    type: String,
    allowedValues: ["circle", "rect"],
    optional: true,    
  },
  image2_canvas_data: {
    type: String,
    unique: false, 
    optional: true, 
  },


  mix_canvas_obj: {
    type: String,
    unique: false, 
    optional: true, 
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


MixCanvases = Collections.MixCanvases = new Mongo.Collection("MixCanvases");
MixCanvases.attachSchema(Schemas.MixCanvases);





if(Meteor.isServer){
  Meteor.publish(null, function () {
    return MixCanvases.find(
        {$or: [{createdBy: this.userId}, {createdBy: "admin"}]}
    );
  });


  MixCanvases.allow({
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });  
}
