var Dinos = new Meteor.Collection("DoomedDinos");

if (Meteor.isClient) {

  Template.header.title = function() {
    return "Hello Yucatan!";
  };

  Template.header.tagline = function() {
    return "Killing All the Dinos";
  };

  Template.addDino.events({
    'click #addDino' : function() {
      var input = $('#dinoToAdd');
      Dinos.insert({ name: input.val() });
      input.val('');
    }
  });

  Template.dinos.dinos = function() {
    return Dinos.find({}, {sort: [['votes', 'desc'], ['name', 'asc']]});
  };

  Template.dino.events({
    'click tr' : function() {
      Session.set('selected_dino', this._id);
    }
  });

  Template.dino.selected = function() {
    return Session.equals('selected_dino', this._id) ? "selected" : "";
  };

  Template.hateAndDestroy.events({
    'click #hate'    : function() {
      var id = Session.get('selected_dino');
      Dinos.update(id, { $inc: { votes : 1 } });
    },
    'click #destroy' : function() {
      var id = Dinos.findOne({}, {sort : [['votes', 'desc'], ['name', 'asc']] })._id;
      Dinos.remove(id);
    }
  });

}

