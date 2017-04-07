import DS from 'ember-data';
import ENV from 'rock-n-roll/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.apiHost
});
