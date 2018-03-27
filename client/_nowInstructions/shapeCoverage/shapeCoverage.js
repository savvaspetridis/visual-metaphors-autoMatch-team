import '../globals.js'



var complexityExamples = [
    {
        url: "sphere-beachball.png",
        shape: "",
        wholeOrPart: "whole"
    },
    {
        url: "sphere-part-icecream.png",
        shape: "",
        wholeOrPart: "part"
    },
    ,
    {
        url: "sphere-part-teapot.png",
        shape: "",
        wholeOrPart: "part"
    },

 
    {
        url: "circle-part-sun.png",
        shape: "",
        wholeOrPart: "part"
    },
    {
        url: "circle-whole-orange.png",
        shape: "",
        wholeOrPart: "whole"
    },
       {
        url: "box-parts-present.png",
        shape: "",
        wholeOrPart: "part"
    },
    {
        url: "box-whole-lego.png",
        shape: "",
        wholeOrPart: "whole"
    },

    {
        url: "rect-part-teabag.png",
        shape: "",
        wholeOrPart: "part"
    },
    {
        url: "rect-whole-hersheys.png",
        shape: "",
        wholeOrPart: "whole"
    },
    {
        url: "rect-whole-iphone.png",
        shape: "",
        wholeOrPart: "whole"
    },


    {
        url: "cylinder-part-toiletpaper.png",
        shape: "",
        wholeOrPart: "part"
    },
    {
        url: "cylinder-parts-fireextinguisher.png",
        shape: "",
        wholeOrPart: "part"
    },
    {
        url: "cylinder-whole-sodacan.png",
        shape: "",
        wholeOrPart: "whole"
    },


    
]



var complexityFeedback = {
    "whole" : "<b>all of the object</b>",
    "part": "<b>most</b> of the object (but not all)",
    "other": "'other'",
    "select": "'(select)'"
}

Template.shapeCoverageIntro.helpers({  
    baseURL: function(){
        return baseURL+"shapeCoverage/"
    },

});

Template.shapeCoverageExercise.helpers({  
    baseURL: function(){
        return baseURL
    },
    examples: function(){
        return complexityExamples
    }
});

Template.shapeCoverageExercise.events({
    'click .submitWholeOrPartExercise': function(event){
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

            var message = complexityFeedback[answer]

            $($(feedbackDivCorrect).children(".correctFeedback")[0]).html("This shape covers "+message+".")

            $(feedbackDivCorrect).show()
            $(feedbackDivIncorrect).hide()
        }else{
            //Incorrect
            var feedbackDivIncorrect = $(event.target).siblings(".answerInCorrect")[0]
            var feedbackDivCorrect = $(event.target).siblings(".answerCorrect")[0]

            var message = complexityFeedback[answer]
            var notMessage = complexityFeedback[val]

            $($(feedbackDivIncorrect).children(".incorrectFeedback")[0]).html("We think this shape covers "+message+", not "+notMessage+".")

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
        Router.go("instructionsDrawShapes")
    },
})