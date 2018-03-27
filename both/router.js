//images1filterOnly
Router.route('/images1filterOnly/:concept1/:concept2',{ // /images2filter/:metaphorPair_id
  name: "images1filterOnly",
  template: 'images1filterOnly',

});

Router.route('/images2filterOnly/:concept1/:concept2',{ // /images2filter/:metaphorPair_id
  name: "images2filterOnly",
  template: 'images2filterOnly',

});



Router.route('/',{
  name: "home",
  template: 'home',
  
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




Router.route('/images1filter/:concept1/:concept2',{ // /images2filter/:metaphorPair_id
  name: "images1filter",
  template: 'images1filter',
  /*
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  */
  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      Session.set('activeTab', "images1filter")
      return {}
  }
});




Router.route('/images2filter/:concept1/:concept2',{ // '/images2filter/:metaphorPair_id'
  name: "images2filter",
  template: 'images2filter',
  /*
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  */
  waitOn: function() {
    Meteor.subscribe("Images2");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      Session.set('activeTab', "images2filter")
      return {}
  }
});




Router.route('/images1find/:concept1/:concept2/',{
  name: "images1find",
  template: 'images1find',

  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      Session.set('activeTab', "images1find")
      return {}
  }
});



Router.route('/images2find/:concept1/:concept2/',{
  name: "images2find",
  template: 'images2find',

  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      //Session.set('activeTab', "images2find")
      return {}
  }
});



Router.route('/combinePairs/:concept1/:concept2',{
  name: "combinePairs",
  template: 'combinePairs',
  /*
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  */
  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      Session.set('activeTab', "combinePairs")
      return {}
  }
});

Router.route('/autoMatches/:concept1/:concept2',{
  name: "autoMatches",
  template: 'autoMatches',
  /*
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  */
  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      Session.set('activeTab', "autoMatches")
      return {}
  }
});


Router.route('/mixesFilter/:concept1/:concept2',{
  name: "mixesFilter",
  template: 'mixesFilter',
  /*
  layoutTemplate: 'standardLayout',
  yieldTemplates: {
      'header': {to: 'header'}
  },
  */
  waitOn: function() {
    //Meteor.subscribe("articles");
    //Charlie added
    //Meteor.subscribe("jokes");
  },
  data: function(){
      Session.set('activeTab', "mixesFilter")
      return {}
  }
});
