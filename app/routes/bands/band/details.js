import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save() {
      const controller = this.get('controller');
      const band = controller.get('model');
      return band.save();
    },
    willTransition(transition) {
      let controller = this.get('controller'),
      leave;

      if (controller.get('isEditing')) {
        leave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
        if (leave) {
          controller.set('isEditing', false);
        } else {
          transition.abort();
        }
      }
    },
  }
});
