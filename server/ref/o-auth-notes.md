#### Registering on FB O-Auth

https://developers.facebook.com/docs/facebook-login 

1. https://developers.facebook.com/   
2. Click on My Apps and add new app
3. select website
4. Skip wizard 
5. Create a new App ID
6. Select a category
7. Copy App ID and Client Secret
8. Set callbackURL: "//localhost:3000/auth/facebook/callback" (// is protocol relative, allows http and https, but in development http should also be fine)
9. On the FB Devs page, set an email (reqd)
10. Add a new platform, website with siteURL http://localhost:3000
11. Add a valid OAuth redirectURI http://localhost:3000/auth/facebook/callback

IMPORTANT: 
- CORS error occurs when calling /auth/facebook from angular/service
- when using href="/auth/facebook" - no such problem