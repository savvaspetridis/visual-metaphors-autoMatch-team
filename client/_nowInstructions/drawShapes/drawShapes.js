import './../globals.js'
import './../../_now/canvas_helpers_for_meteor.js'

/*
Cigarette_DS.jpg
crossant.png
door.jpg
house-from-premier-builders-in-carthage-mo-64836--home-builders-5.png
mountain.jpg
orange-02.jpg
orange-half.jpg
wine-bottle.jpeg

*/

/*
bottle.png
cigarette.png
crossant.png
door.png
house.png
mountain.png
orange.png
orange-half.png
*/

var drawShapesBaseURL = baseURL+"drawShapes/"
var drawShapesExamples = [
    {
        input_url: "Cigarette_DS.jpg",
        shape: "cylinder",
        complexity: "whole",
        answer_image: "",
        baseURL: drawShapesBaseURL,
        answerURL: drawShapesBaseURL+"answers/cigarette.png",
    },
    {
        input_url: "crossant.png",
        shape: "other",
        complexity: "other",
        answer_image: "",
        baseURL: drawShapesBaseURL,
        answerURL: drawShapesBaseURL+"answers/crossant.png",
    },
    {
        input_url: "door.jpg",
        shape: "rectangle",
        complexity: "whole",
        answer_image: "",
        baseURL: drawShapesBaseURL,
        answerURL: drawShapesBaseURL+"answers/door.png",
    },
    {
        input_url: "house-from-premier-builders-in-carthage-mo-64836--home-builders-5.png",
        shape: "box",
        complexity: "part",
        answer_image: "",
        baseURL: drawShapesBaseURL,
        answerURL: drawShapesBaseURL+"answers/house.png",
    },
    {
        input_url: "mountain.jpg",
        shape: "other",
        complexity: "other",
        answer_image: "",
        baseURL: drawShapesBaseURL,
        answerURL: drawShapesBaseURL+"answers/mountain.png",
    },
    {
        input_url: "orange-02.jpg",
        shape: "sphere",
        complexity: "part",
        answer_image: "",
        baseURL: drawShapesBaseURL,
        answerURL: drawShapesBaseURL+"answers/orange.png",
    }, 
    {
        input_url: "orange-half.jpg",
        shape: "circle",
        complexity: "part",
        answer_image: "",
        baseURL: drawShapesBaseURL,
        answerURL: drawShapesBaseURL+"answers/orange-half.png",
    }, 
    {
        input_url: "wine-bottle.jpeg",
        shape: "cylinder",
        complexity: "whole or part",
        answer_image: "",
        baseURL: drawShapesBaseURL,
        answerURL: drawShapesBaseURL+"answers/bottle.png",
    },                
]


Template.drawShapeExercises.helpers({
    baseURL: function(){
        return baseURL+"drawShapes/"
    },
    exercises: function(){
        return drawShapesExamples
    } 
})

Template.drawShapeExercise.helpers({
    unique_id: function(){

        return this.input_url.replace(".","_")
    } 
})

Template.drawShapeExercise.onRendered(function() {
    //console.log("drawShapeExercise")
    var baseURL = this.data.baseURL
    var input_url = this.data.input_url
    var unique_id = input_url.replace(".","_")
    var canvas_id = "canvas_"+unique_id
    var url = baseURL + input_url 
    //console.log(baseURL+input_url)       
    var canvas = make_canvas_with_url_background(canvas_id, url)
})



var complexityFeedback = {
    "whole" : "<b>all of the object</b>",
    "part": "<b>most</b> of the object (but not all)",
    "other": "'(n/a)'",
    "select": "'(select)'"
}

var shapeFeedback = {
    
    "other": "'other'",
    "select": "'(select)'",
    "box" : "<b>box</b>",
    "rectangle": "<b>rectangle</b>",
    "sphere" : "<b>sphere</b>",
    "circle" : "<b>circle</b>",
    "cylinder" : "<b>cylinder</b>",
    
}


Template.drawShapeExercise.events({
    'click .submitExercise': function(event){
        //console.log("submitWholeOrPartExercise")
        var url = $(event.target).data("url")
        console.log(url)
        var answer_shape = $(event.target).data("shape")
        var answer_complexity = $(event.target).data("complexity")

        var select_shape_elt = $(event.target).siblings(".select_shape")[0]
        var select_complexity_elt = $(event.target).siblings(".select_complexity")[0]
        var selected_shape = $(select_shape_elt).val()
        var selected_complexity = $(select_complexity_elt).val()


        console.log("answers : "+answer_shape+" "+answer_complexity)
        console.log("selected: "+selected_shape+" "+selected_complexity)
        //show my answer

        //var answerDiv = $(event.target).siblings(".answer")[0]
        //$(select).show()

        //Drawing Feedback
        var answerDrawing = $(event.target).siblings(".answerDrawing")[0]
        $(answerDrawing).show()

        // Shape feedback        
        if(selected_shape == answer_shape){
            //Correct!
            var feedbackDivCorrect = $(event.target).siblings(".answerCorrectShape")[0]
            var feedbackDivIncorrect = $(event.target).siblings(".answerInCorrectShape")[0]


            //console.log(feedbackDivCorrect)
            //console.log(feedbackDivIncorrect)

            var message = shapeFeedback[answer_shape]

            $($(feedbackDivCorrect).children(".correctFeedback")[0]).html("This main shape is a "+message+".")

            $(feedbackDivCorrect).show()
            $(feedbackDivIncorrect).hide()
        }else{
            //Incorrect
            var feedbackDivIncorrect = $(event.target).siblings(".answerInCorrectShape")[0]
            var feedbackDivCorrect = $(event.target).siblings(".answerCorrectShape")[0]

            var message = shapeFeedback[answer_shape]
            var notMessage = shapeFeedback[selected_shape]

            $($(feedbackDivIncorrect).children(".incorrectFeedback")[0]).html("We think this shape is a "+message+", not "+notMessage+".")

            $(feedbackDivIncorrect).show()
            $(feedbackDivCorrect).hide()
        }
        


        //Coverage Feedback
        if(answer_shape == "other" ||answer_complexity == selected_complexity){
            //Correct!
            var feedbackDivCorrect = $(event.target).siblings(".answerCorrectComplexity")[0]
            var feedbackDivIncorrect = $(event.target).siblings(".answerInCorrectComplexity")[0]

            console.log(feedbackDivCorrect)
            console.log(feedbackDivIncorrect)

            var message = complexityFeedback[answer_complexity]

            $($(feedbackDivCorrect).children(".correctFeedback")[0]).html("This shape covers "+message+".")

            $(feedbackDivCorrect).show()
            $(feedbackDivIncorrect).hide()
        }else{
            //Incorrect
            var feedbackDivIncorrect = $(event.target).siblings(".answerInCorrectComplexity")[0]
            var feedbackDivCorrect = $(event.target).siblings(".answerCorrectComplexity")[0]

            var message = complexityFeedback[answer_complexity]
            var notMessage = complexityFeedback[selected_complexity]

            $($(feedbackDivIncorrect).children(".incorrectFeedback")[0]).html("We think this shape covers "+message+", not "+notMessage+".")

            $(feedbackDivIncorrect).show()
            $(feedbackDivCorrect).hide()
        }
        
        // 
    },
})


Template.drawShapeExercises.events({
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
        Router.go("instructionsBlendImages")
    },
})


        
