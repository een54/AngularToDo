

module.exports = function(grunt){

// This line ensures you don't have to load each task individually.
require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	
	// Stores the config for the grunt processa
    grunt.initConfig({

    	// Specify where the package.json file is located
        pkg: grunt.file.readJSON('package.json'),

    	/*
		*
		* HTML
		*
		*/
		// Provides hints on a customisable set of HTML rules.
        htmlhint: {
		    build: {
		        options: {
		            'tag-pair': true,
		            'tagname-lowercase': true,
		            'attr-lowercase': true,
		            'attr-value-double-quotes': true,
		            'doctype-first': true,
		            'spec-char-escape': true,
		            'id-unique': true,
		            'head-script-disabled': true,
		            'style-disabled': true
		        },
		        src: ['html/*.html']
		    }
		},

		/*
		*
		* CSS/SASS
		*
		*/

		//
		cssc: {
		    build: {
		        options: {
		            consolidateViaDeclarations: true,
		            consolidateViaSelectors:    true,
		            consolidateMediaQueries:    true
		        },
		        files: {
		            'build/css/master.css': 'css/*.css'
		        }
		    }
		},

		cssmin: {
			build: {
			    src: 'build/css/master.css',
			    dest: 'build/css/master.css'
			}
		},
		/*
		sass: {
			build: {
			    files: {
			        'build/css/master.css': '/css/sass/main.css'
			    }
			}
		},*/

		/*
		*
		* JavaScript
		*
		*/

		// Provides hints on a customisable set of JS rules.
		jshint: {
      		files: [ 'js/**/*.js'],
      		options: {
      			jshintrc: '.jshintrc',
	        	globals: {  
        			/*"$": false,
	          		jQuery: false*/
        		},
        		ignores: ['js/plugins/*', 'js/spec/*']
      		}
    	},

    	// Will minify JS files in to one big minified JS file
		uglify: {
		    build: {
		        files: {
		            'build/js/base.min.js': ['js/src/*.js']
		        }
		    }
		},

		// Creates documentation for javascript files from comments
		jsdoc: {
			dist: {
				src: 'js/src/*.js',
				options: {
					destination: 'doc'
				}
			}
		},

		jasmine: { 
			src: 'js/src/*.js',
			options: { 
				specs: 'js/spec/*Spec.js',
				helpers: 'js/spec/*Helper.js',
				keepRunner: true
			}
		},

    	/*
		*
		* Other
		*
		*/

		// Everytime certain files are updated/saved, run appropriate tools
		watch: {
			html: {
		        files: ['html/*.html'],
		        tasks: ['htmlTools']
			},
			css: {
				files: ['css/*.*'],
				tasks: ['cssTools']
			},
			js: {
		        files: ['js/src/*.js'],
		        tasks: ['javascriptTools']
			}
		}
    });
	
	//grunt.loadNpmTasks('grunt-contrib-jsdoc');

	grunt.registerTask('htmlTools',  ['htmlhint']);
	grunt.registerTask('cssTools',  [ 'cssc', 'cssmin']);
    grunt.registerTask('javascriptTools',  ['jshint', 'uglify', 'jsdoc', 'jasmine']);
    grunt.registerTask('default', ['htmlTools', 'cssTools', 'javascriptTools']);
};