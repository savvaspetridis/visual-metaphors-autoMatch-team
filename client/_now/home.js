Template.addAndShowConceptPairs.helpers({
    'metaphor_pairs': function(){
        return MetaphorPairs.find()
    },
})


Template.addAndShowConceptPairs.events({
        'submit .new-pair'(event){
        event.preventDefault();
        console.log(MetaphorPairs.find())
        const target = event.target;
        const concept1 = target.concept1.value;
        const concept2 = target.concept2.value;
        if(/\S/.test(concept1) && /\S/.test(concept2)){
            console.log('valid')
        }
        console.log(concept1+" "+concept2)
        //Collection.insert({"concept1:"})
        var concept_pair = {'concept1': concept1, 'concept2': concept2};
        MetaphorPairs.insert(concept_pair); 
    },




    'click .go': function(){


        console.log(this)

        Router.go("autoMatches", {concept1: this.concept1, concept2: this.concept2})     


        /*
        var taskOrInstruction =$(event.currentTarget).data().taskorinstructions  

        if(taskOrInstruction == "task"){
            //console.log("here task")
            var task = $(event.currentTarget).data().task //images1find
            var metaphorPair_id = $(event.currentTarget).data("metaphorpair") //warmup1
            var concept1 = $(event.currentTarget).data("concept1") 
            var concept2 = $(event.currentTarget).data("concept2")    

            //Router.go(task, {metaphorPair_id: metaphorPair_id})  
            Router.go(task, {concept1: concept1, concept2: concept2})     

        }
        if(taskOrInstruction == "instructions"){
            //console.log("here instructions")
            var instructionTemplate = $(event.currentTarget).data().instructiontemplate //images1find
            //var metaphorPair = $(event.currentTarget).data().metaphorPair //starbucks
            console.log(instructionTemplate)
            Router.go(instructionTemplate) 

        }  
        */

    },
    
})


Template.taskMenu.events({
    'click #visualBlends': function(){
        Router.go("/instructions/visualBlends") 
    },
    'click #identifyShapes': function(){
        Router.go("/instructions/identifyShapes") 
    },
    'click #shapeCoverage': function(){
        Router.go("/instructions/shapeCoverage") 
    },
    'click #drawShapes': function(){
        Router.go("/instructions/drawShapes") 
    },
    'click #blendImages': function(){
        Router.go("/instructions/blendImages") 
    },
    'click #evaluateMocks': function(){
        Router.go("/instructions/evaluateMocks") 
    },

    'click #drawStarbucks': function(){
        Router.go("/images1filterOnly/Starbucks/none") 
    },
    'click #drawOrange': function(){
        Router.go("/images1filterOnly/orange/none") 
    },
    'click #drawSummer': function(){
        Router.go("/images2filterOnly/none/summer") 
    },
    'click #drawWinter': function(){
        Router.go("/images2filterOnly/none/winter") 
    },


    //FIND IMAGES 2
    'click #findImages': function(){
        Router.go("/instructions/images2") // should take a concept 
    },
    'click #enterImages': function(){
        Router.go("/instructions/images1") // should take a concept 
    },
    'click #findImagesA': function(){
        Router.go("/images2find/spring") // should take a concept 
    },


    // METAOPHOR PAIRS
    'click .go ': function(event){  
        //console.log($(event.currentTarget).data())
        console.log('HERE!!!')


        var taskOrInstruction =$(event.currentTarget).data().taskorinstructions  

        if(taskOrInstruction == "task"){
            //console.log("here task")
            var task = $(event.currentTarget).data().task //images1find
            var metaphorPair_id = $(event.currentTarget).data("metaphorpair") //warmup1
            var concept1 = $(event.currentTarget).data("concept1") 
            var concept2 = $(event.currentTarget).data("concept2")    

            //Router.go(task, {metaphorPair_id: metaphorPair_id})  
            Router.go(task, {concept1: concept1, concept2: concept2})     

        }
        if(taskOrInstruction == "instructions"){
            //console.log("here instructions")
            var instructionTemplate = $(event.currentTarget).data().instructiontemplate //images1find
            //var metaphorPair = $(event.currentTarget).data().metaphorPair //starbucks
            console.log(instructionTemplate)
            Router.go(instructionTemplate) 

        }  

    },

    'submit .new-pair'(event){
        event.preventDefault();
        console.log(MetaphorPairs.find())
        const target = event.target;
        const concept1 = target.concept1.value;
        const concept2 = target.concept2.value;
        if(/\S/.test(concept1) && /\S/.test(concept2)){
            console.log('valid')
        }
        console.log(concept1+" "+concept2)
        //Collection.insert({"concept1:"})
        var concept_pair = {'concept1': concept1, 'concept2': concept2};
        MetaphorPairs.insert(concept_pair); 
    },




    'click #pair1': function(){
        //console.log("clikc")

        Router.go("images1find", {metaphorPair_id: "task1"}) 
    },


    'click .findImagesExercise1': function(){
        var concept = $(event.target).data("concept")
        console.log(concept)
        Router.go("/images1find/"+concept) // should take a concept 
    },
    'click .findImagesExercise2': function(){
        var concept = $(event.target).data("concept")
        console.log(concept)
        Router.go("/images2find/"+concept) // should take a concept 
    },

    'click .filterImagesExercise1': function(){
        var concept = $(event.target).data("concept")
        console.log(concept)
        Router.go("/images1filterOnly/"+concept+"/none") // should take a concept 
    },
    'click .filterImagesExercise2': function(){
        var concept = $(event.target).data("concept")
        console.log(concept)
        Router.go("/images2filterOnly/none/"+concept) // should take a concept 
    },


    'click .autoBlend': function(event){
        var concept1 = $(event.target).data("concept1")
        var concept2 = $(event.target).data("concept2")
        Router.go("/autoMatches/"+concept1+"/"+concept2) 
    },
    
    'click .done': function(){
        Router.go("thanks")
    },
})





