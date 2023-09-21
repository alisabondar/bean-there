//state manager
import { proxy } from 'valtio';

const state = proxy ({
  homePage: true,
  login: false,
  register: false,
  postsPage: false,
  loaction: false,
  friendsPage: false,
  favPage: false,
  calendarPage: false,

});

export default state;