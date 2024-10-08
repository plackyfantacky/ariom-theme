import esbuild from 'esbuild'

await esbuild.build({
    entryPoints: [
        { out: 'js/frontend', in: '_src/js/frontend.js' },
    ],
    bundle: true,
    outdir: './',
    target: ['es2018'],
    minify: true,
    sourcemap: false,
    logLevel: 'info',
    plugins: [],
})