

Template.brainstorm2_header.helpers({
     concept: function(){
        var concept = Router.current().params.concept2
        return concept
    },   
})

/////////////////////////
// OBJECT
/////////////////////////

AutoForm.hooks({
  insertBrainstorm2_object: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        var concept = Router.current().params.concept2
        doc.concept = concept 
        doc.brainstorm_type = "object" 
        this.result(doc);
      }
    },
  },
});


Template.listBrainstorm2_object.helpers({
  count_brainstorm_object: function(){
    var concept = Router.current().params.concept2
    return Brainstorm2.find({
        //metaphorPair_id: metaphorPair_id, 
        //createdBy: Meteor.userId()
        concept:concept,
        brainstorm_type: "object",
    }).count();
    
  },
  
  brainstorm_object: function () {
    var concept = Router.current().params.concept2
    return Brainstorm2.find({
        //metaphorPair_id: metaphorPair_id, 
        //createdBy: Meteor.userId()
        concept:concept,
        brainstorm_type: "object",
    }, {sort: {timestamp: 1}});
  },

})


/////////////////////////
// ACTIVITY
/////////////////////////

AutoForm.hooks({
  insertBrainstorm2_activity: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        var concept = Router.current().params.concept2
        doc.concept = concept 
        doc.brainstorm_type = "activity" 
        this.result(doc);
      }
    },
  },
});


Template.listBrainstorm2_activity.helpers({
  count_brainstorm_activity: function(){
    var concept = Router.current().params.concept2
    return Brainstorm2.find({
        //metaphorPair_id: metaphorPair_id, 
        //createdBy: Meteor.userId()
        concept:concept,
        brainstorm_type: "activity",
    }).count();
    
  },
  
  brainstorm_activity: function () {
    var concept = Router.current().params.concept2
    return Brainstorm2.find({
        //metaphorPair_id: metaphorPair_id, 
        //createdBy: Meteor.userId()
        concept:concept,
        brainstorm_type: "activity",
    }, {sort: {timestamp: 1}});
  },

})


/////////////////////////
// PERSON
/////////////////////////

AutoForm.hooks({
  insertBrainstorm2_person: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        var concept = Router.current().params.concept2
        doc.concept = concept 
        doc.brainstorm_type = "person" 
        this.result(doc);
      }
    },
  },
});


Template.listBrainstorm2_person.helpers({
  count_brainstorm_person: function(){
    var concept = Router.current().params.concept2
    return Brainstorm2.find({
        //metaphorPair_id: metaphorPair_id, 
        //createdBy: Meteor.userId()
        concept:concept,
        brainstorm_type: "person",
    }).count();
    
  },
  
  brainstorm_person: function () {
    var concept = Router.current().params.concept2
    return Brainstorm2.find({
        //metaphorPair_id: metaphorPair_id, 
        //createdBy: Meteor.userId()
        concept:concept,
        brainstorm_type: "person",
    }, {sort: {timestamp: 1}});
  },

})


/////////////////////////
// Setting
/////////////////////////

AutoForm.hooks({
  insertBrainstorm2_setting: {
    before: {
      insert: function(doc) {
        doc.timestamp = new Date().getTime();
        var concept = Router.current().params.concept2
        doc.concept = concept 
        doc.brainstorm_type = "setting" 
        this.result(doc);
      }
    },
  },
});


Template.listBrainstorm2_setting.helpers({
  count_brainstorm_setting: function(){
    var concept = Router.current().params.concept2
    return Brainstorm2.find({
        //metaphorPair_id: metaphorPair_id, 
        //createdBy: Meteor.userId()
        concept:concept,
        brainstorm_type: "setting",
    }).count();
    
  },
  
  brainstorm_setting: function () {
    var concept = Router.current().params.concept2
    return Brainstorm2.find({
        //metaphorPair_id: metaphorPair_id, 
        //createdBy: Meteor.userId()
        concept:concept,
        brainstorm_type: "setting",
    }, {sort: {timestamp: 1}});
  },

})