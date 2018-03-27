import './../globals.js'
import './../../_now/canvas_helpers_for_meteor.js'
import './../../_now/canvas_helpers2.js'



var blendImagesBaseURL = baseURL+"blendImages/"

Template.blendImagesIntro.helpers({
    baseURL: function(){
        return blendImagesBaseURL
    },
})



var blendImagesExamples = [
    {
        a_input_url: "tabasco.jpg", 
        b_input_url: "fire_extinguisher.jpg",
        shape: "cylinder",
        drawnShape: "rect",
        answer_image: "tabasco_blend.png",
        baseURL: blendImagesBaseURL+"exercises/",
        answerURL: blendImagesBaseURL+"exercises/answers/",
    },
    {
        a_input_url: "orange.jpg", 
        b_input_url: "teapot.jpeg",
        shape: "sphere",
        drawnShape: "circle",
        answer_image: "orange_blend.png",
        baseURL: blendImagesBaseURL+"exercises/",
        answerURL: blendImagesBaseURL+"exercises/answers/",
    },
    {
        a_input_url: "world.png", 
        b_input_url: "icecream_cone.jpg",
        shape: "sphere",
        drawnShape: "circle",
        answer_image: "world_blend.png",
        baseURL: blendImagesBaseURL+"exercises/",
        answerURL: blendImagesBaseURL+"exercises/answers/",
    },
    {
        a_input_url: "lightswitch.jpeg",
        b_input_url: "iphone.jpg", 
        shape: "rectangle (flat)",
        drawnShape: "rect",
        answer_image: "light_blend.png",
        baseURL: blendImagesBaseURL+"exercises/",
        answerURL: blendImagesBaseURL+"exercises/answers/",
    },
               
]


Template.blendImagesExercises.helpers({
    baseURL: function(){
        return baseURL+"drawShapes/"
    },
    exercises: function(){
        return blendImagesExamples
    } 
})

Template.blendImagesExercise.helpers({
    unique_id: function(){
        return this.a_input_url.replace(".","_")
    } 
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


Template.blendImagesExercise.events({
    'click .submitExercise': function(event){
        console.log("submitExercise")
        //var url = $(event.target)        
        console.log($(event.target))
        $($(event.target).siblings(".answerBlend")[0]).show()

           // $(feedbackDivCorrect).show()


    },
})

Template.blendImagesExercises.events({
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
        Router.go("home")
    },
})


Template.blendImagesExercise.onRendered(function() {

    //var unique_id = "asdf"

    //Editing Canvas A
    var baseURL = this.data.baseURL
    var url1 = baseURL + this.data['a_input_url'] //"asdf"
    var url2 = baseURL + this.data['b_input_url']

    var unique_id = this.data['a_input_url'].replace(".","_")
    
    var canvas_a = make_canvas_with_url_background('a_'+unique_id, url1) // new fabric.Canvas('a_'+unique_id);
    var canvas_b = make_canvas_with_url_background('b_'+unique_id, url2) // new fabric.Canvas('b_'+unique_id);
    var mix_canvas = new fabric.Canvas('mix_canvas_'+unique_id, {width: 300, height:400, preserveObjectStacking: true});  

    //init_overlap_items_in_mixcanvas(mix_canvas, object_a_data, object_b_data, shape_a, shape_b)
    //var canvas_a = JSON.parse(JSON.stringify(canvas_a))
    //var canvas_b = JSON.parse(JSON.stringify(canvas_b))

    var shape_a = this.data['drawnShape']
    var shape_b = this.data['drawnShape']

    
    canvas_a.on('object:modified', function(evt){
        console.log("canvas a modified")
        //var canvas_a_json = JSON.parse(JSON.stringify(canvas_b))
        //var canvas_b_json = JSON.parse(JSON.stringify(canvas_b))
        update_overlap_items_in_mixcanvas(mix_canvas, canvas_a, canvas_b, shape_a, shape_b, 1) // 1 = opacity_a
    });
    canvas_b.on('object:modified', function(evt){
        console.log("canvas b modified")

        update_overlap_items_in_mixcanvas(mix_canvas, canvas_a, canvas_b, shape_a, shape_b, 1)  // 1 = opacity_a               
    });
    
 
    
});
        
