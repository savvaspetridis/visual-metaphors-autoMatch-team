
make_canvas_with_canvas_data = function(canvas_id, canvas_data){    
    var canvas = new fabric.Canvas(canvas_id, {width: 300, height:400});
    canvas.loadFromJSON(canvas_data, canvas.renderAll.bind(canvas), function(o, object) {});
    return canvas
}





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





returnOtherShapeToDefaultPosition = function(canvas, shapeMoved){
    var shapeToReposition = ""
    if (shapeMoved == "circle"){
        shapeToReposition = "rect"
    } else if (shapeMoved == "rect"){
        shapeToReposition = "circle"
    } else {
        //there is nothing to move
        return
    }

    if(shapeToReposition == "rect"){
        var shapeObject = canvas["_objects"].filter(function(o){
          return o.type == shapeToReposition
        })
        if(shapeObject.length == 1){
            shapeObject[0].width = 80
            shapeObject[0].height = 60
            shapeObject[0].left = 150
            shapeObject[0].top = 20
            shapeObject[0].angle = 0
            shapeObject[0].scaleX = 1
            shapeObject[0].scaleY = 1
            //shapeObject[0].selectable = true ,index: 1})
            shapeObject[0].setCoords()
        }
    }
    if(shapeToReposition == "circle"){
        var shapeObject = canvas["_objects"].filter(function(o){
          return o.type == shapeToReposition
        })
        if(shapeObject.length == 1){
            //shapeObject[0].set({radius: 40, fill: 'rgba(255,0,0,.5)', left: 30, top: 10, selectable: true, index: 1})
            shapeObject[0].radius = 40
            shapeObject[0].left = 30
            shapeObject[0].top = 10
            shapeObject[0].angle = 0
            shapeObject[0].scaleX = 1
            shapeObject[0].scaleY = 1
            shapeObject[0].setCoords()
        }
    }
    canvas.renderAll()


}


var isDefaultCircle  = function(object){
    if (object.radius == 40
        && object.left == 30
        && object.top == 10
        && object.scaleX == 1
        && object.scaleY == 1){
        return true
    }else{
        return false
    }
}

var isDefaultRect  = function(object){
    if (object.width == 80
        && object.height == 60
        && object.left == 150
        && object.top == 20
        && object.scaleX == 1
        && object.scaleY == 1){
        return true
    }else{
        return false
    }
}


getDrawnShapeFromCanvas = function(modified_canvas_data){
    var canvas_data = JSON.parse(modified_canvas_data)
    var objects = canvas_data["objects"]
    
    for(i in objects){
        //console.log(o)
        var object = objects[i]
        if(object.type == "circle"){
            //if the shape is NOT the defualt, then it is the selected
            if(! isDefaultCircle(object)){
                return "circle"  
            }
        }
        if(object.type == "rect"){
            if(!isDefaultRect(object)){
                return "rect"
                
            }           
        }
    }

    //
    return undefined
    console.log("getDrawnShapeFromCanvas undefined")


}

reverse_image = function(mix_canvas, concept1, concept2, image1_id, image2_id){
        var image1_canvas_data = Images1.findOne(image1_id).canvas_data 
        var image1_drawnShape =  getDrawnShapeFromCanvas(image1_canvas_data)  //Session.get("image1_selected_obj_drawnShape")        
        

        //imageB obj id
        
        //var image2_id = image2_id
        var image2_canvas_data = Images2.findOne(image2_id).canvas_data
        console.log(image2_canvas_data)
        var image2_drawnShape = getDrawnShapeFromCanvas(image2_canvas_data)  

}


save_mix_canvas = function(mix_canvas, concept1, concept2, image1_id, image2_id){
        //console.log('427 save mix canvas')
        var metaphorPair_id = Router.current().params.metaphorPair_id
        //var concept1 = Router.current().params.concept1
        //var concept2 = Router.current().params.concept2


        // need to save 
        // imageA db object or id (the name of the object?) - what if it disappears?
        // imageA canvas data 
        //var image1_id = Session.get("image1_selected_obj_id")
         var image1_canvas_data = Images1.findOne(image1_id).canvas_data 
        var image1_drawnShape =  getDrawnShapeFromCanvas(image1_canvas_data)  //Session.get("image1_selected_obj_drawnShape")        
        

        //imageB obj id
        
        //var image2_id = image2_id
        var image2_canvas_data = Images2.findOne(image2_id).canvas_data
        var image2_drawnShape = getDrawnShapeFromCanvas(image2_canvas_data)  

        


        var mix_canvas_clone = JSON.parse(JSON.stringify(mix_canvas))
        if(mix_canvas_clone.objects){
            _.each(mix_canvas_clone.objects, function(obj){
                //console.log('del')
                delete obj["clipTo"]
            })
        }
        
        var mix_canvas_obj = JSON.stringify(mix_canvas_clone)
        
        Meteor.call("save_mix_canvas", metaphorPair_id, concept1, concept2, image1_id, image1_drawnShape, image1_canvas_data, image2_id, image2_drawnShape, image2_canvas_data, mix_canvas_obj, function (error) {
          if (error && error.error === "logged-out") {
            console.log(error)
          }
        });

}

