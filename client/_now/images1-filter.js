import './canvas_helpers_for_meteor.js'
import './globals.js'



AutoForm.hooks({
  insertImages1: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        var concept = Router.current().params.concept1
        doc.concept = concept 
        this.result(doc);
      }
    },
  },
});



Template.insertImages1filter.helpers({
  images1: function () {
    // TODO: ONLY GET IMAGES! FOR THIS metaphor pari
    var metaphorPair_id = Router.current().params.metaphorPair_id
    var concept = Router.current().params.concept1
    
    //console.log("metaphorPair_id: "+metaphorPair_id)
    return Images1.find({
        concept:concept
        //metaphorPair_id: metaphorPair_id, 
        //createdBy: Meteor.userId()
    }, 
    {sort: {timestamp: -1}}                       
    );
  },  
});


Template.insertImages1filter_header.helpers({
     concept: function(){
        var concept = Router.current().params.concept1
        return concept
    },   
})

Template.insertImages1filter_headerOnly.helpers({
     concept: function(){
        var concept = Router.current().params.concept1
        return concept
    },   
})

Template.insertImages1filter_headerOnly.events({
    'click .instructions': function(){
        //console.log(window.location.href)
        window.open(window.location.host+"/instructions/shapeCoverage", '_blank');
    }
})

Template.imageAnnotation.helpers({


    makeUniqueID: function () {
      return "update-each-" + this._id;
    },   
    coverageOptions: function(){
        return coverageOptions       
    }, 
    shapeOptions: function(){
        return shapeOptions       
    },
    getShapeName: function(shapeValue){
        var match_obj = _.filter(shapeOptions, function(opt){ return opt.value == shapeValue})
        if(match_obj.length == 1){
            return "<b>"+match_obj[0].label+"</b>"
        } else {
            return "<span class='alert'>PLEASE EDIT</span>"
        }
    },
    getCoverageName: function(coverageValue){
        var match_obj = _.filter(coverageOptions, function(opt){ return opt.value == coverageValue})
        if(match_obj.length == 1){
            return "<b>"+match_obj[0].label+"</b>"
        } else {
            return "<span class='alert'>PLEASE EDIT</span>"
        }
    }, 
})

Template.imageAnnotation.events({
   'click .submitedit': function(event){
        //console.log(event.target)
        var id = $(event.target).data("id")
        $("#update_"+id).hide()
        $("#edit_"+id).show()

   },
    'click .edit': function(event){
        //console.log(event.target)
        var id = $(event.target).data("id")
        $("#update_"+id).show()
        $("#edit_"+id).hide()

   },
})




Template.imageAnnotation.onRendered(function() {
    //console.log(this.data.url)
    var canvas_data = this.data.canvas_data
    var unique_id = this.data._id
    var canvas_id = "canvas_"+unique_id

    var canvas = {}
    //console.log(canvas_data)
    //console.log(canvas_id)

    if(canvas_data){
        canvas = make_canvas_with_canvas_data(canvas_id, canvas_data)
    }else{
        var url = this.data.url        
        canvas = make_canvas_with_url_background(canvas_id, url)
    }

    
    /*
    $("#saveCanvas_"+unique_id).click(function(){
        var canvas_data = JSON.stringify(canvas)
        Meteor.call("save_canvas", unique_id, canvas_data, function (error) {
          if (error && error.error === "logged-out") {
            console.log(error)
          }
        });
    }) 
    */


    canvas.on('object:modified', function(evt){
        var shapeMoved = evt.target.type
        returnOtherShapeToDefaultPosition(canvas, shapeMoved)
        var modified_canvas_data = JSON.stringify(canvas) //JSON.stringify(evt.target.canvas)
        var drawnShape = getDrawnShapeFromCanvas(modified_canvas_data)                

        Meteor.call("save_canvas", unique_id, modified_canvas_data, drawnShape, function (error) {
          if (error && error.error === "logged-out") {
            console.log(error)
          }
        });        
    }); 
});



