import { ReactiveVar } from 'meteor/reactive-var'

import './canvas_helpers2.js'
import './canvas_helpers_for_meteor.js'

var saveAll = function(){
	var pair_ids = Session.get("pairs")
	_.each(pair_ids, function(pair){
		var a_id = pair[0]
		var b_id = pair[1]
		$("#saveAutoBlend_"+a_id+"_"+b_id).click()
		$("#reverseAutoBlend_"+a_id+"_"+b_id).click()
	})
}

Template.showAutoMatches.events({
	'click .next': function(event){
		
		var concept1 = Router.current().params.concept1
		var concept2 = Router.current().params.concept2
		//console.log("next: "+concept1+" "+concept2)
		//saveAll() 
		//console.log(Template.instance())
		//return
		Router.go("autoMatches", {concept1: concept1, concept2: concept2})
		
		if(concept1== "orange" && concept2 == "summer"){
			//var go = "/autoMatches/"++"/"
			//console.log("/autoMatches/orange/winter")
			//Router.go("/autoMatches/orange/winter")
			//Router.go("autoMatches", {concept1: "orange", concept2: "winter"})
			var newURL = "http://"+window.location.host+"/autoMatches/orange/winter"
        	window.open(newURL, '_blank');
		}
		if(concept1== "orange" && concept2 == "winter"){
			//var go = "/autoMatches/"++"/"
			//console.log("/autoMatches/Starbucks/summer")
			//Router.go("/autoMatches/Starbucks/summer")
			//Router.go("autoMatches", {concept1: "Starbucks", concept2: "summer"})
			var newURL = "http://"+window.location.host+"/autoMatches/Starbucks/summer"
        	window.open(newURL, '_blank');

		}
		if(concept1== "Starbucks" && concept2 == "summer"){
			//var go = "/autoMatches/"++"/"
			//console.log("/autoMatches/Starbucks/winter")
			//Router.go("/autoMatches/Starbucks/winter")
			//Router.go("autoMatches", {concept1: "Starbucks", concept2: "winter"})
			var newURL = "http://"+window.location.host+"/autoMatches/Starbucks/winter"
        	window.open(newURL, '_blank');
		}
		if(concept1== "Starbucks" && concept2 == "winter"){
			//var go = "/autoMatches/"++"/"
			//console.log("/")
			//Router.go("/")
			var newURL = "http://"+window.location.host//+"/autoMatches/Starbucks/winter"
        	window.open(newURL, '_blank');
		}

	}
})


Template.showAutoMatches.helpers({

	concept1: function(){
		var concept1 = Router.current().params.concept1
		//var concept2 = Router.current().params.concept2
		return concept1
	},
	concept2: function(){
		//var concept1 = Router.current().params.concept1
		var concept2 = Router.current().params.concept2
		return concept2
	},

	count_pairs: function(){
		var concept1 = Router.current().params.concept1	 // Session.get("concept1") //	
		var concept2 = Router.current().params.concept2  // Session.get("concept2") // 
		var pairs = find_pairs(concept1, concept2)
		//Session.set("pairs", pairs)
		return pairs.length
	},
	pair_mixes: function(){
		
		
		//console.log(this)
		var concept1 = Router.current().params.concept1		
		var concept2 = Router.current().params.concept2
		//console.log("find_pairs: "+concept1+" "+concept2)
		
		var pairs = find_pairs(concept1, concept2)
		//console.log(pairs)
		var pair_ids = _.map(pairs, function(pair){ 
			var a_id = pair.image_a._id
			var b_id = pair.image_b._id
			return [a_id, b_id]
		})

		//Session.set("pairs", pair_ids)
		//console.log("len: "+pairs.length)
		return pairs

	}
})

var determine_handle_location = function(height_over_width){
	if(height_over_width > 1){
		return 'short';
	}
	else{
		return 'long';
	}
}

var determine_true_ratio = function(handle_location, height, width){
	if(handle_location == 'short'){
		return width / height;
	}
	else{
		return height / width; 
	}
}

