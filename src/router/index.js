import Vue from 'vue'
import Router from 'vue-router'

import home from '../components/home/home.vue'
import buyticket from '../components/buyTicket/buyTicket.vue'
import mall from '../components/mall/mall.vue'
import find from '../components/find/find.vue'
import distress from '../components/distress/distress.vue'
import search from '../components/search/search.vue'
import ongoing from '../components/ongoing/ongoing.vue'
import details from '../components/details/details.vue'
import creditList from '../components/creditList/creditList.vue'
import imgList from '../components/imgList/imgList.vue'
import login from '../components/login/login.vue'
import upcoming from '../components/upcoming/upcoming.vue'
import video from '../components/video/video.vue'
import signup from '../components/signup/signup.vue'
import person from '../components/person/person.vue'

Vue.use(Router)

export default new Router({
  // routes: [{path: '/', name: 'Hello', component: Hello}]
  linkActiveClass: 'active',
  routes: [
    {path: '/home', name: 'home', component: home},
    {path: '/buyticket', name: 'buyticket', component: buyticket},
    {path: '/mall', name: 'mall', component: mall},
    {path: '/find', name: 'find', component: find},
    {path: '/login', name: 'login', component: login},
    {path: '/distress', name: 'distress', component: distress},
    {path: '/search', name: 'search', component: search},
    {path: '/ongoing', name: 'ongoing', component: ongoing},
    {path: '/details', name: 'details', component: details},
    {path: '/creditList', name: 'creditList', component: creditList},
    {path: '/imgList', name: 'imgList', component: imgList},
    {path: '/upcoming', name: 'upcoming', component: upcoming},
    {path: '/video', name: 'video', component: video},
    {path: '/signup', name: 'signup', component: signup},
    {path: '/person', name: 'person', component: person}
  ]
})
