import './canvas_helpers2.js'

var pairs = [
    /*
    // For testing purposes only
    {
        brand: "Legos",
        concept: "Imagination",
    }
    */

    {
        brand: "McDonalds",
        concept: "New Years (Holiday)",
    },
    {
        brand: "McDonalds",
        concept: "Halloween",
    },
    {
        brand: "McDonalds",
        concept: "Valentine's Day",
    },
    {
        brand: "TacoBell",
        concept: "New Years (Holiday)",
    },
    {
        brand: "TacoBell",
        concept: "Halloween",
    },
    {
        brand: "TacoBell",
        concept: "Valentine's Day",
    },
    {
        brand: "Starbucks",
        concept: "New Years (Holiday)",
    },
    {
        brand: "Starbucks",
        concept: "Halloween",
    },
    {
        brand: "Starbucks",
        concept: "Valentine's Day",
    },
    {
        brand: "Starbucks",
        concept: "Energy",
    },
    {
        brand: "Starbucks",
        concept: "Fashion",
    },

    {
        brand: "Legos",
        concept: "Imagination",
    },
    {
        brand: "orange",
        concept: "Summer (season)",
    },
    {
        brand: "orange",
        concept: "Healthy",
    },
    {
        brand: "orange",
        concept: "Energy",
    },
    {
        brand: "orange",
        concept: "Nature",
    },
    {
        brand: "Milk",
        concept: "Healthy",
    },
    {
        brand: "Milk",
        concept: "Energy",
    },
    {
        brand: "Milk",
        concept: "Nature",
    },
    {
        brand: "Nikon Camera",
        concept: "Fall (season)",
    },
    {
        brand: "Nikon Camera",
        concept: "Night",
    },
    {
        brand: "Nikon Camera",
        concept: "Summer (season)",
    },
    {
        brand: "Nikon Camera",
        concept: "Winter (season)",
    },
    {
        brand: "Nikon Camera",
        concept: "Spring (season)",
    },
    {
        brand: "Nikon Camera",
        concept: "Nature",
    },
    {
        brand: "Nikon Camera",
        concept: "Imagination",
    },
    {
        brand: "fitbit",
        concept: "Valentine's Day",
    },
    {
        brand: "fitbit",
        concept: "Healthy",
    },
    {
        brand: "fitbit",
        concept: "Energy",
    },
    {
        brand: "fitbit",
        concept: "Fashion",
    },
    {
        brand: "iPhone",
        concept: "Fashion",
    },
    {
        brand: "Lipstick",
        concept: "Valentine's Day",
    },
    {
        brand: "Lipstick",
        concept: "Nature",
    },
    {
        brand: "Lipstick",
        concept: "Fashion",
    },
    {
        brand: "Rubics cube",
        concept: "Imagination",
    },
    
    
]

var shapes = [
    "circle",
    "rectangle",
    "cylinder"
]

Template.registerHelper('selected', function(a, b) {
    return a == b ? 'selected' : 'false'; //This sshould be 'selected' : ' '; (not false, but '') HOWEVER. This give me a Meteor error, and this hack fixes it.
});

Template.makeBlendsForAllPairs.helpers({
    brandComplexity: function(){        
        return this.brandComplexity
    },
    conceptComplexity: function(){        
        return this.conceptComplexity
    },
    


    pair_data: function(){
        var brandComplexity = this.brandComplexity
        var conceptComplexity = this.conceptComplexity
        
        var pair_data = []
                
        _.each(pairs, function(pair){
            var brand = pair.brand
            var concept = pair.concept

            var this_pair_data = {
                    brand: brand,
                    concept: concept, 
                    pair_mixes: []      
                }
            _.each( shapes, function(shape){

                var pair_mixes = []
                var a_objects = BrandImageShapeCanvases.find({
                    brand: brand,
                    shape_classification: shape, 
                    wholeOrMain: brandComplexity,
                    $or: [{turk_data_votes: "5votes"}, {turk_data_votes: "4votes"}]
                }).fetch()

                var b_objects = ConceptImageShapeCanvases.find({
                    concept: concept,
                    shape_classification: shape, 
                    wholeOrMain: conceptComplexity,
                    $or: [{turk_data_votes: "5votes"}, {turk_data_votes: "4votes"}]
                }).fetch()
                
                
                _.each(a_objects, function(a_obj){
                    _.each(b_objects, function(b_obj){
                        var a_id = a_obj._id
                        var b_id = b_obj._id
                        var unique_id = a_id+"_"+b_id
                        
                        var mix = {a_object: a_obj, b_object: b_obj, unique_id: unique_id}

                        this_pair_data.pair_mixes.push(mix)

                    })                    
                })  
            })
            
            pair_data.push(this_pair_data)            
        })        
        return pair_data                               
    },    
})


