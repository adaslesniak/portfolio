require('esbuild').build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'public/bundle.js',
  loader: { '.js': 'jsx' },
  sourcemap: true,
  define: { 'process.env.NODE_ENV': '"development"' },
}).catch(() => process.exit(1));
