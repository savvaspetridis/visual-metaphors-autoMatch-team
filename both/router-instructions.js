
Router.route('/instructions/visualBlends',{
  name: "instructionsVisualBlends",
  template: 'instructionsVisualBlends',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
});


Router.route('/instructions/identifyShapes',{
  name: "instructionsIdentifyShapes",
  template: 'instructionsIdentifyShapes',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
});

Router.route('/instructions/shapeCoverage',{
  name: "instructionsShapeCoverage",
  template: 'instructionsShapeCoverage',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
});

Router.route('/instructions/drawShapes',{
  name: "instructionsDrawShapes",
  template: 'instructionsDrawShapes',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
});


Router.route('/instructions/blendImages',{
  name: "instructionsBlendImages",
  template: 'instructionsBlendImages',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
});

Router.route('/instructions/evaluateMocks',{
  name: "instructionsEvaluateMocks",
  template: 'instructionsEvaluateMocks',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
});


//OLD STUFF

Router.route('/instructions/classifyShapes',{
  name: "instructionsClassifyShapes",
  template: 'instructionsClassifyShapes',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  
  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      return {}
  }
});


Router.route('/instructions/intro',{
  name: "instructionsIntro",
  template: 'instructionsIntro',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  
  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      return {}
  }
});

Router.route('/instructions/images1',{
  name: 'instructionsImages1',
  template: 'instructionsImages1',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  
  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      return {}
  }
});

/*
Router.route('/instructions/filteringImages1',{
  name: 'instructionsFilteringImages1',
  template: 'instructionsFilteringImages1',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  
  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      return {}
  }
});
*/

Router.route('/instructions/images2',{
  name: 'instructionsImages2',
  template: 'instructionsImages2',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  
  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      return {}
  }
});

Router.route('/instructions/filteringImages2',{
  name: 'instructionsFilteringImages2',
  template: 'instructionsFilteringImages2',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  
  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      return {}
  }
});

Router.route('/instructions/CombinePairs',{
  name: 'instructionsCombinePairs',
  template: 'instructionsCombinePairs',
  
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  
  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      return {}
  }
});