import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
    input: './src/parser.js',
    plugins: [terser()],
    output: [
        {
            file: './dist/parser.es.js',
            format: 'es',
            sourcemap: true
        }, 
        {
            file: './dist/parser.cjs.js',
            format: 'cjs',
            exports: 'named',
            sourcemap: true
        }
    ]
};