var calculate_phi = function(handle_location, theta){
	var phi = 0;
	if(handle_location == 'short'){
		if(theta >= 90){
    		phi = theta - 90;
    	}
    	else{
    		phi = 360 - (90 - theta); 
    	}
	}
	else{
		phi = theta;
	}
	return phi;
}

var check_if_special_case = function(handle_location, theta){
	var case_classification = 'regular';
	if(handle_location == 'short'){
		if(theta <= 95 && theta >= 85){ // horizontal hotdog with handle on short side (to the right)
			case_classification = 'short_handle~horizontal_hotdog';
		}
		if(theta <= 275 && theta >= 265){ // horizontal hotdog with handle on short side (to the left)
			case_classification = 'short_handle~horizontal_hotdog';
		}
		if( (theta >= 10 && theta <= 80) || (theta >= 100 && theta <= 170) || (theta >= 190 && theta <= 260) || (theta >= 280 && theta <= 350) ){
			case_classification = 'short_handle~angled_hotdog'; 
		}
	}
	else{
		if( (theta >= 10 && theta <= 80) || (theta >= 100 && theta <= 170) || (theta >= 190 && theta <= 260) || (theta >= 280 && theta <= 350) ){
			case_classification = 'long_handle~angled_hotdog'; 
		}
		if(theta <= 95 && theta >= 85){ // horizontal hotdog with handle on short side (to the right)
			case_classification = 'long_handle~vertical_hotdog';
		}
		if(theta <= 275 && theta >= 265){ // horizontal hotdog with handle on short side (to the left)
			case_classification = 'long_handle~vertical_hotdog';
		}
	}
	return case_classification;
}

var revise_based_on_classification = function(classification, handle_location){
	var pretend_handle_location = '';
	if(classification == 'short_handle~horizontal_hotdog'){
		pretend_handle_location = 'long';
		return pretend_handle_location;
	}
	if(classification == 'long_handle~vertical_hotdog'){
		pretend_handle_location = 'short';
		return pretend_handle_location;
	}
	if(classification = 'regular'){
		return handle_location;
	}
}

