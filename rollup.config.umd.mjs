import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
    input: './src/parser.js',
    plugins: [nodeResolve({brower: true}),terser()],
    output: [
        {
            file: './dist/parser.umd.js',
            format: 'umd',
            name: 'dense_parser',
            exports: 'named',
            sourcemap: true
        },
        {
            file: './dist/parser.iife.js',
            format: 'iife',
            name: 'dense_parser',
            exports: 'named',
            sourcemap: true
        }
    ]
};
