//import './../globals.js'
import './images1-filter.js'
import './canvas_helpers_for_meteor.js'



var getImages2 = function(){
    // ONLY GET IMAGES! FOR THIS metaphor pari
    var metaphorPair_id = Router.current().params.metaphorPair_id
    var concept = Router.current().params.concept2

    var imageB_filters = Session.get("imageB_filters")
    var queryParams = {concept: concept}//{metaphorPair_id: metaphorPair_id}

    

    if (imageB_filters == undefined ){ // || imageB_filters == {} ....not sure I need the second condition
        //do nothing
        return Images2.find( queryParams );
    } else {
        var filter_complexity = imageB_filters["filterB_complexity"]
        if(filter_complexity == "Whole"){
            queryParams.complexity = "whole"
        }
        if(filter_complexity == "Part"){
            queryParams.complexity = "part"
        }
        if(filter_complexity == "(Whole + parts)"){
            //queryParams.complexity = "part"
        }


        var filter_shape = imageB_filters["filterB_shape"]
        if(filter_shape == "Circle"){
            queryParams.shape = "circle"
        }
        if(filter_shape == "Rectangle"){
            queryParams.shape = "rectangle"
        }
        if(filter_shape == "Cylinder"){
            queryParams.shape = "cylinder"
        }
        if(filter_shape == "(All Shapes)"){
            //queryParams.complexity = "part"
        }


        var filter_dimensionality = imageB_filters["filterB_dimensionality"]
        if(filter_dimensionality == "flat"){
            queryParams.dimensionality = "2D"
        }
        if(filter_dimensionality == "3-D"){
            queryParams.dimensionality = "3D"
        }
        if(filter_dimensionality == "(flat + 3-D)"){
            //queryParams.complexity = "part"
        }

    }

    return Images2.find( queryParams , {sort: {timestamp: -1}});
    //return Images1.find( queryParams );  
}


var getImages1 = function(){
    // TODO: ONLY GET IMAGES! FOR THIS metaphor pari
    var metaphorPair_id = Router.current().params.metaphorPair_id
    var concept = Router.current().params.concept1

    var imageA_filters = Session.get("imageA_filters")
    //var filter_option = Session.get("image1filter_option")
     var queryParams = {concept: concept}//{metaphorPair_id: metaphorPair_id}
    

    if (imageA_filters == undefined ){ // || imageA_filters == {} ....not sure I need the second condition
        //do nothing
        return Images1.find( queryParams );
    } else {
        var filterA_complexity = imageA_filters["filterA_complexity"]
        if(filterA_complexity == "Whole"){
            queryParams.complexity = "whole"
        }
        if(filterA_complexity == "Part"){
            queryParams.complexity = "part"
        }
        if(filterA_complexity == "(Whole + parts)"){
            //queryParams.complexity = "part"
        }


        var filterA_shape = imageA_filters["filterA_shape"]
        if(filterA_shape == "Circle"){
            queryParams.shape = "circle"
        }
        if(filterA_shape == "Rectangle"){
            queryParams.shape = "rectangle"
        }
        if(filterA_shape == "Cylinder"){
            queryParams.shape = "cylinder"
        }
        if(filterA_shape == "(All Shapes)"){
            //queryParams.complexity = "part"
        }


        var filterA_dimensionality = imageA_filters["filterA_dimensionality"]
        if(filterA_dimensionality == "flat"){
            queryParams.dimensionality = "2D"
        }
        if(filterA_dimensionality == "3-D"){
            queryParams.dimensionality = "3D"
        }
        if(filterA_dimensionality == "(flat + 3-D)"){
            //queryParams.complexity = "part"
        }

    }

    return Images1.find( queryParams , {sort: {timestamp: -1}});
}