var make_match_pairs = function(a_images, b_images){
	var pairs = []
	_.each(a_images, function(image_a){
		_.each(b_images, function(image_b){
			var object_a_data = JSON.parse(image_a.canvas_data) // this.data['object_a_data']
		    var object_b_data = JSON.parse(image_b.canvas_data) //this.data['object_b_data'] 		    
		    var shape_a = image_a.drawnShape 
		    var shape_b = image_b.drawnShape 

		    //is it in the match database????
		    var mixInDb = MixCanvases.find({
		    	image1_id: image_a._id, // I should probably compare the canvas data, not the id of the image
		    	image2_id: image_b._id, // I should probably compare the canvas data, not the id of the image
		    }).count()
		    
		    var inMixes = (mixInDb > 0)

		    if(shape_a == "rect" && shape_b == "rect"){
			    var object_a_shape_data = _.filter(object_a_data.objects, function(o){
			    	return o.type == shape_a
			    })
			    var object_b_shape_data = _.filter(object_b_data.objects, function(o){
			    	return o.type == shape_b
			    })

			    var a_height = object_a_shape_data[0].height
			    var a_width = object_a_shape_data[0].width
			    var a_scaleX = object_a_shape_data[0].scaleX
			    var a_scaleY = object_a_shape_data[0].scaleY

			    var a_height_scaled = a_height*a_scaleY
			    var a_width_scaled = a_width*a_scaleX

			    var a_ratio = a_height_scaled / a_width_scaled
			    
			    var b_height = object_b_shape_data[0].height
			    var b_width = object_b_shape_data[0].width
			    var b_scaleX = object_b_shape_data[0].scaleX
			    var b_scaleY = object_b_shape_data[0].scaleY

			    var b_height_scaled = b_height*b_scaleY
			    var b_width_scaled = b_width*b_scaleX

			    var b_ratio = b_height_scaled / b_width_scaled

			    var a_handle_location = determine_handle_location(a_ratio);
			    var b_handle_location = determine_handle_location(b_ratio);
			    var theta_of_a = object_a_shape_data[0]['angle'];
			    var theta_of_b = object_b_shape_data[0]['angle'];
			    var a_true_ratio = determine_true_ratio(a_handle_location, a_height_scaled, a_width_scaled);
			    var b_true_ratio = determine_true_ratio(b_handle_location, b_height_scaled, b_width_scaled);
			    var a_classification = check_if_special_case(a_handle_location, theta_of_a);
			    var b_classification = check_if_special_case(b_handle_location, theta_of_b);
			    a_handle_location = revise_based_on_classification(a_classification, a_handle_location);
			    var phi_of_a = calculate_phi(a_handle_location, theta_of_a);
			    var phi_of_b = calculate_phi(b_handle_location, theta_of_b);

			    var isSameAspectRatio = false
			    if (a_true_ratio == b_true_ratio){
			    	isSameAspectRatio = true	
			    }

			    var bigger_ratio = (a_true_ratio > b_true_ratio) ? a_true_ratio : b_true_ratio
			    var smaller_ratio = (b_true_ratio < a_true_ratio) ? b_true_ratio : a_true_ratio

			    if(smaller_ratio > bigger_ratio*(.7)){
			    	isSameAspectRatio = true
			    }
			    			    
		    	if(isSameAspectRatio){
		    		// update images with phi angle and case
		    		// function to be called by findIndex, simply checks if type is 'rect'
		    		function isRectType(element){
		    			return element['type'] == 'rect'; 
		    		}
		    		// insert new A values: phi, handle location
		    		var a_rect_i = object_a_data.objects.findIndex(isRectType);
		    		var a_rect_obj = object_a_data.objects[a_rect_i]; 
		    		a_rect_obj['phi'] = phi_of_a;
		    		a_rect_obj['handle_location'] = a_handle_location; 
		    		a_rect_obj['classification'] = a_classification;
		    		object_a_data.objects[a_rect_i] = a_rect_obj; 
		    		image_a.canvas_data = JSON.stringify(object_a_data);
		    		// insert new B values: phi, handle location
		    		var b_rect_i = object_b_data.objects.findIndex(isRectType);
		    		var b_rect_obj = object_b_data.objects[a_rect_i]; 
		    		b_rect_obj['phi'] = phi_of_b;
		    		b_rect_obj['handle_location'] = b_handle_location; 
		    		b_rect_obj['classification'] = b_classification;
		    		object_b_data.objects[b_rect_i] = b_rect_obj; 
		    		image_b.canvas_data = JSON.stringify(object_b_data);

		    		pairs.push({
						image_a: image_a,
						image_b: image_b,
						unique_id: image_a._id+"_"+image_b._id,
						inMixes: inMixes
					})
		    	}

		    } else {
		    	pairs.push({
					image_a: image_a,
					image_b: image_b,
					unique_id: image_a._id+"_"+image_b._id,
					inMixes: inMixes
				})
		    }
			
		})
	})
	return pairs
}


