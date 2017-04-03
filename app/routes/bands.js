import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('band');
  },

  actions: {
    didTransition() {
      document.title = 'Bands - Rock & Roll';
    },

    createBand() {
      const route = this;
      const controller = this.get('controller');
      const band = this.store.createRecord('band', controller.getProperties('name'));
      band.save().then(function() {
        controller.set('name', '');
        route.transitionTo('bands.band.songs', band);
      });
    }
  }
});
