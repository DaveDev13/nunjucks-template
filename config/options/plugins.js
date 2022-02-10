import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {config} from '../../config';
import {isDev, paths} from '../store';
/**
 * Плагин линтера для webpack
 *
 * @see https://github.com/eslint/eslint
 */

const injectScriptTag = new HtmlWebpackPlugin({
    templateContent: function (params) {
        console.log(params.htmlWebpackPlugin.files);
        return `
            {% macro javascripts(params) %}
            ${config.html.inject.js ? params.htmlWebpackPlugin.files.js.map(file => {return `<script {{params}} src="${config.html.prefix}/scripts/${file}"></script>`}).join('') : ''}
            {% endmacro %}

            {% macro css(params) %}
            ${config.html.inject.css ? params.htmlWebpackPlugin.files.css.map(file => {return `<link {{params}} rel="stylesheet" type="text/css" href="${config.html.prefix}/scripts/${file}">`}).join('') : ''}
            {% endmacro %}
        `;
    },
    filename: `${paths.src.html}/layouts/macros/assets.njk`, // файл в который будут записываться макросы скриптов и стилей
    publicPath: '',
    inject: false,
    cache: false,
});

export const plugins = [
    new ESLintPlugin({
        failOnError: false,
    }),
    new MiniCssExtractPlugin({
        filename: isDev() ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDev() ? '[name].css' : '[name].[contenthash].css',
    }),
    injectScriptTag,
];
