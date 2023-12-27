import Home from '../routes/Home.svelte'
import Contact from '../routes/Contact.svelte'
import Dugscog from '../routes/Dugscog.svelte'
import More from '../routes/More.svelte'

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
    }
]

export default router