import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  // List of paths that should still be accessible
  const allowedPaths = ['/maintenance', '/images', '/_astro'];
  
  // Check if the current path is in the allowed list
  const isAllowedPath = allowedPaths.some(path => context.url.pathname.startsWith(path));
  
  // If not an allowed path, redirect to maintenance
  if (!isAllowedPath) {
    // Use 302 temporary redirect with a relative path
    return new Response('', {
      status: 302,
      headers: {
        'Location': '/maintenance'
      }
    });
  }
  
  return next();
}); 