# Mosaïqué
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## Description 
A blog template showing articles displayed in mosaic layout. Includes a synchronous image upload feature, useful for visualising the layout at scale.

Images uploaded are auto deleted.  Here's a [live url](https://mosaïqué.onrender.com).

## Featues
- Mosaic / Masonry articles layout.
- Synchronous Image file upload, instantly, adds a new article with this image to the page.

## Development
The Nuxt web application and the Node Express Server coexist in this repository as a monorepo. the Node Express server code is located in the `/backend` directory.

- The only environment variable required is `WEB_URL`.it points to the url of the web app. an example is included in the `.env.example` file.

- running `npm run dev` locally starts the server on port `4000` and the Nuxt app on port `3000`, exposing the app to you at `http://localhost:3000`


## License & Copyright

MIT © 
