import '../globals.js'

var boxExamples = [
    {
        url: "box-parts-cooler.png",
        shape: "box-parts-present.png",
        wholeOrPart: "box-whole-lego.png",
    },
    {
        url: "box-parts-present.png",
        shape: "",
        wholeOrPart: ""
    },
    {
        url: "box-whole-lego.png",
        shape: "",
        wholeOrPart: ""
    },
]

var rectExamples = [

    {
        url:"rect-part-teabag.png",
        shape: "",
        wholeOrPart: ""
    },
    {
        url:"rect-whole-hersheys.png",
        shape: "",
        wholeOrPart: ""
    },
    {
        url: "rect-whole-iphone.png",
        shape: "",
        wholeOrPart: ""
    },
]


var sphereExamples = [
    {
        url: "sphere-beachball.png",
        shape: "",
        wholeOrPart: ""
    },
    {
        url: "sphere-part-icecream.png",
        shape: "",
        wholeOrPart: ""
    },
    {
        url: "sphere-part-teapot.png",
        shape: "",
        wholeOrPart: ""
    },
]


var circleExamples = [
    {
        url: "circle-part-sun.png",
        shape: "",
        wholeOrPart: ""
    },
    {
        url: "circle-whole-cookie.png",
        shape: "",
        wholeOrPart: ""
    },
    {
        url: "circle-whole-orange.png",
        shape: "",
        wholeOrPart: ""
    },
]

var cylinderExamples = [

    {
        url: "cylinder-part-toiletpaper.png",
        shape: "",
        wholeOrPart: ""
    },
    {
        url: "cylinder-parts-fireextinguisher.png",
        shape: "",
        wholeOrPart: ""
    },
    {
        url: "cylinder-whole-sodacan.png",
        shape: "",
        wholeOrPart: ""
    },

]

var otherShapeExamples = [

    {
        url: "other-shape-banana.jpg",
        shape: "",
        wholeOrPart: ""
    },
    {
        url: "other-shape-cloud.jpg",
        shape: "",
        wholeOrPart: ""
    },
    
    {
        url: "other-shape-heart.jpg",
        shape: "",
        wholeOrPart: ""
    },    
]


/*
apple.png
flat_lego.png
movie_ticket.png
pen.png
plate.png
suitcase.png
twitter-logo.png
*/

var identifyShapeExercises = [

    {
        url: "rect-part-iphone.png",
        shape: "rectangle",
        wholeOrPart: "",
    },
    {
        url: "cylinder-whole-starbucks.png",
        shape: "cylinder",
        wholeOrPart: "",
    },
    {
        url: "sphere-whole-earth.png",
        shape: "sphere",
        wholeOrPart: "",
    },
    {
        url: "apple.png",
        shape: "sphere",
        wholeOrPart: "",
    },
    {
        url: "flat_lego.png",
        shape: "rectangle",
        wholeOrPart: "",
    },
    {
        url: "movie_ticket.png",
        shape: "rectangle",
        wholeOrPart: "",
    },
    {
        url: "pen.png",
        shape: "cylinder",
        wholeOrPart: "",
    },
    {
        url: "plate.png",
        shape: "circle",
        wholeOrPart: "",
    },
    {
        url: "twitter-logo.png",
        shape: "other",
        wholeOrPart: "",
    },
    {
        url: "suitcase.png",
        shape: "box",
        wholeOrPart: "",
    },
    /*
    {
        url: "",
        shape: "",
        wholeOrPart: "",
    },
    {
        url: "",
        shape: "",
        wholeOrPart: "",
    },
    */

]


var identifyShapeURL = baseURL+"identifyShapes/"



// identifyShapesIntro
Template.identifyShapesIntro.helpers({      
    iconsURL: function(){
        return iconsURL
    }
})


Template.identifyShapeExercise.helpers({
    baseURL: function(){
        return identifyShapeURL+"exercises/"
    },
    exercises: function(){
        return identifyShapeExercises 
    }    
})



Template.identifyShapesExamples.helpers({  
    baseURL: function(){
        return baseURL
    },
    iconsURL: function(){
        return iconsURL
    },
    boxExamples: function(){
        return boxExamples
    },
    rectExamples: function(){
        return rectExamples
    },
    circleExamples: function(){
        return circleExamples
    },
    sphereExamples: function(){
        return sphereExamples
    },
    cylinderExamples: function(){
        return cylinderExamples
    },
    otherShapeExamples: function(){
        return otherShapeExamples
    }
});





var shapeFeedback = {
    
    "other": "'other'",
    "select": "'(select)'",
    "box" : "<b>box</b>",
    "rectangle": "<b>rectangle</b>",
    "sphere" : "<b>sphere</b>",
    "circle" : "<b>circle</b>",
    "cylinder" : "<b>cylinder</b>",
    
}

Template.identifyShapeExercise.events({
    'click .submitShapeExercise': function(event){
        console.log("submitWholeOrPartExercise")
        var url = $(event.target).data("url")
        var answer = $(event.target).data("answer")
        var select = $(event.target).siblings("select")[0]
        var val = $(select).val()
        console.log(val+" "+answer)
        //show my answer

        //var answerDiv = $(event.target).siblings(".answer")[0]
        //$(select).show()


        
        if(val == answer){
            //Correct!
            var feedbackDivCorrect = $(event.target).siblings(".answerCorrect")[0]
            var feedbackDivIncorrect = $(event.target).siblings(".answerInCorrect")[0]

            var message = shapeFeedback[answer]

            $($(feedbackDivCorrect).children(".correctFeedback")[0]).html("This shape is a "+message+".")

            $(feedbackDivCorrect).show()
            $(feedbackDivIncorrect).hide()
        }else{
            //Incorrect
            var feedbackDivIncorrect = $(event.target).siblings(".answerInCorrect")[0]
            var feedbackDivCorrect = $(event.target).siblings(".answerCorrect")[0]

            var message = shapeFeedback[answer]
            var notMessage = shapeFeedback[val]

            $($(feedbackDivIncorrect).children(".incorrectFeedback")[0]).html("We think this shape is a "+message+", not "+notMessage+".")

            $(feedbackDivIncorrect).show()
            $(feedbackDivCorrect).hide()
        }
        
        // 
    },
       'click .done': function(event){
        //collect data
        /*
        var data = $(event.currentTarget).data()
        var template = data.template
        var concept = data.concept
        Completion.insert({template: template, concept: concept})

        
        var answers = $(".nameObject")
        
        $(".nameObject").each(function(){
            
            var input = $(this).data("input")
            var url = $(this).data("url")
            var conceptName = $(this).val() || "none"
            
            ConceptNames.insert({
                url: url,
                input: input,
                conceptName: conceptName
            })            
            
        })
        */
 
        
        //go back home
        Router.go("instructionsShapeCoverage")
    },
})

