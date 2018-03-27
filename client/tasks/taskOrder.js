taskOrder = [
    {
        template: "images1find",
    },
    {
        template: "images1filter",
    },
    {
        template: "images2find",
    },
    {
        template: "images2filter",
    },
    {
        template: "combinePairs",
    },
    {
        template: "images1find", //just in case there is an error, send them back home
    }
]

findNextTemplate = function(currentTemplate){
    //find index of current template    
    //identify the next template

    for(var i in taskOrder){       
        var thisTemplate = taskOrder[i].template
        if (thisTemplate == currentTemplate){
            var next_i = i*1 + 1
            console.log("next_i: "+next_i)
            return taskOrder[next_i].template
        }
    }
    //if none of those return anything, then everything is completed. 
    return currentTemplate
}