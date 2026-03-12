export default defineNuxtRouteMiddleware((to) => {
  // Use the non-httpOnly flag cookie for client-side auth detection
  const loggedIn = useCookie('admin_logged_in')
  
  // Protect all /admin routes except login
  if (!loggedIn.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }
  
  // If already logged in, redirect away from login page to dashboard
  if (loggedIn.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
