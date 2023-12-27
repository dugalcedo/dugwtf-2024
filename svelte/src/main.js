import './style/index.css'
import App from './App.svelte'

document.documentElement.classList = localStorage.getItem('dugwtf-theme') || 'dark'

const app = new App({
  target: document.getElementById('app'),
})

export default app
