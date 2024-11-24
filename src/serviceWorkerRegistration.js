// src/serviceWorkerRegistration.js

// This is the core of the service worker registration process
// It handles the registration of the service worker for offline functionality

// Check if service worker is supported
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.match(
        /^127(\.[0-9]{1,3}){3}$/
      )
  );
  
  // Register the service worker
  export function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // The service worker is only registered in production for performance reasons
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // Ensure the service worker is only registered for the same domain
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // Service worker will only work on localhost in development mode
          checkValidServiceWorker(swUrl);
        } else {
          // Register service worker for production
          registerValidSW(swUrl);
        }
      });
    }
  }
  
  // If the service worker is available, register it
  function registerValidSW(swUrl) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
  
  // Check if the service worker is valid
  function checkValidServiceWorker(swUrl) {
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    })
      .then((response) => {
        // If the response is good, register the service worker
        if (response.status === 404) {
          // Service worker doesn't exist
          console.log('No service worker found. Is your app built for production?');
        } else if (response.ok) {
          // Register the service worker
          registerValidSW(swUrl);
        }
      })
      .catch((error) => {
        console.error('Error during service worker check:', error);
      });
  }
  
  // Unregister service worker if needed
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error('Error during service worker unregister:', error);
        });
    }
  }
  