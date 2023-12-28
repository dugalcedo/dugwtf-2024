import Home from '../routes/Home.svelte'
import Contact from '../routes/Contact.svelte'
import Dugscog from '../routes/Dugscog.svelte'
import More from '../routes/More.svelte'
    import Map from '../routes/more/Map.svelte'
    import Recs from '../routes/more/Recs.svelte'
  /*
    MAIN rouutes
        Home

  */

const router = [
    {
        linkText: "home",
        component: Home,
        path: '/'
    },
    {
        linkText: "music",
        component: Dugscog,
        path: '/music'
    },
    {
        linkText: "contact",
        component: Contact,
        path: '/contact'
    },
    {
        linkText: 'more',
        component: More,
        path: '/more'
    },
    // non nav-bar routes
    {
        component: Map,
        path: '/more/map'
    },
    {
        component: Recs,
        path: '/more/recs'
    }
]

export default router