import {entry, output, optimization, resolve, module, plugins} from '../options';
import {isDev} from '../store';
// import * as plugins from './plugins';
// import * as loaders from './loaders';

export default {
    entry,
    output,
    watchOptions: {
        // aggregateTimeout: 300, // Delay the first rebuild (in ms)
        // poll: 1000, // Poll using interval (in ms or a boolean)
        ignored: /node_modules/, // Ignore to decrease CPU usage
    },
    experiments: {
        // WebAssembly as async module (Proposal)
        syncWebAssembly: true,
        // WebAssembly as sync module (deprecated)
        outputModule: true,
        // Allow to output ESM
        topLevelAwait: true,
        // Allow to use await on module evaluation (Proposal)
    },
    target: isDev() ? 'web' : 'browserslist',
    module,
    plugins,
    optimization,
    resolve,
};
