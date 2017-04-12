module.exports = function(grunt) {

	// 1. Configure tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

		browserify: {
      dist: {
        options: {
          transform: [['babelify', { 'sourceType': 'module' }]]
        },
        files: {
          'dist/bundle.js': 'src/scripts/**/*.js'
        }
      }
    },

    // Compile .scss-files in 'dev' folder into 1 style.css file that WP can read
		sass: {
			dev: {
				options: {
					outputStyle: 'expanded' // 'expanded' = makes the output .css-file easy to read
				},
				files: {
					'dist/style.css': 'src/styles/style.scss'
				}
			},
			build: {
				options: {
					outputStyle: 'compressed' // 'compressed' = minifies the output for live server
				},
				files: {
					'dist/style.css': 'src/styles/style.scss'
				}
			}
		},

    autoprefixer:{
      dist:{
        files:{
          'dist/style.css':'dist/style.css'
        }
      }
    },

    // Initialize 'grunt watch'-task with livereload (also install livereload plugin in browser to make it work)
		watch: {
      options: { livereload: true },
			js: {
				files: [ 'src/scripts/**/*.js' ],
				tasks: [ 'browserify' ] // Concatenate scripts on change, but don't minify while developing (see options under 'uglify' ^)
			},
			css: {
        files: [ 'src/styles/**/*.scss' ],
				tasks: [ 'sass:dev' ] // Concatenate styles on change, but don't minify while developing (see options under 'sass' ^)
			},
      livereload: {
        files: [ '*.html', 'dist/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}' ]
      }
		},

    express:{
      all:{
        options:{
          port: 3000,
          hostname: 'localhost',
          bases: ['./'],
          livereload: true
        }
      }
    }

  });

  // 2. Load plugins
	grunt.loadNpmTasks( 'grunt-browserify' );
  grunt.loadNpmTasks( 'grunt-express' );
  grunt.loadNpmTasks( 'grunt-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' ); // Runs on command 'grunt watch'
  grunt.loadNpmTasks( 'grunt-autoprefixer' );

  // 3. Register task(s)
  grunt.registerTask( 'serve', [ 'express', 'watch' ]); // Runs on command 'grunt serve'
  grunt.registerTask( 'uglify', [ 'sass:dev', 'autoprefixer' ]); // Runs on command 'grunt uglify'
  grunt.registerTask( 'build', [ 'sass:build', 'autoprefixer', 'browserify' ]); // Runs on command 'grunt build'
};
