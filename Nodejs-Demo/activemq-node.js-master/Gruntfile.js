module.exports = function(grunt) {

    var paths = ['lib/*.js','test/**/*.js','Gruntfile.js'];
    var jshintrc  = grunt.file.readJSON('.jshintrc');
    jshintrc.node = true;

  // Project contribfiguration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    node: jshintrc,
    jsbeautifier:{
        src: paths,
        options:{
            option:'.jsbeautifyrc'
        }
    },
    verify :{
        src: paths,
        options:{
            mode: 'VERIFY_ONLY',
            config:'.jsbeatifyrc'
        }
    },
    jshint:{
        browser: {
            src: paths,
            options: jshintrc
        },
        node:{
            src:paths,
            options: jshintrc
        }
    },
    shell:{
        smokeTest:{
            options:{
                stdout: true,
                failOnError: true
            },
            command : ' '
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  // Default task(s).
  grunt.registerTask('default', ['uglify','jshint','jsbeautifier:modify']);
  grunt.registerTask('validate', ['uglify','jshint','jsbeautifier:modify']);
  grunt.registerTask('smoke','shell:smokeTest');

};
