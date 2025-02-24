import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  // Maintenance mode is currently disabled
  return next();
  
  /* Maintenance mode configuration (currently disabled)
  const allowedPaths = ['/maintenance', '/images', '/_astro'];
  const isAllowedPath = allowedPaths.some(path => context.url.pathname.startsWith(path));
  
  if (!isAllowedPath) {
    return new Response('', {
      status: 302,
      headers: {
        'Location': '/maintenance'
      }
    });
  }
  
  return next();
  */
}); 