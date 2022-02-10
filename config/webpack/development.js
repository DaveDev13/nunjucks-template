import common from './common.js';

export default {
    ...common,
    mode: 'development',
    devtool: 'source-map',
    stats: { all: false, colors: true, timings: true },
};
