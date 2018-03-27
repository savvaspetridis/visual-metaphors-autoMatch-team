
Template.header.events({
  'click .goTo': function(event){
    var type = $(event.target).data("type")
    console.log(type)
    
    //var metaphorPair_id = Router.current().params.metaphorPair_id
    var route = "/instructions/"+type
    Router.go(route);
  },
})