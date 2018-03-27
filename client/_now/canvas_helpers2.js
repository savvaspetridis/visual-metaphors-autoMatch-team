rectShapes = ["rectangle", "box", "cylinder", "rect"] 
circleShapes = ["circle", "sphere"] 

flatShape = function(shape){
    if(_.indexOf(rectShapes, shape) > -1){
        return "rectangle"
    }else if(_.indexOf(circleShapes, shape) > -1){
        return "circle"
    }else{
        return undefined
    }

}

fabricjsShape = function(shapeLabel){
    if(_.indexOf(rectShapes, shapeLabel) > -1){
        return "rect" 
    }else if(_.indexOf(circleShapes, shapeLabel) > -1){
        return "circle"
    }else{
        return undefined
    }   
}

fabric.Canvas.prototype.getItemByAttr = function(attr, name) {
    var object = null,
    objects = this.getObjects();
    for (var i = 0, len = this.size(); i < len; i++) {
        if (objects[i][attr] && objects[i][attr] === name) {
            object = objects[i];
            break;
        }
    }
    return object;
};




//For the initial overlap, I can't use what's on the A and B canvas, I have to revive from the JSON and use fabric.js's enliven function.
init_overlap_items_in_mixcanvas = function(mix_canvas, object_a_data, object_b_data, shape_a, shape_b){
    mix_canvas.clear()

    var shape_a = flatShape(shape_a)
    var shape_b = flatShape(shape_b)

    initImageBToMixCanvas(mix_canvas, object_b_data, shape_b)
        
    var canvas_a_objects = object_a_data.objects 
    var canvas_b_objects = object_b_data.objects 
    
    fabric.util.enlivenObjects(canvas_a_objects, function(objects) {
      objects.forEach(function(enlivened_shape_data_a) { 
            
            fabric.util.enlivenObjects(canvas_b_objects, function(objects) {
                objects.forEach(function(enlivened_shape_data_b) {
                    initImageAToMixCanvas(object_a_data, object_b_data, enlivened_shape_data_a, enlivened_shape_data_b, shape_a, shape_b, mix_canvas)   
                })
            });

      });

    });
    //mix_canvas.renderAll()
    return mix_canvas
}


//for updates todo with the user changing the masks on the canvas, I have to get the updates from the A and B canvases, not enliven objects in the DB (those are now stale)
update_overlap_items_in_mixcanvas = function(mix_canvas, canvas_a, canvas_b, shape_a, shape_b, opacity_a){
     var shape_a = fabricjsShape(flatShape(shape_a))
    var shape_b = fabricjsShape(flatShape(shape_b))

    mix_canvas.clear()
    //console.log(mix_canvas)
    //console.log(canvas_b)
    initImageBToMixCanvas(mix_canvas, canvas_b, shape_b)
       
    //this will return the one desired shape (circle or rect) on the canvas that we need.    
    var canvas_a_objects = getShape(canvas_a, shape_a) // object_a_data.objects 
    var canvas_b_objects = getShape(canvas_b, shape_b) //object_b_data.objects  

    initImageAToMixCanvas(canvas_a, canvas_b, canvas_a_objects, canvas_b_objects, shape_a, shape_b, mix_canvas, opacity_a)   

}





getRidOfNonUsedShape = function(object, shapeToKeep){
    if(shapeToKeep == "circle" || shapeToKeep=="sphere"){
        //delete the rectangle
        var filteredObjects0 = object["objects"].filter(function(o){
          return o.type == "circle"
        })
        object["objects"] = filteredObjects0
    }
    if(shapeToKeep == "rect" || shapeToKeep == "rectangle" || shapeToKeep == "box" || shapeToKeep == "cylinder" ){
        //delete the rectangle
        var filteredObjects0 = object["objects"].filter(function(o){
          return o.type == "rect"
        })
        object["objects"] = filteredObjects0
    }
}



