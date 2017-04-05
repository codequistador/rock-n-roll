import Ember from 'ember';
import { capitalize } from '../../../helpers/capitalize';
const { Controller, computed, isEmpty } = Ember;

export default Controller.extend({
  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },
  songCreationStarted: false,
  title: '',

  isAddButtonDisabled: computed('title', function() {
    return isEmpty(this.get('title'));
  }),

  canCreateSong: computed('songCreationStarted', 'model.songs.length', function() {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),

  sortBy: 'ratingDesc',
  sortProperties: computed('sortBy', function() {
    const options = {
      'ratingDesc': 'rating:desc,title:asc',
      'ratingAsc': 'rating:asc,title:asc',
      'titleDesc': 'title:desc',
      'titleAsc': 'title:asc'
    };
    return options[this.get('sortBy')].split(',');
  }),

  sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),

  searchTerm: '',

  matchingSongs: computed('model.songs.@each.title', 'searchTerm', function() {
    return this.get('model.songs').filter((song) => {
      const searchTerm = this.get('searchTerm').toLowerCase();
      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  newSongPlaceholder: computed('model.name', function() {
    const bandName = this.get('model.name');
    return `New ${capitalize(bandName)} song`;
  }),

  actions: {
    enableSongCreation() {
      this.set('songCreationStarted', true);
    },
    updateRating: function(params) {
      let { item: song, rating } = params;
      if (song.get('rating') === rating) {
        rating = null;
      }

      song.set('rating', rating);
      return song.save();
    }
  }
});
