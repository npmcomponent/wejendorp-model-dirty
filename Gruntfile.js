var connect = require('connect');
var http = require('http');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha');
  grunt.initConfig({
    mocha: {
      all: {
        options: {
          urls: ['http://localhost:9001/index.html'],
          run: true,
          log: true
        }
      }
    }
  });

  var app = connect()
    .use(connect.static('test'))
    .use(connect.static('build'))
    .use(function(req, res) {
      // Mirror all requests
      var buf = '';
      req.on('data', function(chunk) { buf += chunk; })
      req.on('end', function() { res.end(buf); })
    });

  var server = http.createServer(app);

  grunt.registerTask('server-start', 'Run connect webserver and mocha tests', function() {
    grunt.log.writeln('Starting static web server on localhost:9001');
    server.listen(9001);
  });
  grunt.registerTask('server-close', 'Close the connect server', function() {
    server.close();
  });
  grunt.registerTask('debug-server', function() {
    grunt.log.writeln('Starting static web server on localhost:9001');
    server.listen(9001);
    this.async();
  });

  grunt.registerTask('test', ['server-start', 'mocha', 'server-close']);
};