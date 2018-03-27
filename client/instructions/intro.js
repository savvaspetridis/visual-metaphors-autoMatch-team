var examples = [
    {
        url: "https://dl.dropboxusercontent.com/u/435980/visual-metaphors-images/BlendingWholeToMain/2c135bf9a682ffcc2503d98a4cb9dec0.jpg",
        concept1: "iPhone",
        concept2: "escalator"
    },
    {
        url: "https://dl.dropboxusercontent.com/u/435980/visual-metaphors-images/BlendingWholeToMain/4c843df5b6919683f4dbdc927772b5a8.jpg",
        concept1: "ketchup bottle",
        concept2: "tomato"
    },
    {
        url: "https://dl.dropboxusercontent.com/u/435980/visual-metaphors-images/BlendingWholeToMain/7c2fe5a54d85fb7e2bb42a0cf8705e7e.jpg",
        concept1: "hand",
        concept2: "tree"
    },    
    {
        url: "https://dl.dropboxusercontent.com/u/435980/visual-metaphors-images/BlendingWholeToMain/4cf56690d2658d5e611aa494c67d10cb.jpg",
        concept1: "tongue",
        concept2: "strawberry"
    },    
    
]




Template.instructionsIntro.events({

    'click .done': function(event){
        //collect data
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
 
        
        //go back home
        Router.go("home")
    },
    'click .show': function(){
        var f = $(event.target).siblings(".answers").first()
        $(f).css("display","")
        console.log($(f))
    }

})



Template.instructionsIntro.helpers({  
    examples: function(){
        return examples
    }
});