initImageBToMixCanvas = function(mixCanvas, object_data, shape){
    //console.log("initImageBToMixCanvas")
    var imageA_original = object_data['backgroundImage']
    //console.log(imageA_original)
    var url = imageA_original["src"] ||  imageA_original["_element"]["currentSrc"]
    var scaleX = imageA_original.scaleX
    var scaleY = imageA_original.scaleY
    var left = imageA_original.left
    var top = imageA_original.top

    //console.log(object_data)

    //INIT IMAGE
    var imageParamters = { 
            _id: "part",
            opacity: 1, //.7,

            scaleX: scaleX,
            scaleY: scaleY,

            left: left,
            top: top,
            selectable: false,
            hasControls: false,
        }

    var f_img = new fabric.Image.fromURL(url, function(img) {
        img.set(imageParamters)
        //img.moveTo(0) 
        //Add Image to Canvas
        mixCanvas.add(img)//.setActiveObject(img); 
        img.moveTo(0) 
    }) 
    
 
}

var calculate_new_angle = function(phi_of_b, phi_of_a, handle_location_a, a_classification){
    var new_angle = 0;
    if(a_classification != 'long_handle~angled_hotdog' && a_classification != 'short_handle~angled_hotdog'){
        if(handle_location_a == 'short'){
            if(phi_of_b <= 269){
                new_angle = phi_of_b + 90;
            }
            else{
                var remaining = 360 - phi_of_b;
                new_angle = 90 - remaining;
            }
        }
        else{
            new_angle = phi_of_b;
        }
    }
    else{
        if(a_classification == 'long_handle~angled_hotdog'){
            new_angle = phi_of_b + (360 - phi_of_a);
        }
        if(a_classification == 'short_handle~angled_hotdog'){
            if(phi_of_b <= 269){
                new_angle = phi_of_b + 90;
            }
            else{
                var remaining = 360 - phi_of_b;
                new_angle = 90 - remaining;
            }
            new_angle = phi_of_b + (360 - phi_of_a);
        }
    }
    return new_angle;
}

var get_right_objects = function(a, b, a_, b_){
    var obd_a = 0;
    var obd_b = 0;
    if(a == undefined){
        obd_a = a_;
    }
    else{
        obd_a = a;
    }
    if(b == undefined){
        obd_b = b_;
    }
    else{
        obd_b = b;
    }
    return [obd_a, obd_b];
}

initImageAToMixCanvas = function( object_data_a, object_data_b, enlivened_shape_data_a, enlivened_shape_data_b, shape_a, shape_b, mixCanvas, opacity ){    
    var imageA_original = object_data_a['backgroundImage'] 
    var url = imageA_original["src"] ||  imageA_original["_element"]["currentSrc"]
    var scaleX = imageA_original.scaleX
    var scaleY = imageA_original.scaleY
    var left = imageA_original.left
    var top = imageA_original.top
    clip_to =  cropImageA("whole", enlivened_shape_data_a, mixCanvas, shape_a, object_data_a);

    obj_arr = get_right_objects(object_data_a.objects, object_data_b.objects, object_data_a._objects, object_data_b._objects); 
    var obd_a = obj_arr[0];
    var obd_b = obj_arr[1];

    // Get necesry data for angle calculation
    var phi_of_a = obd_a[0].phi; 
    var a_classification = obd_a[0].classification;
    var handle_location_a = obd_a[0].handle_location; 
    var phi_of_b = obd_b[0].phi;
    var handle_location_b = obd_b[0].handle_location; 
    var b_classification = obd_b[0].classification;

    // ROTATE A to B's Phi Angle, then perform necessary transformation from Phi to Theta (depending on case)
    var new_angle = calculate_new_angle(phi_of_b, phi_of_a, handle_location_a, a_classification);
    var imageParamters = scaleAndTranslateImageAonMixCanvas(object_data_a, object_data_b, enlivened_shape_data_a, enlivened_shape_data_b, mixCanvas, shape_a, shape_b, opacity, new_angle);
    imageParamters['clipTo'] = clip_to;

    var f_img = new fabric.Image.fromURL(url, function(img) {
        img.set(imageParamters);

        mixCanvas.add(img)//.setActiveObject(img); 
        //mixCanvas.discardActiveObject()
        //make sure this image is set on top in the mix canvas
        img.moveTo(1) 
    })     

}

