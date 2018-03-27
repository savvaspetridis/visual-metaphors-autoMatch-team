//import './../globals.js'
//import './taskOrder.js'


AutoForm.hooks({
  insertImages1: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        var concept = Router.current().params.concept1
        doc.concept = concept 
        this.result(doc);
      }
    },

  }
});


Template.showList1.helpers({
  brainstorm_objects: function(){
    //var metaphorPair_id = Router.current().params.metaphorPair_id
    var concept = Router.current().params.concept1

    //return soaps
    var soaps = Images2Brainstorm.findOne({
        concept: concept,
        //metaphorPair_id: metaphorPair_id,         
    })
    
    if(soaps){
        return soaps.soap
    }else {
        return {}
    }
    
    //return soaps;
  }  
})


Template.insertImages1.helpers({
  countImages: function(){
    var concept = Router.current().params.concept1
    return Images1.find({
        //metaphorPair_id: metaphorPair_id, 
        //createdBy: Meteor.userId()
        concept:concept
    }).count();
    
  },
  
  images1: function () {
    var concept = Router.current().params.concept1
    return Images1.find({
        //metaphorPair_id: metaphorPair_id, 
        //createdBy: Meteor.userId()
        concept:concept
    }, {sort: {timestamp: -1}});
  },
  
  
  metaphorPair: function () {
    var metaphorPair_id = Router.current().params.metaphorPair_id 
    var metaphorPair = MetaphorPairs.findOne(metaphorPair_id)

    return metaphorPair;
  },
    
    isWarmup: function(){
        var metaphorPair_id = Router.current().params.metaphorPair_id
        
        if(metaphorPair_id == "warmup1"){
            return true
        }else{
            return false
        }
    },
      concept: function(){
    return Router.current().params.concept1
  },   
  

  
  
  
});









Template.insertImages1.events({
 'click .done': function(event){
    //collect data
    var data = $(event.currentTarget).data()
    var template = data.template
    var concept = data.concept
     Completion.insert({template: template, concept: concept})
    
    //go back home
    Router.go("home")
  },
 'click .next': function(event){
    //collect data
    var data = $(event.currentTarget).data()
    var template = data.template
    var concept = data.concept
    Completion.insert({template: template, concept: concept})
        
    var metaphorPair_id = Router.current().params.metaphorPair_id
    
    var nextTemplate = findNextTemplate(template)
    Router.go(nextTemplate, {metaphorPair_id: metaphorPair_id})
  },     
    
    'click .instructions': function(){
        var origin = window.location.origin
        var newLocation = origin+"/instructions/images1"
        window.open(newLocation)
    }
  
})