var find_pairs = function(concept1, concept2){
	var pairs = [];
	var shape_list = ['circle', 'sphere', 'rectangle', 'box', 'cylinder'];

	// ** Do NOT ignore depth, that is match circle to circle, sphere to sphere, etc.
	for (i = 0; i < shape_list.length; i++) { 

		// ** Fetch everything, whole/parts of 1 and whole/parts of 2
		var con1_shape_whole = Images1.find({complexity: "whole", shape: shape_list[i], concept: concept1}).fetch();
		var con1_shape_part = Images1.find({complexity: "part", shape: shape_list[i], concept: concept1}).fetch();
		var con2_shape_whole = Images2.find({complexity: "whole", shape: shape_list[i], concept: concept2}).fetch();
		var con2_shape_part = Images2.find({complexity: "part", shape: shape_list[i], concept: concept2}).fetch();

		// ** Map whole to part in both directions  
		// This is what's normally done (with all the constraints)
		var con1_a_and_con2_b_w_to_p = make_match_pairs(con1_shape_whole, con2_shape_part);
		var con2_a_and_con1_b_w_to_p = make_match_pairs(con2_shape_whole, con1_shape_part);
		pairs = pairs.concat(con1_a_and_con2_b_w_to_p);
		pairs = pairs.concat(con2_a_and_con1_b_w_to_p);

		// ** Map part to part in both directions 
		var con1_a_and_con2_b_p_to_p = make_match_pairs(con1_shape_part, con2_shape_part);
		var con2_a_and_con1_b_p_to_p = make_match_pairs(con2_shape_part, con1_shape_part);
		pairs = pairs.concat(con1_a_and_con2_b_p_to_p);
		pairs = pairs.concat(con2_a_and_con1_b_p_to_p);

		// ** Map whole to whole in both directions
		var con1_a_and_con2_b_w_to_w = make_match_pairs(con1_shape_whole, con2_shape_whole);
		var con2_a_and_con1_b_w_to_w = make_match_pairs(con2_shape_whole, con1_shape_whole);
		pairs = pairs.concat(con1_a_and_con2_b_w_to_w);
		pairs = pairs.concat(con2_a_and_con1_b_w_to_w);
	}

	var depth_shape_list = [['circle','sphere'],['rectangle','box']];

	// ** IGNORE depth
	for (i = 0; i < depth_shape_list.length; i++){
		flat_shape = depth_shape_list[i][0];
		deep_shape = depth_shape_list[i][1];

		// Image1 == FLAT shape, Image2 == DEEP shape
		var con1_shape_whole = Images1.find({complexity: "whole", shape: flat_shape, concept: concept1}).fetch();
		var con1_shape_part = Images1.find({complexity: "part", shape: flat_shape, concept: concept1}).fetch();
		var con2_shape_whole = Images2.find({complexity: "whole", shape: deep_shape, concept: concept2}).fetch();
		var con2_shape_part = Images2.find({complexity: "part", shape: deep_shape, concept: concept2}).fetch();

		// Whole to Part
		var con1_a_and_con2_b_w_to_p = make_match_pairs(con1_shape_whole, con2_shape_part);
		var con2_a_and_con1_b_w_to_p = make_match_pairs(con2_shape_whole, con1_shape_part);
		pairs = pairs.concat(con1_a_and_con2_b_w_to_p);
		pairs = pairs.concat(con2_a_and_con1_b_w_to_p);

		// Part to Part
		var con1_a_and_con2_b_p_to_p = make_match_pairs(con1_shape_part, con2_shape_part);
		var con2_a_and_con1_b_p_to_p = make_match_pairs(con2_shape_part, con1_shape_part);
		pairs = pairs.concat(con1_a_and_con2_b_p_to_p);
		pairs = pairs.concat(con2_a_and_con1_b_p_to_p);

		// Whole to Whole
		var con1_a_and_con2_b_w_to_w = make_match_pairs(con1_shape_whole, con2_shape_whole);
		var con2_a_and_con1_b_w_to_w = make_match_pairs(con2_shape_whole, con1_shape_whole);
		pairs = pairs.concat(con1_a_and_con2_b_w_to_w);
		pairs = pairs.concat(con2_a_and_con1_b_w_to_w);

		// Image1 == DEEP shape, Image2 == FLAT shape
		var con1_shape_whole = Images1.find({complexity: "whole", shape: deep_shape, concept: concept1}).fetch();
		var con1_shape_part = Images1.find({complexity: "part", shape: deep_shape, concept: concept1}).fetch();
		var con2_shape_whole = Images2.find({complexity: "whole", shape: flat_shape, concept: concept2}).fetch();
		var con2_shape_part = Images2.find({complexity: "part", shape: flat_shape, concept: concept2}).fetch();

		// Whole to Part
		var con1_a_and_con2_b_w_to_p = make_match_pairs(con1_shape_whole, con2_shape_part);
		var con2_a_and_con1_b_w_to_p = make_match_pairs(con2_shape_whole, con1_shape_part);
		pairs = pairs.concat(con1_a_and_con2_b_w_to_p);
		pairs = pairs.concat(con2_a_and_con1_b_w_to_p);

		// Part to Part
		var con1_a_and_con2_b_p_to_p = make_match_pairs(con1_shape_part, con2_shape_part);
		var con2_a_and_con1_b_p_to_p = make_match_pairs(con2_shape_part, con1_shape_part);
		pairs = pairs.concat(con1_a_and_con2_b_p_to_p);
		pairs = pairs.concat(con2_a_and_con1_b_p_to_p);

		// Whole to Whole
		var con1_a_and_con2_b_w_to_w = make_match_pairs(con1_shape_whole, con2_shape_whole);
		var con2_a_and_con1_b_w_to_w = make_match_pairs(con2_shape_whole, con1_shape_whole);
		pairs = pairs.concat(con1_a_and_con2_b_w_to_w);
		pairs = pairs.concat(con2_a_and_con1_b_w_to_w);
	}
	return pairs;
}




