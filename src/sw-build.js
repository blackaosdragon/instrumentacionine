const workboxBuild = require('workbox-build');

const buildSW = () => {
    return workboxBuild.injectManifest({
        swSrc: "src/sw-custom.js",
        swDest: "build/sw.js",
        globDirectory: "build",
        globPatterns: ["**\/*.{js,css,html,png,svg}"],
        ​maximumFileSizeToCacheInBytes: 5 * 1024 * 102
    })
    .then(({count,size,warnings})=>{
        warnings.forEach(console.warn);
        console.log(`${count} files will be precached, totaling ${size/(1024 * 1024)}Mbs.`)
    })
}
buildSW();

    