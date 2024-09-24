// eglador.config.js
export default {
    contents: [
        './dist/**/*.html',
        './dist/**/*.js',
        './dist/**/*.php',
        './dist/**/*.tsx'
    ],
    cssreset: true, // CSS reset dosyası eklensin mi?
    input: './dist/input.css',  // input dosya yolu
    output: './dist/output.css' // output dosya yolu
};
