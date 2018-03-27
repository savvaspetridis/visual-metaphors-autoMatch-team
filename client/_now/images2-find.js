//import './../globals.js'
//import './taskOrder.js'


AutoForm.hooks({
  insertImages2: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        var concept = Router.current().params.concept2
        doc.concept = concept 
        this.result(doc);
      }
    },
  },
});

Template.insertImages2.helpers({
  images2: function () {
    //sort = {'timestamp': -1}
    //var metaphorPair_id = Router.current().params.metaphorPair_id
    var concept = Router.current().params.concept2
    return Images2.find({
        //metaphorPair_id: metaphorPair_id, 
        concept: concept,
        //createdBy: Meteor.userId()
    }, {sort: {timestamp: -1}});
  },
  
  countImages: function(){
    //var metaphorPair_id = Router.current().params.metaphorPair_id
    var concept = Router.current().params.concept2
    return Images2.find({
        //metaphorPair_id: metaphorPair_id, 
        concept: concept,
        //createdBy: Meteor.userId()
    }).count();
    
  },

  concept: function(){
    return Router.current().params.concept2
  },

  /*
  metaphorPair: function () {
    var metaphorPair_id = Router.current().params.metaphorPair_id //starbucks

    
    //var metaphorPair = {}
    //metaphorPair.concept2 = _metaphorPairs[metaphorPair_id]
    //metaphorPair.concept_id = metaphorPair_id
    
    var metaphorPair = MetaphorPairs.findOne(metaphorPair_id)

    return metaphorPair;
  },
  */
    
    isWarmup: function(){
        var metaphorPair_id = Router.current().params.metaphorPair_id
        
        if(metaphorPair_id == "warmup1"){
            return true
        }else{
            return false
        }
    } 

  

  
  
});


Template.showList.helpers({
  brainstorm_objects: function(){
    //var metaphorPair_id = Router.current().params.metaphorPair_id
    var concept = Router.current().params.concept2

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


/*
'lifeguard: saving people from drowning',
'students: taking vacation from school',
'Family: on vacation together',
'People in bathing suits',
'lifeguards: protecting swimmers',
'baseball manager:  coaching players',
'lifeguard: watching the pool',
'swimming instructor: teaching children',
'Friends playing beach volleyball',
'Couple: sailing'
*/  



Template.insertImages2.events({


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
    //var concept = $(event.currentTarget).data("concept2")
    var concept = Router.current().params.concept2
    console.log(concept)
    Router.go("/")
    
    //var concept = $(event.currentTarget).data("concept")
    //console.log(concept)
    if(concept == "fall"){
      console.log("next = healthy")
      Router.go("/images2find/healthy")
    }
    if(concept == "healthy"){
      Router.go("/images2find/fashion")
    }
    if(concept == "fashion"){
      Router.go("/images2find/energy")
    }
    if(concept == "energy"){
      Router.go("/")
    }
    
    /*
    var template = data.template
    var concept = data.concept
    Completion.insert({template: template, concept: concept})
    
    
    var metaphorPair_id = Router.current().params.metaphorPair_id
    
    var nextTemplate = findNextTemplate(template)
    Router.go(nextTemplate, {metaphorPair_id: metaphorPair_id})
    */
  },  
    'click .instructions': function(){
        var origin = window.location.origin
        var newLocation = origin+"/instructions/images2"
        window.open(newLocation)
    }  
})