Template.recombinationMatrix.events({
  'change .pair': function(event){
    //console.log(event.target)
    var newValue = $(event.target).val();
    var images1id = $(event.target).data("images1id")
    var images2id = $(event.target).data("images2id")
    var metaphorPair_id = Router.current().params.metaphorPair_id 

    //Insert or Update Collection
    MatchEvaluation.insert(
      {
        metaphorPair_id: metaphorPair_id,
        image1_id: images1id,
        image2_id: images2id,
        match_evaluation: newValue,
      }, function(error, result){
        console.log(error)
      }
      
    )
  }  
})

Template.recombinationMatrix.helpers({

  
  images1: function () {
    //sort = {'timestamp': -1}
    var metaphorPair_id = Router.current().params.metaphorPair_id
    return Images1.find({metaphorPair_id: metaphorPair_id}, {sort: {timestamp: -1}});
  },

  images2: function () {
    //sort = {'timestamp': -1}
    var metaphorPair_id = Router.current().params.metaphorPair_id
    return Images2.find({metaphorPair_id: metaphorPair_id}, {sort: {timestamp: -1}});
  },  
  
  metaphorPair: function () {
    var metaphorPair_id = Router.current().params.metaphorPair_id
    var metaphorPair = MetaphorPairs.findOne(metaphorPair_id)
    //console.log("helper: "+metaphorPair_id)
    //console.log(metaphorPair)
    //console.log(Router.current().params.metaphorPair_id)
    
    return metaphorPair;
  },
  
  
  makeUniqueID: function () {
    //console.log("image._id: ")
    //console.log(this)
    //console.log(this.images1)
    return "update-each-" + this._id;
  }
  
  
  
});