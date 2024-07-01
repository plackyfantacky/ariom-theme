import esbuild from 'esbuild'

await esbuild.build({
    entryPoints: [
        { out: 'js/admin', in: '_src/js/admin.js' },
        { out: 'js/block-asset', in: '_src/js/block-asset.js' },
        { out: 'js/block-editor-asset', in: '_src/js/block-editor-asset.js' },
        { out: 'js/frontend', in: '_src/js/frontend.js' },
    ],
    bundle: true,
    outdir: './',
    target: ['es2018'],
    minify: false,
    sourcemap: true,
    logLevel: 'info',
    plugins: [],
})