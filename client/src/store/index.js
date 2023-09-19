//state manager
import { proxy } from 'valtio';

const state = proxy ({
  homePage: true,
  postsPage: false,
  friendsPage: false,
  favPage: false,
  calendarPage: false,

});

export default state;