cropImageA = function(wholeOrPart, enlivened_shape_data, mixCanvas,  shape, object_data){
        shape = fabricjsShape(shape)
        //console.log("crop: "+shape)
        var circle = enlivened_shape_data
        if(!circle){
            return
        }

        
        // Step 1. Get Cirle information from the the A canvas
        var shape_height = circle['height']
        var shape_width = circle['width']

        var shape_scaleX = circle['scaleX']
        var shape_scaleY = circle['scaleY']

        //find the shape radii
        var shape_radiusX = (shape_width/2)*shape_scaleX
        var shape_radiusY = (shape_height/2)*shape_scaleY

        var shape_angle = circle['angle']
        
        var shape_centerPoint = circle.getCenterPoint()
        var shape_centerX = shape_centerPoint['x'] //this is w.r.t the canvas
        var shape_centerY = shape_centerPoint['y']

        
        
        

        //Transformations to scale the ellipse to the mixCanvas          

        //Given the x, y coordinates of the shape center on the editing Canvas, I need to know the x,y position of the center 
        // of the circle WITH RESPECT TO THE IMAGE in the background of the editing canvas
        var topOffset = 100
        var image_height = object_data.backgroundImage.height //300 THIS SHOUD BE THE CANVAS HEIGHT AND WIDTH???!!!
        var image_width = object_data.backgroundImage.width //300  
        var image_scaleX = object_data.backgroundImage.scaleX //300 THIS SHOUD BE THE CANVAS HEIGHT AND WIDTH???!!!
        var image_scaleY = object_data.backgroundImage.scaleY //300  
        

        var scaled_image_width = image_width * image_scaleX
        var scaled_image_height = image_height * image_scaleY
        
        





        //find the (x, y) center of the ellipse where we are going to clip out of ImageA
        var clip_center_y = shape_centerY - (scaled_image_height/2) - topOffset            
        var clip_center_x = shape_centerX - (scaled_image_width/2)      
        
        
        
        //get the scale factor of the image, then scale x, y, and the radii by that number
        //DO I NEED ANY OF THIS????
        var img = object_data.backgroundImage //mixCanvas.getItemByAttr("_id", wholeOrPart)
        
        // ImageA on the Canvas may or may not be the same size, so we have to scale the (x,y) center as well as the x-radius and y-radius
        var clip_img_height = img['height']
        var clip_img_width = img['width']       
        var clip_img_scaleX = img['scaleX']
        var clip_img_scaleY = img['scaleY']        
        var clip_img_height_scaled = clip_img_height * clip_img_scaleY
        var clip_img_width_scaled = clip_img_width * clip_img_scaleX
        

        //Ratio of MixCanvas ImageA to ImageA
        var ratio_x_new_to_old = clip_img_width_scaled / scaled_image_width
        var ratio_y_new_to_old = clip_img_height_scaled / scaled_image_height

        
        //find the new (x,y) center of the place where we are going to clip ImageA on the 
        var clip_center_x_scaled = clip_center_x * (1/clip_img_scaleX) * ratio_x_new_to_old
        var clip_center_y_scaled = clip_center_y * (1/clip_img_scaleY) * ratio_y_new_to_old           
        var clip_radiusX_scaled = shape_radiusX * (1/clip_img_scaleX) * ratio_x_new_to_old
        var clip_radiusY_scaled = shape_radiusY * (1/clip_img_scaleY) * ratio_y_new_to_old

        var clip_angle = fabric.util.degreesToRadians(shape_angle);
        
        if(shape == "circle"){
            //img["clipTo"] = 
            return function (ctx) {    
                ctx.ellipse(
                    clip_center_x_scaled, 
                    clip_center_y_scaled, 
                    clip_radiusX_scaled, 
                    clip_radiusY_scaled, 
                    clip_angle, 
                    0, Math.PI * 2, false)
              } ;
         } 
         // clipTo polygon - http://jsfiddle.net/ZxYCP/198/

        if(shape == "rect"){

            return function (ctx) {                
                //get the positions of the rectnagle points when centered at zero-zero of the image
                var point1 = [clip_center_x_scaled - clip_radiusX_scaled,         clip_center_y_scaled - clip_radiusY_scaled]
                var point2 = [clip_center_x_scaled + clip_radiusX_scaled,         clip_center_y_scaled - clip_radiusY_scaled ]
                var point3 = [clip_center_x_scaled + clip_radiusX_scaled,         clip_center_y_scaled + clip_radiusY_scaled ] 
                var point4 = [clip_center_x_scaled - clip_radiusX_scaled,         clip_center_y_scaled + clip_radiusY_scaled]

                //at this point, if we don't rotate the points, it would be the same as just doing the ctx.rect( ) clipTo.

                //rotate the rectangle point around (0,0). The points have already been transformed to be at the center of the image 
                //so we just need to perform the clip on these transformed points, w.r.t. the *center*
                var rect = enlivened_shape_data              
                //var imageCenterPoint_x = image_width/2 //scaled_image_width????
                //var imageCenterPoint_y = topOffset + image_height/2 -topOffset//scaled_image_width
                var rect_center = new fabric.Point(clip_center_x_scaled, clip_center_y_scaled) //new fabric.Point(0, 0)
                var rect_angle_radians = fabric.util.degreesToRadians(rect.angle);
                //var rect_angle_radians = fabric.util.degreesToRadians(0);

                var point1_rotated = fabric.util.rotatePoint(new fabric.Point(point1[0], point1[1]), rect_center, rect_angle_radians);
                var point2_rotated = fabric.util.rotatePoint(new fabric.Point(point2[0], point2[1]), rect_center, rect_angle_radians);
                var point3_rotated = fabric.util.rotatePoint(new fabric.Point(point3[0], point3[1]), rect_center, rect_angle_radians);
                var point4_rotated = fabric.util.rotatePoint(new fabric.Point(point4[0], point4[1]), rect_center, rect_angle_radians);


                

                ctx.beginPath();
                ctx.moveTo(point1_rotated['x'], point1_rotated['y']);
                ctx.lineTo(point2_rotated['x'], point2_rotated['y']);
                ctx.lineTo(point3_rotated['x'], point3_rotated['y']);
                ctx.lineTo(point4_rotated['x'], point4_rotated['y']);
                ctx.lineTo(point1_rotated['x'], point1_rotated['y']);
                ctx.closePath();
                

                /*
                // OLD RECTANGLE WAY
                ctx.rect(
                    clip_center_x_scaled - clip_radiusX_scaled,
                    clip_center_y_scaled - clip_radiusY_scaled,
                    2*clip_radiusX_scaled, //200, //clip_center_x_scaled + clip_radiusX_scaled,
                    2*clip_radiusY_scaled, //200//clip_center_y_scaled + clip_radiusY_scaled
                    
                )
                */
                
            } 
        } 

           
}

