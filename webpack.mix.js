const mix = require('laravel-mix');

mix.js('resources/js/app.jsx', 'public/js')
   .react()
   .postCss('resources/css/app.css', 'public/css', [
        require('tailwindcss'),
        require('autoprefixer'),
    ])
   .sourceMaps()
   .options({
       hmrOptions: {
           host: 'localhost',
           port: '8080',
       },
   });
