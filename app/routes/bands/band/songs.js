import Ember from 'ember';

export default Ember.Route.extend({
  resetController(controller) {
    controller.set('songCreationStarted', false);
  },

  actions: {
    didTransition() {
      var band = this.modelFor('bands.band');
      document.title = `${band.get('name')} songs - Rock & Roll`;
    },

    createSong() {
      var controller = this.get('controller');
      var band = this.modelFor('bands.band');
      var song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band,
      });
      song.save().then(function() {
        controller.set('title', '');
      })
    },
  }
});