Template.autoMatch.onRendered(function() {


	console.log("AUTORENDERED")
	//console.log(Session.get("foo"))
    var image_a = this.data['image_a']
    var image_b = this.data['image_b']

    //console.log("autoMatch render: ",Session.get("concept1"), Session.get("concept2"))
    //console.log("autoMatch render: ",image_a.label+" "+image_b.label)

    var object_a_data = JSON.parse(image_a.canvas_data) // this.data['object_a_data']
    var object_b_data = JSON.parse(image_b.canvas_data) //this.data['object_b_data'] 
    
    var shape_a = image_a.shape // this.data['shape_a']
    var shape_b = image_b.shape //this.data['shape_b']

    var unique_id = this.data['unique_id']// CHANGE THIS!!!! //this.data['unique_id']

    getRidOfNonUsedShape(object_a_data, shape_a)
    getRidOfNonUsedShape(object_b_data, shape_b)

    //Editing Canvas A
    var canvas_a = new fabric.Canvas('a_'+unique_id);
    var canvas_b = new fabric.Canvas('b_'+unique_id);
    var mix_canvas = new fabric.Canvas('mix_canvas_'+unique_id, {width: 300, height:400, preserveObjectStacking: true});  

    //var canvas_data_a = JSON 
    canvas_a.loadFromJSON(object_a_data, canvas_a.renderAll.bind(canvas_a), function(o_a, object_a) {});     
    canvas_b.loadFromJSON(object_b_data, canvas_b.renderAll.bind(canvas_b), function(o_b, object_b) {}); 

      
    //MIX CANVAS
                
    var rectShapes = ["rectangle", "box", "cylinder"]            	        
    

    if(_.indexOf(rectShapes, shape_a) > -1){
        shape_a = "rect"
    }
    if(_.indexOf(rectShapes, shape_b) > -1){
        shape_b = "rect"
    }

    init_overlap_items_in_mixcanvas(mix_canvas, object_a_data, object_b_data, shape_a, shape_b)
    
 
    canvas_a.on('object:modified', function(evt){
        update_overlap_items_in_mixcanvas(mix_canvas, canvas_a, canvas_b, shape_a, shape_b)
    });
    canvas_b.on('object:modified', function(evt){
        update_overlap_items_in_mixcanvas(mix_canvas, canvas_a, canvas_b, shape_a, shape_b)                
    });
    
    /*
    $("#dontautoblend_"+unique_id).click(function(){
        put_items_in_mixcanvas_no_autoblend(mix_canvas, canvas_a, canvas_b, shape_a, shape_b)
    })
    */

    $("#saveAutoBlend_"+unique_id).click(function(){
       //console.log("save auto blend: "+ unique_id)
       var concept1 = Router.current().params.concept1
       var concept2 = Router.current().params.concept2
       save_mix_canvas(mix_canvas, concept1, concept2, image_a._id, image_b._id)
    })  
    $("#reverseAutoBlend_"+unique_id).click(function(){
       var current_angle = mix_canvas['_objects'][1]['angle'];
       var new_angle = 0;
       if(mix_canvas['_objects'][1]['reversed'] == undefined || mix_canvas['_objects'][1]['reversed'] == false){
       		new_angle = current_angle + 180; 
       		mix_canvas['_objects'][1]['angle'] = new_angle;
       		mix_canvas['_objects'][1]['reversed'] = true;
       }
       else{
       		new_angle = current_angle - 180; 
       		mix_canvas['_objects'][1]['angle'] = new_angle;
       		mix_canvas['_objects'][1]['reversed'] = false;
       }
       mix_canvas.renderAll();
    })  

});