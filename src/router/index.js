import { createRouter, createWebHistory } from 'vue-router'
import Loader from '../views/Loader.vue'
import Office from '../views/Office.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Loader,
      meta: {
        title: 'Vir | Builder / Storyteller',
        metaTags: [
          {
            name: 'title',
            content: 'Vir | Builder / Storyteller'
          },
          {
            name: 'description',
            content:
              "Vir's portfolio — from law to theatre to video production to building brands. A builder and storyteller who's done a bit of everything."
          },
          {
            name: 'keywords',
            content: 'vir, portfolio, builder, storyteller, video production, brand viral, leap media, theatre, content creator'
          },
          {
            name: 'author',
            content: 'Vir'
          },
          {
            name: 'robots',
            content: 'index, follow'
          },
          {
            name: 'theme-color',
            content: '#000000'
          },
          {
            name: 'mobile-web-app-capable',
            content: 'yes'
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
          },
          {
            name: 'apple-mobile-web-app-title',
            content: 'Vir | Builder / Storyteller'
          },
          {
            name: 'application-name',
            content: 'Vir | Builder / Storyteller'
          },
          {
            name: 'twitter:card',
            content: 'summary'
          },
          {
            name: 'twitter:title',
            content: 'Vir | Builder / Storyteller'
          },
          {
            name: 'twitter:description',
            content:
              "Vir's portfolio — from law to theatre to video production to building brands. A builder and storyteller who's done a bit of everything."
          },
          {
            name: 'twitter:image',
            content: '/img/logo-portfolio-black.png'
          },
          {
            name: 'twitter:image:alt',
            content: 'Vir Portfolio Logo'
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:title',
            content: 'Vir | Builder / Storyteller'
          },
          {
            property: 'og:description',
            content:
              "Vir's portfolio — from law to theatre to video production to building brands. A builder and storyteller who's done a bit of everything."
          },
          {
            property: 'og:site_name',
            content: 'Vir | Builder / Storyteller'
          },
          {
            property: 'og:image',
            content: '/img/logo-portfolio-black.png'
          },
          {
            property: 'og:image:alt',
            content: 'Vir Portfolio Logo'
          },
          {
            property: 'og:locale',
            content: 'en_US'
          }
        ]
      }
    },
    {
      path: '/office',
      name: 'Office',
      component: Office,
      meta: {
        title: 'Desktop | Vir - Builder / Storyteller',
        metaTags: [
          {
            name: 'title',
            content: 'Desktop | Vir - Builder / Storyteller'
          },
          {
            name: 'description',
            content:
              "Vir's portfolio desktop — explore projects, services, and the story of a builder and storyteller."
          },
          {
            name: 'keywords',
            content: 'vir, portfolio, desktop, builder, storyteller, video production, brand viral, leap media'
          },
          {
            name: 'author',
            content: 'Vir'
          },
          {
            name: 'robots',
            content: 'index, follow'
          },
          {
            name: 'theme-color',
            content: '#000000'
          },
          {
            name: 'mobile-web-app-capable',
            content: 'yes'
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
          },
          {
            name: 'apple-mobile-web-app-title',
            content: 'Desktop | Vir - Builder / Storyteller'
          },
          {
            name: 'application-name',
            content: 'Desktop | Vir - Builder / Storyteller'
          },
          {
            name: 'twitter:card',
            content: 'summary'
          },
          {
            name: 'twitter:title',
            content: 'Desktop | Vir - Builder / Storyteller'
          },
          {
            name: 'twitter:description',
            content:
              "Vir's portfolio desktop — explore projects, services, and the story of a builder and storyteller."
          },
          {
            name: 'twitter:image',
            content: '/img/logo-portfolio-black.png'
          },
          {
            name: 'twitter:image:alt',
            content: 'Vir Portfolio Logo'
          },
          {
            name: 'og:type',
            content: 'website'
          },
          {
            name: 'og:title',
            content: 'Desktop | Vir - Builder / Storyteller'
          },
          {
            name: 'og:description',
            content:
              "Vir's portfolio desktop — explore projects, services, and the story of a builder and storyteller."
          },
          {
            name: 'og:site_name',
            content: 'Desktop | Vir - Builder / Storyteller'
          },
          {
            name: 'og:image',
            content: '/img/logo-portfolio-black.png'
          },
          {
            name: 'og:image:alt',
            content: 'Vir Portfolio Logo'
          },
          {
            name: 'og:locale',
            content: 'en_US'
          }
        ]
      }
    }
  ]
})

export default router
