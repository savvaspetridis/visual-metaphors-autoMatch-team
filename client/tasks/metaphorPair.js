

Template.metaphorPair.helpers({
  
  metaphorPair: function () {
    var metaphorPair_id = Router.current().params.metaphorPair_id
    var metaphorPair = MetaphorPairs.findOne(metaphorPair_id)
    //console.log("helper: "+metaphorPair_id)
    //console.log(metaphorPair)
    //console.log(Router.current().params.metaphorPair_id)
    
    return metaphorPair;
  }
  
});

Template.metaphorPair.events({
  'click .imagesFor1': function(){
    //console.log("images for 1")
    var metaphorPair_id = Router.current().params.metaphorPair_id
    Router.go('images1', {metaphorPair_id: metaphorPair_id});
  },
   'click .imagesFor2': function(){
    console.log("images for 2")
    
  },
     'click .matrix': function(){
    console.log("matrix")
  },
})


