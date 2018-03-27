import './../globals.js'

var findImagesBaseURL = baseURL+"findImages/images1/"

Template.instructionsImages1.helpers({
    baseURL: function(){
        return findImagesBaseURL
    },
})



var replaceImage = function(){
  var url = $("#testlink").val() 
  var url_ending = url.slice(-4).toLowerCase()
  var valid_endings = [".png", ".jpg", "jpeg"]
  if(valid_endings.indexOf(url_ending) == -1 ){
    console.log("data")
    $("#catchAllError").hide()
    $("#feedback").html("That url is not quite right. It doesn't end in <b>.jpeg, .png, or .jpg</b><br><br>Try waiting longer for the image to load before coping the link.<br><br> If that doesn't work, just pick another image")
  } else {
    //clear feedback
    $("#feedback").html("")

    $("#targetIMG").attr("src", url) 
  }
}

Template.instructionsImages1.events({
  'keypress #testlink': function(event){
      if (event.keyCode == 13) {
        replaceImage()
    }
  },
  'click #submit': function(event){
    replaceImage()      
  },
  'click #clear_url': function(event){
    $("#testlink").val("") 
  },
  'click .done': function(event){
    //collect data
    var data = $(event.currentTarget).data()
    var template = data.template
    var concept = data.concept
     //Completion.insert({template: template, concept: concept})
    
    //go back home
    Router.go("/images2find/winter")
  }
  
})