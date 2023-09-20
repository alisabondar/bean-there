//state manager
import { proxy } from 'valtio';

const state = proxy ({
  homePage: true,
  login: false,
  postsPage: false,
  friendsPage: false,
  favPage: false,
  calendarPage: false,

});

export default state;