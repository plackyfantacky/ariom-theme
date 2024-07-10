import esbuild from 'esbuild'

let ctx

try {
    ctx = await esbuild.context({
        entryPoints: [
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
    await ctx.watch()
    console.log('watching...')
} catch (e) {
    console.error('config error: ', e)
    process.exit(1)
}