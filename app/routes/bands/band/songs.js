import Ember from 'ember';
import { capitalize as capitalizeWords } from '../../../helpers/capitalize';

export default Ember.Route.extend({
  model() {
    return this.modelFor('bands.band');
  },
  resetController(controller) {
    controller.set('songCreationStarted', false);
  },

  actions: {
    didTransition() {
      const band = this.modelFor('bands.band');
      const name = capitalizeWords(band.get('name'));
      document.title = `${name} songs - Rock & Roll`;
    },

    createSong() {
      const controller = this.get('controller');
      const band = this.modelFor('bands.band');
      const song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band,
      });
      song.save().then(function() {
        controller.set('title', '');
      });
    },
  }
});
