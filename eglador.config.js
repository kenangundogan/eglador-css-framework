
export default {
    projects: [
        {
            name: 'primary',
            contents: [
                './dist/**/*.html',
                './dist/**/*.js',
                './dist/**/*.php',
                './dist/**/*.tsx'
            ],
            cssreset: true,
            input: './dist/css/input1.css',
            output: './dist/css/output1.css'
        },
        {
            name: 'secondary',
            contents: [
                './dist/**/*.html',
            ],
            cssreset: true,
            input: './dist/css/input2.css',
            output: './dist/css/output2.css'
        }
    ]
};