var calculate_radius_diff = function(a_classification, b_classification, a_handle, b_handle, shape_radiusX_1, shape_radiusY_1, shape_radiusX_0, shape_radiusY_0){

    var circles_x_radius_diff = 0;
    var circles_y_radius_diff = 0;

    if(a_classification=='regular'){
        if(a_handle == 'short' && b_handle == 'long'){
            circles_x_radius_diff = shape_radiusY_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusX_1 / shape_radiusY_0
        }
        if(a_handle == 'long' && b_handle == 'short'){
            circles_x_radius_diff =  shape_radiusY_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusX_1 / shape_radiusY_0
        }
        if(a_handle == 'long' && b_handle == 'long'){
            circles_x_radius_diff =  shape_radiusX_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusY_1 /shape_radiusY_0
        }
        if(a_handle == 'short' && b_handle == 'short'){
            circles_x_radius_diff =  shape_radiusX_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusY_1 /shape_radiusY_0
        }
    }
    if(a_classification == 'short_handle~horizontal_hotdog'){
        // works
        if(a_handle == 'long' && b_handle == 'short'){
            circles_x_radius_diff =  shape_radiusY_1 / shape_radiusY_0
            circles_y_radius_diff = shape_radiusX_1 / shape_radiusX_0 
        }
        // works
        if(a_handle == 'long' && b_handle == 'long'){
            circles_x_radius_diff =  shape_radiusX_1 / shape_radiusY_0
            circles_y_radius_diff =  shape_radiusY_1 / shape_radiusX_0
        }
    }
    if(a_classification == 'long_handle~vertical_hotdog'){
        // works
        if(a_handle == 'short' && b_handle == 'short'){
            circles_x_radius_diff =  shape_radiusX_1 / shape_radiusY_0 
            circles_y_radius_diff = shape_radiusY_1 / shape_radiusX_0 
        }
        // works
        if(a_handle == 'short' && b_handle == 'long'){
            circles_x_radius_diff =  shape_radiusY_1 / shape_radiusY_0 // shape_radiusX_1 / shape_radiusX_0
            circles_y_radius_diff =  shape_radiusX_1 / shape_radiusX_0 // shape_radiusY_1 / shape_radiusY_0
        }
    }
    if(a_classification == 'long_handle~angled_hotdog'){
        if(a_handle == 'short' && b_handle == 'long'){
            circles_x_radius_diff = shape_radiusY_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusX_1 / shape_radiusY_0
        }
        if(a_handle == 'long' && b_handle == 'short'){
            circles_x_radius_diff =  shape_radiusY_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusX_1 / shape_radiusY_0
        }
        if(a_handle == 'long' && b_handle == 'long'){
            circles_x_radius_diff =  shape_radiusX_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusY_1 /shape_radiusY_0
        }
        if(a_handle == 'short' && b_handle == 'short'){
            circles_x_radius_diff =  shape_radiusX_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusY_1 /shape_radiusY_0
        }
    }

    if(a_classification == 'short_handle~angled_hotdog'){
        if(a_handle == 'short' && b_handle == 'long'){
            circles_x_radius_diff = shape_radiusY_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusX_1 / shape_radiusY_0
        }
        if(a_handle == 'long' && b_handle == 'short'){
            circles_x_radius_diff =  shape_radiusY_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusX_1 / shape_radiusY_0
        }
        if(a_handle == 'long' && b_handle == 'long'){
            circles_x_radius_diff =  shape_radiusX_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusY_1 /shape_radiusY_0
        }
        if(a_handle == 'short' && b_handle == 'short'){
            circles_x_radius_diff =  shape_radiusX_1 / shape_radiusX_0
            circles_y_radius_diff = shape_radiusY_1 /shape_radiusY_0
        }
    }

    if(a_classification == undefined){
        circles_x_radius_diff =  shape_radiusX_1 / shape_radiusX_0
        circles_y_radius_diff = shape_radiusY_1 /shape_radiusY_0
    }

    return [circles_x_radius_diff, circles_y_radius_diff]; 
}

