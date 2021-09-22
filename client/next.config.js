const withTM = require("next-transpile-modules");
const withPlugins = require("next-compose-plugins");

module.exports = {

    images: {
        domains: ['res.cloudinary.com']
    },

    // withPlugins: (
    //     [
    //         [
    //             withTM,
    //             {
    //                 transpileModules: ['react-icons/all'], // you can add other modules to this array
    //             },
    //         ],
    //     ]
    // )

};
