module.exports = function(grunt) {

  grunt.initConfig({
    // jshint: {
    //   files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
    // options: {
    //   globals: {
      //      jQuery: true
      //    }
          //  }
      //},
      //watch: {
      //files: ['<%= jshint.files %>'],
      //tasks: ['jshint']
      //}
    bower: {
        dev: {
            dest: 'vendor/',
            // font_dest: "...",
            // css_dest: "..."
            options: {
                keepExpandedHierarchy: true,
                expand: true,
                packageSpecific: {
                    modernizr: {
                        dest: 'vendor/modernizr/src'
                    },
                    jquery: {
                        dest: 'vendor/',
                        files: [ 'dist/jquery.js',  "dist/query.min.map"]
                    }/*,
                    bootstrap: {
                        dest: 'public/vendor/bootstrap'
                    }*/
                }
            }
        }
    },
    modernizr: {

          dist: {
              // [REQUIRED] Path to the build you're using for development.
              "devFile" : "vendor/modernizr/src/modernizr/modernizr.js",

              // Path to save out the built file.
              "outputFile" : "vendor/modernizr/build/modernizr-custom.js",

              // Based on default settings on http://modernizr.com/download/
              "extra" : {
                  "shiv" : true,
                  "printshiv" : false,
                  "html5shiv": true,
                  "load" : true,
                  "mq" : false,
                  "cssclasses" : true
              },

              // Based on default settings on http://modernizr.com/download/
              "extensibility" : {
                  "addtest" : false,
                  "prefixed" : false,
                  "teststyles" : false,
                  "testprops" : false,
                  "testallprops" : false,
                  "hasevents" : false,
                  "prefixes" : false,
                  "domprefixes" : false,
                  "cssclassprefix": ""
              },

              // By default, source is uglified before saving
              "uglify" : false,

              // Define any tests you want to implicitly include.
              "tests" : [],

              // By default, this task will crawl your project for references to Modernizr tests.
              // Set to false to disable.
              "parseFiles" : false,

              // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
              // except files that are in node_modules/.
              // You can override this by defining a "files" array below.
              // "files" : {
              // "src": []
              // },

              // This handler will be passed an array of all the test names passed to the Modernizr API, and will run after the API call has returned
              // "handler": function (tests) {},

              // When parseFiles = true, matchCommunityTests = true will attempt to
              // match user-contributed tests.
              "matchCommunityTests" : false,

              // Have custom Modernizr tests? Add paths to their location here.
              "customTests" : []
          }

      },
      concat: {
        /*css: {
            src : [
                "bower_components/bootstrap/dist/css/bootstrap.css",
                "src/css/style.css"
            ],
            dest: "public/css/style.css"
        },*/
        script: {
            src : [
                "vendor/jquery/dist/jquery.js",
                "vendor/modernizr/build/modernizr-custom.js"/*,
                "vendor/jquery/dist/jquery.min.map"*/
            ],
            dest: "public/js/build.js"
        }
    },
    cssmin: {
        options : {

        },
        target: {
            files: { "public/css/bootstrap.css" : [ "vendor/bootstrap/dist/css/bootstrap.css" ] }
            /*files: [{
                expand: true,
                cwd: "vendor/",
                src: ['*.css', '!*.min.css'],
                dest: 'public/css',
                ext: '.min.css'
            }]*/
        }
    }/*,
    copy: {

    }*/
  });

  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks("grunt-modernizr");

  // grunt.registerTask('default', ['jshint']);
  // grunt.registerTask('build-all', ['bower', 'concat', 'cssmin', 'copy']);
  grunt.registerTask('build-all', ['bower', 'modernizr', 'concat', 'cssmin']);

};
