var pkgjson = require('./package.json');

var config = {
    pkg: pkgjson,
    vendor: 'bower_components',
    src: 'src',
    dist: 'dist',
    build: 'dist/build'
}

module.exports = function(grunt) {

  config.bowerrc = grunt.file.readJSON('./.bowerrc');

  grunt.initConfig({
      config: config,
      pkg: config.pkg,
      bower: config.bowerrc,
      watch: {
          main: {
              files: ['<%= config.src %>/**'],
              tasks: ['copy', 'uglify', 'cssmin', 'compress'],
              options: {
                  events: ['all']
              }
          }
      },
      copy: {
          main: {
              files: [
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'jquery/dist/jquery.min.js', dest: '<%=config.dist %>/vendor' },
                  { expand: true, cwd: '<%= config.vendor %>', src: 'modernizr/modernizr.js', dest: '<%=config.dist %>/vendor' },
                  { expand: true, cwd: '<%= config.vendor %>', src: 'modernizr/feature-detects/*', dest: '<%=config.dist %>/vendor' },
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'bootstrap/dist/css/bootstrap.min.css', dest: '<%=config.dist %>/vendor/bootstrap/css' },
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'bootstrap/dist/fonts/*', dest: '<%=config.dist %>/vendor/bootstrap/fonts' },
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'bootstrap/dist/js/bootstrap.min.js', dest: '<%=config.dist %>/vendor/bootstrap/js' },
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'webshim/js-webshim/minified/polyfiller.js', dest: '<%=config.dist %>/vendor/webshim' },
                  { expand: true, flatten: true, cwd: '<%= config.vendor %>', src: 'webshim/js-webshim/minified/shims/*', dest: '<%=config.dist %>/vendor/webshim/shims' },

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
      },
      compress: {
          main: {
              type: 'zip',
              options: {
                  archive: '<%= config.build %>/aptly-theme.zip'
              },
              files: [
                  { expand: true, cwd: '<%= config.dist %>', src: ['**'] }
              ]
          }

      }, clean : {
          main: {
              src: ['<%= config.dist %>/**', '<%= config.build %>/**']
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // grunt.registerTask('default', ['jshint']);
  // grunt.registerTask('build-all', ['bower', 'concat', 'cssmin', 'copy']);
  // grunt.registerTask('build-all', ['bower', 'modernizr', 'concat', 'cssmin', 'compress']);
  grunt.registerTask('build-all', ['copy', 'uglify', 'cssmin', 'compress']);
  grunt.registerTask('build-watch', ['watch']);

};