var isDone = function(template){
    var isCompleted = Completion.findOne({template: template, createdBy: Meteor.userId()})

    if (isCompleted === undefined){
        return false
    }else {
        return true
    }

}


var isNext = function(template){
    var findNext = findNextTemplate()

    if (template == findNextTemplate()){
        return true
    }else {
        return false
    }

}

Template.taskMenu.helpers({
    'metaphor_pairs': function(){
        return MetaphorPairs.find()
    },
    
    'menu': function(){
        return menu
    },



    'isDone': function(a, b){
        var c = Completion.find({
            createdBy: Meteor.userId(), 
            template: a,
            concept: b
        }).count()

        if(c == 0){
            return false
        }else{
            return true
        }
    },


    'isDisabled': function(template){
        // if done or next, it's enabled 
        return ""
        /*
        if ( isDone(template) || isNext(template)){
            return ""
        } else {
            return "disabled"
        }
        */
    },
    'buttonColor': function(template){
        var returnColor = "btn-primary"
        if (isDone(template)){
            return "btn-default"
        }
        if (isNext(template)){
            return "btn-primary"
        }
        // if done, then it's white
        // if next, then it's blue

        return returnColor
    }

})




Deps.autorun(function () {
    var current = Router.current();

    Deps.afterFlush(function () {
        //$('.content-inner').scrollTop(0);
        $(window).scrollTop(0);
    });
});

