import './../globals.js'

var findImagesBaseURL = baseURL+"findImages/"

Template.instructionsImages2.helpers({
    baseURL: function(){
        return findImagesBaseURL
    },
})

Template.instructionsImages2.events({
  'click .option': function(event){
    console.log("option")
    var num = $(event.target).closest(".option").data("num")
    var correct = $(event.target).closest(".option").data("correct")
    //console.log(correct)
    if(correct == "correct"){
      $("#"+num+"_feedback_correct").show()
      $("#"+num+"_feedback_incorrect").hide()
    }
    if(correct == "incorrect"){
      $("#"+num+"_feedback_incorrect").show()
      $("#"+num+"_feedback_correct").hide()
    }

        

  },

  'click .done': function(event){
    //collect data
    var data = $(event.currentTarget).data()
    var template = data.template
    var concept = data.concept
     Completion.insert({template: template, concept: concept})
    
    //go back home
    Router.go("/instructions/images1")
  },
  
})