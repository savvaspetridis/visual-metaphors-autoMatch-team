import './canvas_helpers_for_meteor.js'
import './globals.js'

AutoForm.hooks({
  insertImages2: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        
        //var metaphorPair_id = Router.current().params.metaphorPair_id
        //doc.metaphorPair_id = metaphorPair_id 
        
        var concept = Router.current().params.concept2
        doc.concept = concept
        
        this.result(doc);
      }
    },

  }
});

Template.seeBrainstorm2.helpers({
    brainstorm_objects: function(){
        var concept = Router.current().params.concept2
        var brainstorm_objects = Brainstorm2.find({brainstorm_type:'object', concept:concept});
        return brainstorm_objects
    },
    brainstorm_activities: function(){
        var concept = Router.current().params.concept2
        var brainstorm_activities = Brainstorm2.find({brainstorm_type:'activity',concept:concept});
        return brainstorm_activities
    },
    brainstorm_people: function(){
        var concept = Router.current().params.concept2
        var brainstorm_people = Brainstorm2.find({brainstorm_type:'person',concept:concept});
        return brainstorm_people
    },
    brainstorm_settings: function(){
        var concept = Router.current().params.concept2
        var brainstorm_settings = Brainstorm2.find({brainstorm_type:'setting',concept:concept});
        return brainstorm_settings
    },
});

Template.insertImages2filter_header.helpers({
     concept2: function(){
        var concept = Router.current().params.concept2
        return concept
    },   
    count_images: function(){
        var concept = Router.current().params.concept2
        return Images2.find({concept:concept}).fetch().length
    },
})

Template.insertImages2filter_headerOnly.helpers({
     concept2: function(){
        var concept = Router.current().params.concept2
        return concept
    },   
})

Template.insertImages2filter.helpers({
  images2: function () {
    // TODO: ONLY GET IMAGES! FOR THIS metaphor pari
    var metaphorPair_id = Router.current().params.metaphorPair_id
    var concept = Router.current().params.concept2
    duplicates = Session.get('duplicates');
    to_delete = Session.get('delete');

    var duplicate_image_url = 0;
    if(duplicates != undefined && duplicates != 'none'){
        console.log(Images2.find({_id:duplicates}).fetch()[0])
        duplicate_image_url = Images2.find({_id:duplicates}).fetch()[0].url;
        Images2.insert({url:duplicate_image_url, concept:concept});
    }

    if(to_delete != undefined && to_delete != 'none'){
        Images2.remove({_id:to_delete});
    }

    images = Images2.find({concept: concept}, {sort: {timestamp: -1}});
    Session.set('duplicates','none');
    return images; 
  },  
});

Template.imageAnnotation2.helpers({
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
            return "<span class='needsEditing'>PLEASE EDIT</span>"
        }
    },
    getCoverageName: function(coverageValue){
        var match_obj = _.filter(coverageOptions, function(opt){ return opt.value == coverageValue})
        if(match_obj.length == 1){
            return "<b>"+match_obj[0].label+"</b>"
        } else {
            return "<span class='needsEditing'>PLEASE EDIT</span>"
        }
    },
})

Template.imageAnnotation2.events({
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
    'click .duplicateIt': function(event){
        var id = $(event.target).data("id")
        console.log(id)
        Session.set('duplicates',id);
   },
   'click .deleteIt': function(event){
        var id = $(event.target).data("id")
        console.log(id)
        Session.set('delete',id);
   },
})




Template.imageAnnotation2.onRendered(function() {
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


    canvas.on('object:modified', function(evt){
        //set the shape to this shape that is moved
        var shapeMoved = evt.target.type
        returnOtherShapeToDefaultPosition(canvas, shapeMoved)
        var modified_canvas_data = JSON.stringify(canvas) //JSON.stringify(evt.target.canvas)
        var drawnShape = getDrawnShapeFromCanvas(modified_canvas_data)                

        Meteor.call("save_canvas2", unique_id, modified_canvas_data, drawnShape, function (error) {
          if (error && error.error === "logged-out") {
            console.log(error)
          }
        });        
    }); 
});



