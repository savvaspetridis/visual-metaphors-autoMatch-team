Template.instructionsFilteringImages2.events({

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