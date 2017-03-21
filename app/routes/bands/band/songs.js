import Ember from 'ember';
import Song from '../../../models/song';

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
      var title = controller.get('title');

      var song = Song.create({ title: title, band: band });
      band.get('songs').pushObject(song);
      controller.set('title', '');
    },
  }
});
