import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';

export default {
	entry: 'src/index.ts',
	dest: 'dist/bundle.min.js',
    sourceMap: true,
	format: 'umd',
    moduleName: 'moduleName',
    globals: {
        react: "React",
        'react-dom': "ReactDOM"
    },
	external: [
		"react",
		"react-dom"
	],
	plugins: [
		typescript({
			jsx: 'react'
		}),
        uglify({
			// output: {
			// 	beautify: true
			// }
		})
	]
};
