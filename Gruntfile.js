module.exports = function(grunt) {
  grunt.initConfig({

    jekyll: {
      options: {
        config: '_config.yml'
      },
      serve: {
        options: {
          serve: true
        }
      },
      build: {}
    },

    sass: {
      options: {
        style: 'compressed'
      },
      site: {
        files: {
          'css/styles.css': '_styles/styles.sass'
        }
      },
      presentations: {
        files: {
          'presentations/javascript-and-jquery/css/styles.css': 'presentations/javascript-and-jquery/_styles/styles.sass',
          'presentations/diagramming-with-lucidchart/css/styles.css': 'presentations/diagramming-with-lucidchart/_styles/styles.sass'
        }
      }
    },

    watch: {
      siteStyles: {
        files: '_styles/*.sass',
        tasks: 'sass:site'
      },
      presentationStyles: {
        files: [
          'presentations/javascript-and-jquery/_styles/*sass',
          'presentations/diagramming-with-lucidchart/_styles/*sass'
        ],
        tasks: 'sass:presentations'
      },
      site: {
        files: [
          'index.html',
          'sitemap.xml',
          'rss.xml',
          '_includes/**',
          '_layouts/**',
          'about/**',
          'blog/**',
          'css/**',
          'presentations/**',
          'projects/**'
        ],
        tasks: 'jekyll:build'
      }
    },

    concurrent: {
      dev: {
        tasks: ['jekyll', 'sass', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', 'concurrent');
};
