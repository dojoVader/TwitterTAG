## TwitterTAG

## What is TwitterTAG ? 

TwitterTAG is a Chrome extension that allows you tag X profiles with a label, the goal is to easily identify a profile with a label. The extension is currently built in the following technlogies:

* React TypeScript
* Zustand
* Webpack with Plugins
* Chrome Extension API

The purpose of building this Chrome extension is to illustrate the structure of building Chrome extension using React, TypeScript and Zustand with Webpack. it serves both as a real world extension, and also a sample of building React Chrome extension with Webpacks. 

#### Structure of the Extension

* background/background.ts - The background script of the extension
* components - The React components of the extension
* contentScripts - The content scripts of the extension that injects the React app into the DOM
* interfaces - The interfaces of the extension for Twitter LD JSON
* popup - The popup of the extension
* sidePanel - The side panel of the extension
* static - This contains the static files of the extension including the manifest.json
* utils - The utility functions of the extension
* zustand - The Zustand store of the extension, this uses the middleware for persisting the state of the extension


## Webpack Configuration

This extension heavily relies on Webpack for bundling and building the extension. The Webpack configuration is located in the webpack.config.js file. The configuration is split into two parts, the common configuration and the development and production configuration. The common configuration is shared between the development and production configuration. The Webpack configuration uses the following plugins:

* CopyWebpackPlugin - This plugin is used to copy the static files of the extension to the build directory
* HtmlWebpackPlugin - This plugin is used to generate the HTML file for the extension, this is necessary for popup, side-panel and options pages.

The entry files for compilation are configured by the entry property of the Webpack configuration. The entry files are:
<br><br><br>
#### Entry files for the extension
```javascript
    module.exports = {
        entry: {
        config: path.resolve("src/constant/config.ts"),
        background: path.resolve("src/background/background.ts"),
        contentScript: path.resolve("src/contentScript/contentScript.tsx"),
        popup: path.resolve("src/popup/popup.tsx"),
        sidepanel: path.resolve("src/sidepanel/sidepanel.tsx")
    }
```
<br><br>
#### Module configuration for transpiling TypeScript and React

```javascript
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/i,
      },
      {
        type: "asset/resource",
        test: /\.(jgp|jpeg|png|woff|woff2|eot|ttf|svg)$/,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
```
<br><br>
#### Generates the HTML files for the extension, and copies the static files to the build directory
```javascript
plugins: [
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
        patterns: [
            {
                from: path.resolve("src/static"),
                to: path.resolve("dist"),
            },
            {
                from: path.resolve("src/contentScript/contentScript.css"),
                to: path.resolve("dist")
            }
        ],
    }),
    ...getHtmlPlugins(["popup", "options","sidepanel"]),
],
```

#### Resolves the extensions for the TypeScript files and sets the output path for the build files
```javascript
resolve: {
    extensions: [".tsx", ".ts", ".js"],
},
output: {
    filename: "[name].js",
        path: path.resolve("dist"),
        publicPath: "/",
},
```

<br><br>

This setup ensures that the "contentScript" chunk is not split or optimized by the splitChunks plugin, likely because it needs to remain as a single, cohesive file for the Chrome extension to function correctly. This is a common practice when dealing with content scripts in Chrome extensions, as they often need to be loaded as a single file
```javascript
optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== "contentScript";
      },
    },
  },
```
Screenshot of the extension in action:

![Screenshot](/screenshots/GdjrphGXoAAhwIa.jpeg)
![Screenshot](/screenshots/GdjtPtFXQAAsg23.png)
![Screenshot](/screenshots/GdjtV0fWkAAHvHE.png)
![Screenshot](/screenshots/GdjtxWoXYAAMDmB.png)