Template.insertCombinePairs.helpers({   
    images1: function () {
        return getImages1()
    },

    count_images1: function(){
        return getImages1().fetch().length
    },

    isSelectedFilterA: function(filter, option){
        var imageA_filters = Session.get("imageA_filters")
        if(imageA_filters && imageA_filters[filter] == option){
            return "selected"
        }
        
    },



    images2: function () {
        return getImages2()
    },
    count_images2: function(){
        return getImages2().fetch().length
    },

    isSelectedFilterB: function(filter, option){
        var imageB_filters = Session.get("imageB_filters")
        if(imageB_filters && imageB_filters[filter] == option){
            return "selected"
        }        
    },



    isSelected1: function(id){
        //var image1_selected_obj = Session.get("image1_selected_obj")
        var image1_selected_obj_id = Session.get("image1_selected_obj_id")
        if (id == image1_selected_obj_id){
            return "selected"
        }
    },
    isSelected2: function(id){
        //var image2_selected_obj = Session.get("image2_selected_obj")
        var image2_selected_obj_id = Session.get("image2_selected_obj_id")
        if (id == image2_selected_obj_id){
            return "selected"
        }
    },
    
});

Template.insertCombinePairs.events({
    //these two events have to be mousedowns, not mouseups, because it's setting the image,
    //and after an object modified, event, we're going to set the image with that, and if this is a click event, it will 
    //set it back to the wrong thing    
    'mouseup .image1Container': function(event){
        //console.log(event)
        Session.set("image1_selected_obj_id", this._id)
        Session.set("image1_selected_obj_drawnShape", this.drawnShape)
        
        Session.set("image1_selected_obj", this.canvas_data)
        redoAllMixCanvases()

    },

    'change .filterA': function(event){
        var select_obj = $(event.target)
        var selection_id = select_obj.attr("id")
        var selection_option = select_obj.val()

        var filters = Session.get("imageA_filters")
        if (filters == undefined) { filters = {} }
        filters[selection_id] = selection_option

        Session.set("imageA_filters", filters)        
    },

    'change .filterB': function(event){
        var select_obj = $(event.target)
        var selection_id = select_obj.attr("id")
        var selection_option = select_obj.val()

        var filters = Session.get("imageB_filters")
        if (filters == undefined) { filters = {} }
        filters[selection_id] = selection_option

        Session.set("imageB_filters", filters)        
    },

    
})


Template.displayCanvas.onRendered(function() {
    //console.log(this.data)
    var canvas_data = this.data.canvas_data
    var unique_id = this.data._id

    var canvas_id = "canvas_"+unique_id

    var canvas = {}

    if(canvas_data){
        canvas = make_canvas_with_canvas_data(canvas_id, canvas_data)
    }else{
        var url = this.data.url        
        canvas = make_canvas_with_url_background(canvas_id, url)
        canvas_data = JSON.stringify(canvas)
        this.data.canvas_data = canvas_data
    }

    


    canvas.on('object:modified', function(evt){
        //console.log(evt)
        //evt.preventDefault()
        //set the shape to this shape that is moved
        
        var shapeMoved = evt.target.type
        returnOtherShapeToDefaultPosition(canvas, shapeMoved)
        //move the other shape back to it's default position.

        var modified_canvas_data = JSON.stringify(canvas)
        Session.set("image1_selected_obj", modified_canvas_data)
        

        var drawnShape = getDrawnShapeFromCanvas(modified_canvas_data)
        Session.set("image1_selected_obj_drawnShape", drawnShape)

        redoAllMixCanvases()

        Meteor.call("save_canvas", unique_id, modified_canvas_data, drawnShape, function (error) {
          //redoMixCanvas()
          if (error && error.error === "logged-out") {
            console.log(error)
          }
        });        
    }); 
});


Template.displayCanvas2.onRendered(function() {
    //console.log(this.data)
    var canvas_data = this.data.canvas_data
    var unique_id = this.data._id
    var canvas_id = "canvas_2_"+unique_id
    var canvas = {}

    if(canvas_data){
        canvas = make_canvas_with_canvas_data(canvas_id, canvas_data)
    }else{
        var url = this.data.url        
        canvas = make_canvas_with_url_background(canvas_id, url)
        canvas_data = JSON.stringify(canvas)
    }




    canvas.on('object:modified', function(evt){
        //set the shape to this shape that is moved
        var shapeMoved = evt.target.type
        returnOtherShapeToDefaultPosition(canvas, shapeMoved)
        var modified_canvas_data = JSON.stringify(canvas) //JSON.stringify(evt.target.canvas)
        var drawnShape = getDrawnShapeFromCanvas(modified_canvas_data)        
        
        Meteor.call("save_canvas2", unique_id, modified_canvas_data, drawnShape, function (error) {
          if (error && error.error === "logged-out") {
            console.log(error)
          } else {
            redoMixCanvas(unique_id)
          }
        });        
    }); 




});

