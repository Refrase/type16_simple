var path = require('path');

module.exports = function(grunt) {

	// 1. Configure tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

		browserify: {
      dev: {
        options: {
          transform: [['babelify', { 'sourceType': 'module' }]]
        },
        files: {
          'public/assets/bundle.js': 'src/scripts/**/*.js'
        }
      },
      build: {
        options: {
          transform: [['babelify', { 'sourceType': 'module' }]]
        },
        files: {
          'dist/assets/bundle.js': 'src/scripts/**/*.js'
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
					'public/assets/style.css': 'src/styles/style.scss'
				}
			},
			build: {
				options: {
					outputStyle: 'compressed' // 'compressed' = minifies the output for live server
				},
				files: {
					'dist/assets/style.css': 'src/styles/style.scss'
				}
			}
		},

    autoprefixer: {
      dev: {
        files: {
          'public/assets/style.css': 'public/assets/style.css'
        }
      },
      build: {
        files: {
          'dist/assets/style.css':'dist/assets/style.css'
        }
      }
    },

    express: {
      server: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases: [ 'public' ],
          livereload: true
        }
      }
    },

    chokidar: { // Like grunt-contrib-watch
      options: { livereload: true },
      scripts: {
        files: [ 'src/scripts/**/*.js' ],
        tasks: [ 'browserify:dev' ],
        options: {
          spawn: false,
          interrupt: true
        }
      },
      css: {
        files: [ 'src/styles/**/*.scss' ],
        tasks: [ 'sass:dev', 'autoprefixer:dev' ],
      },
      livereload: {
        files: [ 'public/*.html', 'public/assets/**/*.{png,jpg,jpeg,gif,webp,svg}' ]
      }
    },

    copy: {
      main: {
        files: [
          { expand: true, cwd: 'public/assets/icons', src: [ '**' ], dest: 'dist/assets/icons' },
          { expand: true, cwd: 'public/assets/illustrations', src: [ '**' ], dest: 'dist/assets/illustrations' },
          { expand: true, cwd: 'public/assets/images', src: [ '**' ], dest: 'dist/assets/images' },
          { expand: true, cwd: 'public', src: [ '*.html', '*.txt' ], dest: 'dist' }
        ]
      }
    },

    cacheBust: {
      build: {
        options: {
          baseDir: './dist/assets/',
          assets: [ 'bundle.js', 'style.css' ],
          deleteOriginals: true
        },
        src: [ './dist/*.html' ]
      }
    }

  });

  // 2. Load plugins
	grunt.loadNpmTasks( 'grunt-browserify' );
  grunt.loadNpmTasks( 'grunt-express' );
  grunt.loadNpmTasks( 'grunt-sass' );
  grunt.loadNpmTasks( 'grunt-chokidar' ); // Faster alternative to watch task
  grunt.loadNpmTasks( 'grunt-autoprefixer' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-cache-bust' );

  // 3. Register task(s)
  grunt.registerTask( 'serve', [ 'express', 'chokidar' ]); // Runs also on command 'grunt' as it is set to default
  grunt.registerTask( 'uglify', [ 'sass:dev', 'autoprefixer:dev' ]); // Runs on command 'grunt uglify'
  grunt.registerTask( 'build', [ 'sass:build', 'autoprefixer:build', 'browserify:build', 'copy', 'cacheBust:build' ]); // Runs on command 'grunt build'
};
