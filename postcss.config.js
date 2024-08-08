module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-nesting': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production' ? { 
                cssnano: {
                    preset: 'default',
                },
            } : {}),
    }
}