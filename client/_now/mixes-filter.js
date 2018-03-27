//import './../globals.js'
//import './taskOrder.js'

Template.insertMixesFilter.helpers({
  metaphorPair: function(){
    var metaphorPair_id = Router.current().params.metaphorPair_id
    return MetaphorPairs.findOne(metaphorPair_id)
  },

  mixes: function () {
    // TODO: ONLY GET IMAGES! FOR THIS metaphor pari
    var metaphorPair_id = Router.current().params.metaphorPair_id
    var concept1 = Router.current().params.concept1
    var concept2 = Router.current().params.concept2

    return MixCanvases.find({
        //metaphorPair_id: metaphorPair_id, 
        concept1: concept1,
        concept2: concept2
        //createdBy: Meteor.userId()
    }, 
    {sort: {timestamp: -1}}                       
    );
  },  
});

Template.mixAnnotation.helpers({
    makeUniqueID: function () {
      return "update-each-" + this._id;
    },    
})

Template.mixAnnotation.events({
   
})




Template.mixAnnotation.onRendered(function() {
    //console.log(this.data.url)
    var mix_canvas_data = this.data.mix_canvas_obj
    var unique_id = this.data._id
    var canvas_id = "canvas_"+unique_id


    var image1_canvas_data = JSON.parse(this.data.image1_canvas_data)
    var image1_drawnShape = this.data.image1_drawnShape

    var image2_canvas_data = JSON.parse(this.data.image2_canvas_data)
    var image2_drawnShape = this.data.image2_drawnShape

    var canvas = {}

    
    var mix_canvas_obj = JSON.parse(mix_canvas_data)
    console.log(mix_canvas_obj)
    var mix_canvas_imageA_obj = _.filter(mix_canvas_obj.objects, function(mix_obj){
        return mix_obj.src == image1_canvas_data.backgroundImage["src"] //image1_canvas_data
    })

    

    
    if(mix_canvas_data){
        canvas = make_canvas_with_canvas_data_add_clip_to(canvas_id, mix_canvas_data, mix_canvas_imageA_obj, image1_canvas_data, image1_drawnShape, image2_canvas_data, image2_drawnShape)
    }else{
        console.log("no canvas data :(")
    }   
    /*
    canvas.on('object:modified', function(evt){
        var canvas_data = JSON.stringify(canvas)
        Meteor.call("save_canvas", unique_id, canvas_data, function (error) {
          if (error && error.error === "logged-out") {
            console.log(error)
          }
        });        
    }); 
    */
});




make_canvas_with_canvas_data_add_clip_to = function(canvas_id, canvas_data, mix_canvas_imageA_obj, image1_canvas_data, image1_drawnShape, image2_canvas_data, image2_drawnShape){    
    
    // imageParamters["clipTo"] =  cropImageA("whole", enlivened_shape_data_a, mixCanvas, shape_a, object_data_a)

    var mix_canvas = new fabric.Canvas(canvas_id, {width: 300, height:400});

    var canvas_obj = JSON.parse(canvas_data)

    initImageBToMixCanvas(mix_canvas, image2_canvas_data, image2_drawnShape)

    getRidOfNonUsedShape(image1_canvas_data, image1_drawnShape)
    getRidOfNonUsedShape(image2_canvas_data, image2_drawnShape)
       
      
    var canvas_a_objects = image1_canvas_data.objects 
    var canvas_b_objects = image2_canvas_data.objects 
    


    fabric.util.enlivenObjects(canvas_a_objects, function(objects) {
        objects.forEach(function(enlivened_shape_data_a) {
             
             mix_canvas_imageA_obj["clipTo"] =  cropImageA("whole", enlivened_shape_data_a, mix_canvas, image1_drawnShape, image1_canvas_data)
console.log(mix_canvas_imageA_obj["clipTo"] )

                fabric.util.enlivenObjects(mix_canvas_imageA_obj, function(objects) {
                    //objects["clipTo"] =  cropImageA("whole", enlivened_shape_data_a, mix_canvas, image1_drawnShape, image1_canvas_data)
                  //var origRenderOnAddRemove = canvas.renderOnAddRemove;
                  //canvas.renderOnAddRemove = false;

                  objects.forEach(function(o) {
                    o["clipTo"] =  cropImageA("whole", enlivened_shape_data_a, mix_canvas, image1_drawnShape, image1_canvas_data)
                    mix_canvas.add(o);
                  });

                  //canvas.renderOnAddRemove = origRenderOnAddRemove;
                  mix_canvas.renderAll();
                });  
        })
    });


   
    




    //canvas.loadFromJSON(canvas_data, canvas.renderAll.bind(canvas), function(o, object) {});
    //return canvas
}



/*

make_canvas_with_url_background = function(canvas_id, url){
    var canvas = new fabric.Canvas(canvas_id, {width: 300, height:400});

    fabric.Object.prototype.transparentCorners = false;
    var canvas_h = 300
    var canvas_w = 300

    //let canvas = new fabric.Canvas('myCanvas');

    var f_img = fabric.Image.fromURL(url, function(img) {
        //rescale image
        var img_w = img.width
        var img_h = img.height

        var scaleFactor = 1
        if (img_h > img_w){
            //rescale based on height
            if ( img_h < 300){
                //do nothing
                //the image fits, keep it the same size                
            }else{
                //scale height and width based on height
                scaleFactor = canvas_h/img_h
            }
        }else {
            //rescale based on width
            if ( img_w < 300){
                //do nothing
                //the image fits, keep it the same size                
            }else{
                //scale height and width based on height
                scaleFactor = canvas_w/img_w
            }
        }


        img.set({ left: 0, top: 100,  selectable: false }).scale(scaleFactor);
        //console.log(img.width)
        //canvasObj.add(oImg).renderAll();
        canvas.setBackgroundImage(img);
        canvas.renderAll();
    });




    let circle = new fabric.Circle({radius: 40, fill: 'rgba(255,0,0,.5)', left: 30, top: 10, });
    canvas.add(circle); 

    let rect = new fabric.Rect({
        width: 80, height: 60, left: 150, top: 20, angle: 0,
        fill: 'rgba(0,200,0,0.5)'
    });
    canvas.add(rect); 
    canvas.renderAll();

    return canvas
    
}
*/