AutoForm.hooks({
  insertImages2objects: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        
        var metaphorPair_id = Router.current().params.metaphorPair_id
        doc.metaphorPair_id = metaphorPair_id 
        
        doc.soap = "object"
        console.log(doc)
        this.result(doc);
      }
    },
  },
  insertImages2activity: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        
        var metaphorPair_id = Router.current().params.metaphorPair_id
        doc.metaphorPair_id = metaphorPair_id 
        
        doc.soap = "activity"
        console.log(doc)
        this.result(doc);
      }
    },
  },
  insertImages2person: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        
        var metaphorPair_id = Router.current().params.metaphorPair_id
        doc.metaphorPair_id = metaphorPair_id 
        
        doc.soap = "person"
        console.log(doc)
        this.result(doc);
      }
    },
  },
  insertImages2setting: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        
        var metaphorPair_id = Router.current().params.metaphorPair_id
        doc.metaphorPair_id = metaphorPair_id 
        
        doc.soap = "setting"
        console.log(doc)
        this.result(doc);
      }
    },
  }    
});


Template.insertImages2Brainstorm.helpers({
  countImages: function(){
    // TODO: ONLY GET IMAGES! FOR THIS metaphor pari
    var metaphorPair_id = Router.current().params.metaphorPair_id
    return Images1.find({metaphorPair_id: metaphorPair_id, concept: "concept1"}).count();
    
  },
  
  image2objects: function () {
    // TODO: ONLY GET IMAGES! FOR THIS metaphor pari
    var metaphorPair_id = Router.current().params.metaphorPair_id
    return Images2Brainstorm.find({metaphorPair_id: metaphorPair_id, soap: "object"}, {sort: {timestamp: -1}});
  },
  image2activities: function () {
    // TODO: ONLY GET IMAGES! FOR THIS metaphor pari
    var metaphorPair_id = Router.current().params.metaphorPair_id
    return Images2Brainstorm.find({metaphorPair_id: metaphorPair_id, soap: "activity"}, {sort: {timestamp: -1}});
  },
  image2people: function () {
    // TODO: ONLY GET IMAGES! FOR THIS metaphor pari
    var metaphorPair_id = Router.current().params.metaphorPair_id
    return Images2Brainstorm.find({metaphorPair_id: metaphorPair_id, soap: "person"}, {sort: {timestamp: -1}});
  },
  image2settings: function () {
    // TODO: ONLY GET IMAGES! FOR THIS metaphor pari
    var metaphorPair_id = Router.current().params.metaphorPair_id
    return Images2Brainstorm.find({metaphorPair_id: metaphorPair_id, soap: "setting"}, {sort: {timestamp: -1}});
  },    
    
  
  
  metaphorPair: function () {
    var metaphorPair_id = Router.current().params.metaphorPair_id
    var metaphorPair = MetaphorPairs.findOne(metaphorPair_id)
    //console.log("helper: "+metaphorPair_id)
    //console.log(metaphorPair)
    //console.log(Router.current().params.metaphorPair_id)
    
    return metaphorPair;
  },
  /*
    makeUniqueID: function () {
      return "update-each-" + this._id;
    }
  */
  
  
});


Template.insertImages2Brainstorm.events({
 'click .done': function(event){
    //collect data
    var data = $(event.currentTarget).data()
    var template = data.template
    var concept = data.concept
     Completion.insert({template: template, concept: concept})
    
    //go back home
    Router.go("home")
  },  
  
})