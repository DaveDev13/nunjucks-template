import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {isDev} from '../store';

export const module = {
    rules: [
        // JavaScript
        {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            },
        },
        // CSS
        {
            test: /\.(s[ac]|c)ss$/,
            exclude: /node_modules/,
            use: [
                isDev()
                    ? 'style-loader'
                    : MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
                'postcss-loader',
            ],
        },
        // Images
        {
            test: /\.(png|jpg|jpeg|gif|ico|webp|avif)$/i,
            type: 'assets', // Webpack 5.x: loads file into output folter (file-loader)
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: '[name].[contenthash].[ext]',
                        // useRelativePath: true,
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 85
                        },
                        optipng: {
                            enabled: true,
                        },
                        pngquant: {
                            quality: '75-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        webp: {
                            quality: 85
                        }
                    }
                }
            ]
        },
        // SVG
        {
            test: /\.(svg)$/i,
            type: 'assets' // basically a raw loader
            // type: 'asset/inline' // 'inlines' image data into img src
        },
        // Fonts
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'assets/resource', // Webpack 5.x: loads file into output folter (file-loader)
        },
        // GLSL
        {
            test: /\.(glsl|vs|fs|vert|frag)$/i,
            type: 'assets', // Webpack 5.x: loads file content into bundled JS file (raw-loader)
            exclude: /node_modules/
        },
        // { test: /\.(glsl|vs|fs|vert|frag)$/i, loader: 'glslify-loader', exclude: /node_modules/ }
        // Models
        {
            test: /\.(glb|gltf|fbx|obj)$/,
            type: 'assets' // Webpack 5.x: loads file into output folder (file-loader)
        }
    ]
};
