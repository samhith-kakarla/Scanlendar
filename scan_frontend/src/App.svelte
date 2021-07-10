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

<h1 class="text-purple-800">HOME</h1>

<style global lang="postcss">
  @tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>