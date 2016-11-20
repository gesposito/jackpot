import moment from 'moment';

module.exports = {
  'formatter': function(time) {
    return moment(time).format('MM/DD/YYYY');
  },

};
