<script>
  import Router from 'svelte-spa-router';

  import Home from './pages/Home.svelte';
  import Dashboard from './pages/Dashboard.svelte';
  import CreateEvent from './pages/CreateEvent.svelte'; 
</script>

<Router 
  routes={{
    '/': Home, 
    '/dashboard': Dashboard,
    '/create_event': CreateEvent,
  }}
/>