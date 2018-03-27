import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './layout.html';



Template.header1.helpers({
  
  metaphorPair: function () {
    var metaphorPair_id = Router.current().params.metaphorPair_id
    var metaphorPair = MetaphorPairs.findOne(metaphorPair_id)
    //console.log("helper: "+metaphorPair_id)
    //console.log(metaphorPair)
    //console.log(Router.current().params.metaphorPair_id)
    
    return metaphorPair;
  },
    isRealTasks: function(){
        var metaphorPair_id = Router.current().params.metaphorPair_id
        //var metaphorPair = MetaphorPairs.findOne(metaphorPair_id)
        return !(metaphorPair_id == "warmup1")
    },
    isActive: function(template){
        var selectedTemplate = Session.get('activeTab')
       if (template == selectedTemplate ){
           return "activeTab"
       }else {
           return ""
       }
    }
 
});


Template.header1.events({

  'click .images1find': function(){
    console.log("images for 1")
    var task = 'images1find'
    var metaphorPair_id = Router.current().params.metaphorPair_id
    //Router.go('images1find', {metaphorPair_id: metaphorPair_id});

    var concept1 = Router.current().params.concept1
    var concept2 = Router.current().params.concept2   
    Router.go(task, {concept1: concept1, concept2: concept2})  
  },
  'click .images1filter': function(){
    var task = 'images1filter'
    var metaphorPair_id = Router.current().params.metaphorPair_id
    //Router.go('images1filter', {metaphorPair_id: metaphorPair_id});

    var concept1 = Router.current().params.concept1
    var concept2 = Router.current().params.concept2   
    Router.go(task, {concept1: concept1, concept2: concept2}) 
  },
  

  'click .images2brainstorm': function(){
    //console.log("images for 2")
    var task = 'images2brainstorm'
    var metaphorPair_id = Router.current().params.metaphorPair_id
    //Router.go('images2brainstorm', {metaphorPair_id: metaphorPair_id});

    var concept1 = $(event.currentTarget).data("concept1") 
    var concept2 = $(event.currentTarget).data("concept2")    
    Router.go(task, {concept1: concept1, concept2: concept2}) 
  },  
  'click .images2find': function(){
    var task = 'images2find'
    var metaphorPair_id = Router.current().params.metaphorPair_id
    //Router.go('images2find', {metaphorPair_id: metaphorPair_id});
    
    var concept1 = Router.current().params.concept1
    var concept2 = Router.current().params.concept2   
    Router.go(task, {concept1: concept1, concept2: concept2}) 
  },
   'click .images2filter': function(){
    var task = 'images2filter'

    var metaphorPair_id = Router.current().params.metaphorPair_id
    //console.log("metaphorPair_id: "+metaphorPair_id)
    //Router.go('images2filter', {metaphorPair_id: metaphorPair_id});
    var concept1 = Router.current().params.concept1
    var concept2 = Router.current().params.concept2   
    Router.go(task, {concept1: concept1, concept2: concept2}) 
  },

  'click .combinePairs': function(){
    var task = 'combinePairs'

    var metaphorPair_id = Router.current().params.metaphorPair_id
    //Router.go('combinePairs', {metaphorPair_id: metaphorPair_id});
    var concept1 = Router.current().params.concept1
    var concept2 = Router.current().params.concept2   
    Router.go(task, {concept1: concept1, concept2: concept2}) 
  },

  'click .autoMatches': function(){
    var task = 'autoMatches'
    console.log("autoMatches")
    var metaphorPair_id = Router.current().params.metaphorPair_id
    //Router.go('autoMatches', {metaphorPair_id: metaphorPair_id});
    var concept1 = Router.current().params.concept1
    var concept2 = Router.current().params.concept2   
    Router.go(task, {concept1: concept1, concept2: concept2}) 
  },
  'click .mixesFilter': function(){
    var task = 'mixesFilter'
    var metaphorPair_id = Router.current().params.metaphorPair_id
    console.log("mixesFilter")
    //Router.go('mixesFilter', {metaphorPair_id: metaphorPair_id});
    var concept1 = Router.current().params.concept1
    var concept2 = Router.current().params.concept2   
    Router.go(task, {concept1: concept1, concept2: concept2}) 
  },
})