/*
Template.summarizeData.helpers({
   'dataSummaryA' :function(){
        var rtn = [] //{title: "title", count: 2}

        var num_total = Images1.find({}).count()
        rtn.push({title: "total", count: num_total})

        var num_whole = Images1.find({complexity: "whole"}).count()
        rtn.push({title: "whole", count: num_whole})

        var num_part = Images1.find({complexity: "part"}).count()
        rtn.push({title: "part", count: num_part})

        var num_circle = Images1.find({shape: "circle"}).count()
        rtn.push({title: "circle", count: num_circle})

        var num_rectangle = Images1.find({shape: "rectangle"}).count()
        rtn.push({title: "rectangle", count: num_rectangle})

        var num_cylinder = Images1.find({shape: "cylinder"}).count()
        rtn.push({title: "cylinder", count: num_cylinder})

        var num_2d = Images1.find({dimensionality: "2D"}).count()
        rtn.push({title: "2D", count: num_2d})

        var num_3d = Images1.find({dimensionality: "3D"}).count()
        rtn.push({title: "3D", count: num_3d})





        var num_whole_circle = Images1.find({complexity: "whole", shape: "circle"}).count()
        rtn.push({title: "whole_circle", count: num_whole_circle})

        var num_whole_rectangle = Images1.find({complexity: "whole", shape: "rectangle"}).count()
        rtn.push({title: "whole_rectangle", count: num_whole_rectangle})

        var num_whole_cylinder = Images1.find({complexity: "whole", shape: "cylinder"}).count()
        rtn.push({title: "whole_cylinder", count: num_whole_cylinder})

        var num_whole_2d = Images1.find({complexity: "whole", dimensionality: "2D"}).count()
        rtn.push({title: "whole_2d", count: num_whole_2d})

        var num_whole_3d = Images1.find({complexity: "whole", dimensionality: "3D"}).count()
        rtn.push({title: "whole_3d", count: num_whole_3d})




        var num_part_circle = Images1.find({complexity: "part", shape: "circle"}).count()
        rtn.push({title: "part_circle", count: num_part_circle})

        var num_part_rectangle = Images1.find({complexity: "part", shape: "rectangle"}).count()
        rtn.push({title: "part_rectangle", count: num_part_rectangle})

        var num_part_cylinder = Images1.find({complexity: "part", shape: "cylinder"}).count()
        rtn.push({title: "part_cylinder", count: num_part_cylinder})

        var num_part_2d = Images1.find({complexity: "part", dimensionality: "2D"}).count()
        rtn.push({title: "part_2d", count: num_part_2d})

        var num_part_3d = Images1.find({complexity: "part", dimensionality: "3D"}).count()
        rtn.push({title: "part_3d", count: num_part_3d})

        return rtn
   }, 

   'dataSummaryB' :function(){
        var rtn = [] //{title: "title", count: 2}

        var num_total = Images2.find({}).count()
        rtn.push({title: "total", count: num_total})

        var num_whole = Images2.find({complexity: "whole"}).count()
        rtn.push({title: "whole", count: num_whole})

        var num_part = Images2.find({complexity: "part"}).count()
        rtn.push({title: "part", count: num_part})

        var num_circle = Images2.find({shape: "circle"}).count()
        rtn.push({title: "circle", count: num_circle})

        var num_rectangle = Images2.find({shape: "rectangle"}).count()
        rtn.push({title: "rectangle", count: num_rectangle})

        var num_cylinder = Images2.find({shape: "cylinder"}).count()
        rtn.push({title: "cylinder", count: num_cylinder})

        var num_2d = Images2.find({dimensionality: "2D"}).count()
        rtn.push({title: "2D", count: num_2d})

        var num_3d = Images2.find({dimensionality: "3D"}).count()
        rtn.push({title: "3D", count: num_3d})





        var num_whole_circle = Images2.find({complexity: "whole", shape: "circle"}).count()
        rtn.push({title: "whole_circle", count: num_whole_circle})

        var num_whole_rectangle = Images2.find({complexity: "whole", shape: "rectangle"}).count()
        rtn.push({title: "whole_rectangle", count: num_whole_rectangle})

        var num_whole_cylinder = Images2.find({complexity: "whole", shape: "cylinder"}).count()
        rtn.push({title: "whole_cylinder", count: num_whole_cylinder})

        var num_whole_2d = Images2.find({complexity: "whole", dimensionality: "2D"}).count()
        rtn.push({title: "whole_2d", count: num_whole_2d})

        var num_whole_3d = Images2.find({complexity: "whole", dimensionality: "3D"}).count()
        rtn.push({title: "whole_3d", count: num_whole_3d})




        var num_part_circle = Images2.find({complexity: "part", shape: "circle"}).count()
        rtn.push({title: "part_circle", count: num_part_circle})

        var num_part_rectangle = Images2.find({complexity: "part", shape: "rectangle"}).count()
        rtn.push({title: "part_rectangle", count: num_part_rectangle})

        var num_part_cylinder = Images2.find({complexity: "part", shape: "cylinder"}).count()
        rtn.push({title: "part_cylinder", count: num_part_cylinder})

        var num_part_2d = Images2.find({complexity: "part", dimensionality: "2D"}).count()
        rtn.push({title: "part_2d", count: num_part_2d})

        var num_part_3d = Images2.find({complexity: "part", dimensionality: "3D"}).count()
        rtn.push({title: "part_3d", count: num_part_3d})

        return rtn
   },    
})
*/