/*
Template.makeBlendsForAllPairs.events({
    'click #displayBoth': function(){
        //$("#mixes").empty()
        var brandOrConcept_a = $("#selection1 .brandOrConcept :selected").val()
        var shape_a = $("#selection1 .shape :selected").val()
        var complexity_a = $("#selection1 .complexity :selected").val()   
        

        var brandOrConcept_b = $("#selection2 .brandOrConcept :selected").val()
        var shape_b = $("#selection2 .shape :selected").val()
        var complexity_b = $("#selection2 .complexity :selected").val()

        Session.set("search_parameters", {
            brandOrConcept_a: brandOrConcept_a,
            shape_a: shape_a,
            complexity_a: complexity_a,

            brandOrConcept_b: brandOrConcept_b,
            shape_b: shape_b,
            complexity_b: complexity_b
        }) 
        //console.log(Session.get("search_parameters"))   
    }
})
*/

Template.a_b_mix_canvases_for_all_pairs.events({
    'click .dontautoblend': function(){
        console.log("dontautoblend")
        console.log(this.data)

        //put_items_in_mixcanvas_no_autoblend = function(mix_canvas, canvas_a, canvas_b, shape_a, shape_b){

    },

})

Template.a_b_mix_canvases_for_all_pairs.onRendered(function() {
    //console.log("rendered ab mix canvas")
    //console.log(this.data['a_object']['url'])

    fabric.Object.prototype.transparentCorners = false; 

    var object_a_data = this.data['a_object']['canvas_data'] //BrandImageShapeCanvases.findOne()["canvas_data"]
    var object_b_data = this.data['b_object']['canvas_data'] //BrandImageShapeCanvases.findOne()["canvas_data"]
    
    var shape_a = this.data['a_object']['shape_classification']
    var shape_b = this.data['b_object']['shape_classification']

    var unique_id = this.data['unique_id']

    getRidOfNonUsedShape(object_a_data, shape_a)
    getRidOfNonUsedShape(object_b_data, shape_b)

    //Editing Canvas A
    var canvas_a = new fabric.Canvas('a_'+unique_id);
    var canvas_b = new fabric.Canvas('b_'+unique_id);
    var mix_canvas = new fabric.Canvas('mix_canvas_'+unique_id, {width: 400, height:500, preserveObjectStacking: true});  

    //var canvas_data_a = JSON 





    canvas_a.loadFromJSON(object_a_data, canvas_a.renderAll.bind(canvas_a), function(o_a, object_a) {});     
    canvas_b.loadFromJSON(object_b_data, canvas_b.renderAll.bind(canvas_b), function(o_b, object_b) {}); 

      
    //MIX CANVAS
                        
    

    if(shape_a == "rectangle" || shape_a == "cylinder"){
        shape_a = "rect"
    }
    if(shape_b == "rectangle" || shape_b == "cylinder"){
        shape_b = "rect"
    }
    
    init_overlap_items_in_mixcanvas(mix_canvas, object_a_data, object_b_data, shape_a, shape_b)
    

 
    canvas_a.on('object:modified', function(evt){
        update_overlap_items_in_mixcanvas(mix_canvas, canvas_a, canvas_b, shape_a, shape_b)
    });
    canvas_b.on('object:modified', function(evt){
        update_overlap_items_in_mixcanvas(mix_canvas, canvas_a, canvas_b, shape_a, shape_b)                
    });
    
    $("#dontautoblend_"+unique_id).click(function(){
        put_items_in_mixcanvas_no_autoblend(mix_canvas, canvas_a, canvas_b, shape_a, shape_b)
    })  

    
});






