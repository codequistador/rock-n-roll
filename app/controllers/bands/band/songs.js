import Ember from 'ember';
import { capitalize } from '../../../helpers/capitalize';

export default Ember.Controller.extend({
  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },
  songCreationStarted: false,
  title: '',

  isAddButtonDisabled: Ember.computed('title', function() {
    return Ember.isEmpty(this.get('title'));
  }),

  canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),

  sortBy: 'ratingDesc',
  sortProperties: Ember.computed('sortBy', function() {
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

  matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function() {
    const searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model.songs').filter(function(song) {
      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  newSongPlaceholder: Ember.computed('model.name', function() {
    const bandName = this.get('model.name');
    return `New ${capitalize(bandName)} song`;
  }),

  actions: {
    enableSongCreation() {
      this.set('songCreationStarted', true);
    },
    updateRating: function(params) {
      let song = params.item;
      let rating = params.rating;
      if (song.get('rating') === rating) {
        rating = null;
      }

      song.set('rating', rating);
      return song.save();
    }
  }
});
