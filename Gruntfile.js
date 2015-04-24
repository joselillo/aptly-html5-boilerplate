var pkgjson = require('./package.json');

var config = {
    pkg: pkgjson,
    src: 'src',
    vendor: 'bower_components',
    dist: 'dist'
}

module.exports = function(grunt) {

  grunt.initConfig({
      config: config,
      pkg: config.pkg,
      bower: grunt.file.readJSON('./.bowerrc'),
      watch: {
          files: ['<%= config.src %>'],
          tasks: ['copy']
      },
      copy: {
          dist: {
              files: [
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'jquery/dist/jquery.min.js', dest: '<%=config.dist %>/vendor' },
                  { expand: true, cwd: '<%= config.vendor %>', src: 'modernizr/modernizr.js', dest: '<%=config.dist %>/vendor' },
                  { expand: true, cwd: '<%= config.vendor %>', src: 'modernizr/feature-detects/*', dest: '<%=config.dist %>/vendor' },
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'bootstrap/dist/css/bootstrap.min.css', dest: '<%=config.dist %>/vendor/bootstrap/css' },
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'bootstrap/dist/fonts/*', dest: '<%=config.dist %>/vendor/bootstrap/fonts' },
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'bootstrap/dist/js/bootstrap.min.js', dest: '<%=config.dist %>/vendor/bootstrap/js' },
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'webshim/js-webshim/minified/polyfiller.js', dest: '<%=config.dist %>/vendor/webshim' },
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'webshim/js-webshim/minified/shims/*', dest: '<%=config.dist %>/vendor/webshim/shims' },

                  // TODO: MINIFY
                  { expand: true, flatten: false, cwd: '<%= config.src %>', src: 'css/*', dest: '<%=config.dist %>/src' },
                  { expand: true, flatten: false, cwd: '<%= config.src %>', src: 'js/*', dest: '<%=config.dist %>/js' }
              ]
          }
      },
      uglify : {
          main: {
              files: [{
                  expand: true,
                  cwd: '<%=config.src %>',
                  src: 'js/**/*.js',
                  dest: '<%=config.dist %>/min/js/main.js'
              }]
          }
      },
      cssmin : {
          main: {
              files: [{
                  expand: true,
                  cwd: '<%=config.src %>',
                  src: ['css/**/*.css'],
                  dest: '<%=config.dist %>/min',
                  ext: '.min.css'
              }]
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compress');


  // grunt.registerTask('default', ['jshint']);
  // grunt.registerTask('build-all', ['bower', 'concat', 'cssmin', 'copy']);
  // grunt.registerTask('build-all', ['bower', 'modernizr', 'concat', 'cssmin', 'compress']);
  grunt.registerTask('build-all', ['copy', 'uglify', 'cssmin']);
  grunt.registerTask('watch', ['watch', 'copy']);

};
