export default {
    projects: [
        {
            contents: [
                './dist/**/*.html',
                './dist/**/*.js',
                './dist/**/*.php',
                './dist/**/*.tsx'
            ],
            cssreset: true,
            input: './dist/css/input.css',
            output: './dist/css/output.css'
        },
        {
            contents: [
                './dist/**/kenan.html',
            ],
            cssreset: false,
            input: './dist/css/kenan-input.css',
            output: './dist/css/kenan-output.css'
        },
    ]
};