var calculate_image_0_offset = function(a_handle, b_handle, shape_centerX_1, shape_centerY_1, scaled_diff_X_circle0_from_image0_center, scaled_diff_Y_circle0_from_image0_center){
    //var image_topOffset0 = shape_centerY_1 + scaled_diff_X_circle0_from_image0_center   //B center - A center Diif between positions, this is how much the image needs to move to  be aligned.
    //var image_leftOffset0 =  shape_centerX_1 - scaled_diff_Y_circle0_from_image0_center  // ditto

    var image_topOffset0 = 0;
    var image_leftOffset0 = 0;

    if(a_handle == 'short' && b_handle == 'long'){ 
        image_topOffset0 = shape_centerY_1 + scaled_diff_X_circle0_from_image0_center
        image_leftOffset0 =  shape_centerX_1 - scaled_diff_Y_circle0_from_image0_center
    }
    if(a_handle == 'long' && b_handle == 'short'){
        image_topOffset0 = shape_centerY_1 - scaled_diff_X_circle0_from_image0_center
        image_leftOffset0 =  shape_centerX_1 + scaled_diff_Y_circle0_from_image0_center
    }
    if(a_handle == b_handle){
        image_topOffset0 = shape_centerY_1 + scaled_diff_Y_circle0_from_image0_center
        image_leftOffset0 =  shape_centerX_1 + scaled_diff_X_circle0_from_image0_center
    }

    return[image_topOffset0, image_leftOffset0];
}


