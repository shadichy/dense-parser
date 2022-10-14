import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
    input: './src/parser.js',
    plugins: [nodeResolve({brower: true}),terser()],
    output: [
        {
            file: './dist/parser.umd.js',
            format: 'umd',
            name: 'dense-parser',
            sourcemap: true
        }
    ]
};
