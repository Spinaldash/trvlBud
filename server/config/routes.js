'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},

  {method: 'post', path: '/auth/login', config: require('../routes/users/login')},
  {method: 'post', path: '/users', config: require('../routes/users/update')},


  {method: 'post', path: '/auth/signup', config: require('../routes/users/register')},
  {method: 'post', path: '/auth/facebook', config: require('../routes/users/facebook')},
  {method: 'post', path: '/auth/github', config: require('../routes/users/github')},
  {method: 'get', path: '/auth/twitter', config: require('../routes/users/twitter')},

  {method: 'post', path: '/vacations', config: require('../routes/vacations/create')},
  {method: 'get', path: '/vacations/{vacationId}', config: require('../routes/vacations/show')},
  {method: 'get', path: '/vacations', config: require('../routes/vacations/list')},

  {method: 'post', path: '/flights', config: require('../routes/vacations/flights')},
  {method: 'post', path: '/vacations/{vacationId}/flights/purchase', config: require('../routes/vacations/purchase')}
];