// object_data_a, object_data_b, enlivened_shape_data_a, enlivened_shape_data_b, mixCanvas
var scaleAndTranslateImageAonMixCanvas = function(object_data_a, object_data_b, enlivened_shape_data_a, enlivened_shape_data_b, mixCanvas, shape_a, shape_b, opacity, new_angle){

    //some useful offset parameters
    //WORK HERE - set from background.top, and backgorun.left
    var editingCanvas0_topOffset = 100 //TODO set in a more real way? like getting the top, and left position from the editingCanvas1
    var editingCanvas1_topOffset = 100 //TODO set in a more real way?

    var editingCanvas0_leftOffset = 0 //TODO set in a more real way?
    var editingCanvas1_leftOffset = 0 //TODO set in a more real way?


    // Step 1. Get Image B params
    //var objects1 = editingCanvas1.getObjects("circle") //PARAMETERIZE THIS SO IT CAN USE DIFFERENT SHAPES
    var shape_B_obj = enlivened_shape_data_b //getShape(editingCanvas1, shape_b)//objects1[0]
    //console.log("shape_b : "+shape_b)
    //console.log(shape_B_obj)
    var shape_height_1 = shape_B_obj['height']
    var shape_width_1 = shape_B_obj['width']

    var shape_scaleX_1 = shape_B_obj['scaleX']
    var shape_scaleY_1 = shape_B_obj['scaleY']

    var shape_angle_1 = shape_B_obj['angle']
    
    var shape_centerPoint_1 = shape_B_obj.getCenterPoint()
    var shape_centerX_1 = shape_centerPoint_1['x'] //+ leftOffset1 //ADDED OFFSET
    var shape_centerY_1 = shape_centerPoint_1['y'] //- editingCanvas1_topOffset 

    //find the shape radii
    var shape_radiusX_1 = (shape_width_1/2)*shape_scaleX_1
    var shape_radiusY_1 = (shape_height_1/2)*shape_scaleY_1

    //Step 2. Get the Image A params
    var backgroundImage0 = object_data_a['backgroundImage']//['src']
    var url0 = backgroundImage0['src']
    
    var shape_A_obj = enlivened_shape_data_a //getShape(editingCanvas0, shape_a)


    var shape_height_0 = shape_A_obj['height']
    var shape_width_0 = shape_A_obj['width']

    var shape_scaleX_0 = shape_A_obj['scaleX']
    var shape_scaleY_0 = shape_A_obj['scaleY']

    var shape_angle_0 = shape_A_obj['angle']
    
    var shape_centerPoint_0 = enlivened_shape_data_a.getCenterPoint()
    
    var shape_centerX_0 = shape_centerPoint_0['x'] 
    var shape_centerY_0 = shape_centerPoint_0['y'] - editingCanvas0_topOffset // take away the original offset

    //find the shape radii
    var shape_radiusX_0 = (shape_width_0/2)*shape_scaleX_0
    var shape_radiusY_0 = (shape_height_0/2)*shape_scaleY_0

    // Step 3. Find the top and left offset
    //compare circle A and B radius (to get a scaling factor)

    var circles_x_radius_diff = 0;
    var circles_y_radius_diff = 0; 

    var a_handle = shape_A_obj['handle_location'];
    var b_handle = shape_B_obj['handle_location'];
    var a_classification = shape_A_obj['classification'];
    var b_classification = shape_B_obj['classification'];

    radii_differences = calculate_radius_diff(a_classification, b_classification, a_handle, b_handle, shape_radiusX_1, shape_radiusY_1, shape_radiusX_0, shape_radiusY_0);
    circles_x_radius_diff = radii_differences[0];
    circles_y_radius_diff = radii_differences[1];

    var z1 =  shape_radiusX_1 / shape_radiusX_0
    var z2 = shape_radiusY_1 /shape_radiusY_0



    //compare and scale circle centers. (to get top, left offset using the center point as reference between the shapes)
    var diff_X_circle0_from_image0_center = backgroundImage0['left'] + (backgroundImage0['width'] * backgroundImage0['scaleX'])/2 - shape_centerPoint_0['x']
    var diff_Y_circle0_from_image0_center = backgroundImage0['top'] + (backgroundImage0['height']* backgroundImage0['scaleY'])/2 - shape_centerPoint_0['y']


    var scaled_diff_X_circle0_from_image0_center = diff_X_circle0_from_image0_center *  circles_x_radius_diff
    var scaled_diff_Y_circle0_from_image0_center = diff_Y_circle0_from_image0_center *  circles_y_radius_diff
    
    /*var scaled_diff_X_circle0_from_image0_center = diff_X_circle0_from_image0_center *  circles_y_radius_diff
    var scaled_diff_Y_circle0_from_image0_center = diff_Y_circle0_from_image0_center *  circles_x_radius_diff*/

    //Calculate how much of offset the imageA *image* center (not the circle center) based on the diff 
    //ImageA_new_location = ShapeB_center + (diff: imageAcenter-cirlceAcenter) * (scale: circleB/circleA radius)
    //var image_topOffset0 = shape_centerY_1 + scaled_diff_Y_circle0_from_image0_center  //B center - A center Diif between positions, this is how much the image needs to move to  be aligned.
    //var image_leftOffset0 =  shape_centerX_1 + scaled_diff_X_circle0_from_image0_center  // ditto

    offset_array = calculate_image_0_offset(a_handle, b_handle, shape_centerX_1, shape_centerY_1, scaled_diff_X_circle0_from_image0_center, scaled_diff_Y_circle0_from_image0_center);
    var image_topOffset0 = offset_array[0];
    var image_leftOffset0 = offset_array[1]; 

    //ImageA Angle: should be given the angle of the mask on ImageB
    //var angle_0 = shape_angle_1 

    //Scale factor: CircleB/CircleA 
    //if shape_a == "circle" then do this
    var scaleFactorX_0 = circles_x_radius_diff // we only need to scale the A image by the same factor the circle radiuses are scaled
    var scaleFactorY_0 = circles_y_radius_diff //1
    /*
    if(shape_a != "circle"){
        //scale both side equally,
        // by whichever ratio is smaller
        var rect_scale_factor = Math.min(circles_x_radius_diff, circles_y_radius_diff)
        scaleFactorX_0 = rect_scale_factor
        scaleFactorY_0 = rect_scale_factor
        console.log("shape_centerX_0: "+shape_centerX_0)
        console.log("shape_centerY_0: "+shape_centerY_0)
    }
    */





    //Scale and Tranform ImageA on MixCanvas to match the (x,y)-dimensions and location of CircleB
    //var imageA_onMix = mixCanvas.getItemByAttr("_id", "whole")

    //this is the original amount ImageA had to be scaled to fit in the 300x300 canvas.
    //we want to start with this amount of scaling, then compound it by the new amount to scale to to the CircleB size.
    var imageA_scaleX = backgroundImage0.scaleX
    var imageA_scaleY = backgroundImage0.scaleY

    //console.log("opacity: "+opacity)    
    
    var opacity = opacity || .7

    //console.log("opacity: "+opacity)


    var new_image_parameters = { 
        scaleX: imageA_scaleX * scaleFactorX_0,
        scaleY: imageA_scaleY * scaleFactorY_0,
        opacity: opacity, //Maybe there should be an option to set this to 1?
        left: image_leftOffset0,
        top: image_topOffset0,
        originX: "center", 
        originY: "center", 
        // angle: shape_angle_1,
        angle: new_angle,     
    }
    return new_image_parameters
    //mixCanvas.renderAll();
}



