import Vue from "vue"
import VueRouter from "vue-router"
import Index from './components/Index'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

Vue.use(VueRouter)

export const router = new VueRouter({
    routes : [
        
        {
            path : '/',
            component : Index,
            meta : {
                title : 'Zipmend'
            }
        },
        {
            path : '*',
            redirect : '/'
        }
    ],
    mode : "history"
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
  })