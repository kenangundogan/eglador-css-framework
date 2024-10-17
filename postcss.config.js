// postcss.config.js
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import sortMediaQueries from 'postcss-sort-media-queries';

export default {
    plugins: [
        cssnano({
            preset: 'default',
        }),
        autoprefixer(),
        sortMediaQueries(),
    ],
};