Template.mixCanvas.onRendered(function() {
    var canvas_data = this.data.canvas_data //this is data from Image2, not the mix canvas, it's just the default data.
    
    var unique_id = this.data._id
    var mix_canvas_id = "mix_canvas_"+unique_id
    $("#my_mix_canvas_container_"+unique_id).append('<canvas id="'+mix_canvas_id+'" class="editingCanvas" height="400" width="300"></canvas>')
        
    var canvas = {}

    if(canvas_data){
        canvas = make_canvas_with_canvas_data(mix_canvas_id, canvas_data)        
    }else{
        var url = this.data.url        
        canvas = make_canvas_with_url_background(mix_canvas_id, url)
    }
    //this.data.canvas_obj = canvas //this canvas object gets reset by the redoAllMixes
    //this.canvas_obj = canvas
    


    // add onclick save handler here.
    console.log("disable: "+unique_id)
    $("#saveMixCanvas_"+unique_id).attr('disabled','disabled')
    /*

    $("#saveMixCanvas_"+unique_id).click(function(){
        alert("Oops! You can't save yet, there isn't an image selected from the left column.")
    })
    */
    



    
});






redoAllMixCanvases = function(){
    Session.set("mix_canvases", {}) 

    var image1selected = Session.get("image1_selected_obj")
    var image1_selected_obj_drawnShape = Session.get("image1_selected_obj_drawnShape")

    if(image1selected){
        var images2 = getImages2().fetch()
        _.each(images2, function(image2){
            var image2_id = image2._id
            redoMixCanvas(image2_id)
        })
    }else {
        console.log("need and A image to be selected")
    }
}


redoMixCanvas = function(image2_id){
    //console.log("redoMix image2_id: "+image2_id)
    console.log("redo Mix Canvas")
    var image2_obj = Images2.findOne(image2_id)
    
    var image1selected = Session.get("image1_selected_obj")
    var image2selected = image2_obj.canvas_data//Session.get("image2_selected_obj") // I should get this a different way...

    var image1_selected_obj_drawnShape = Session.get("image1_selected_obj_drawnShape")
    var image2_selected_obj_drawnShape = image2_obj.drawnShape || getDrawnShapeFromCanvas(image2selected) //Session.get("image2_selected_obj_drawnShape")
    
    if(image1selected ){ //&& image2selected
        var mix_canvas_id = "mix_canvas_"+image2_id

        $("#my_mix_canvas_container_"+image2_id).empty()
        $("#my_mix_canvas_container_"+image2_id).append('<canvas id="'+mix_canvas_id+'"  class="editingCanvas" height="400" width="300"></canvas>')
        //var canvas_id = "mix_canvas"
        var mix_canvas = new fabric.Canvas(mix_canvas_id, {width: 300, height:400});

        var mix_canvases_array = Session.get("mix_canvases") 

        if(image1selected && image2selected){

            var object_a_data = JSON.parse(image1selected)//.canvas_data)
            var object_b_data = JSON.parse(image2selected)//.canvas_data)


            var shape_a = image1_selected_obj_drawnShape //"circle" //image1selected["drawnShape"]
            var shape_b = image2_selected_obj_drawnShape // "circle" //image2selected["drawnShape"]
            //console.log(image1_selected_obj_drawnShape)

            
            getRidOfNonUsedShape(object_a_data, shape_a)
            getRidOfNonUsedShape(object_b_data, shape_b)

            


            //var rtn_mix_canvas = 
            init_overlap_items_in_mixcanvas(mix_canvas, object_a_data, object_b_data, shape_a, shape_b)  
            
            $("#saveMixCanvas_"+image2_id).removeAttr('disabled');
            $("#saveMixCanvas_"+image2_id).unbind( "click" )

            $("#saveMixCanvas_"+image2_id).click(function(){

                var image1_id = Session.get("image1_selected_obj_id")
                var concept1 = Router.current().params.concept1
                var concept2 = Router.current().params.concept2
                save_mix_canvas(mix_canvas, concept1, concept2, image1_id, image2_id)
            })
        }
        


    } else {
        console.log("need and A and B image to be selected")
        //console.log(image1selected)
        //console.log(image2selected)
    }
}