var getShapeFromObjectData = function(object_data, shape){ 
    var shapes = _.filter( object_data['objects'], function(obj){ return obj['type'] == shape} )
    if(shapes.length == 1){
        return shapes[0]
    } else{
        return undefined
    }
}


var getShape = function(canvas, shape){ 
    //console.log(canvas)

        var shapes = canvas.getObjects(shape)
        console.log(shapes)
        if(shapes.length == 1){
            return shapes[0]
        } else{
            

            return undefined
        }
    //}
}


put_items_in_mixcanvas_no_autoblend = function(mix_canvas, canvas_a, canvas_b, shape_a, shape_b){
    mix_canvas.clear()

    //console.log("update_overlap_items_in_mixcanvas")
    initImageBToMixCanvas(mix_canvas, canvas_b, shape_b) 

    //initImageAToMixCanvas
    var imageA_original = canvas_a['backgroundImage']
    
    var url = imageA_original["src"]
    var scaleX = imageA_original.scaleX
    var scaleY = imageA_original.scaleY
    var left = imageA_original.left
    var top = imageA_original.top

    
       var imageParamters = { 
            _id: "whole",
            opacity: .7,

            scaleX: scaleX,
            scaleY: scaleY,

            left: left,
            top: top,
        }

    //var imageParamters = scaleAndTranslateImageAonMixCanvas(object_data_a, object_data_b, enlivened_shape_data_a, enlivened_shape_data_b, mixCanvas)
    var shape_a_data = getShape(canvas_a, shape_a)
    imageParamters["clipTo"] =  cropImageA("whole", shape_a_data, mix_canvas, shape_a, canvas_a)
    

    var f_img = new fabric.Image.fromURL(url, function(img) {
        img.set(imageParamters)

        mix_canvas.add(img).setActiveObject(img); 
        //make sure this image is set on top in the mix canvas
        img.moveTo(1) 
    })   

}