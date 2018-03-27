Template.insertMetaphorPair.helpers({
  metaphorPairs: function () {
    return MetaphorPairs.find();
  }
});

Template.insertMetaphorPair.events({
  'click .goToMetaphorPair': function(){
    console.log("goToMetaphorPair: "+this._id)
    Router.go('metaphorPair', {metaphorPair_id: this._id});
    //FlowRouter.go('MetaphorPair', { _id: this._id });
  }  
})

