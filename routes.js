
/*
 * GET generic page from the system
 */
var fs = require('fs');
var url = require('url');
var view_base = __dirname + '/views';

exports.index = function(req, res){
  //res.render('index', { title: 'PF Combat' });
  var pathname = url.parse(req.url).pathname.toLowerCase(); // make matching case insenstive
  
  // first case renders no path
  if(!pathname) {
    res.render('index');
  }
  // second case renders a "folder" ending in /
  else if (pathname === '/' || pathname.charAt(pathname.length-1) === '/' ){
    res.render(view_base + pathname + 'index.jade');
  }
  else {
    // Attempt to find the referenced jade file and render that.
    fs.stat( (view_base + pathname + '.jade'), function(err, stats){
      if(err || !stats) {
        next();
      }
      else{
        res.render((view_base + pathname + '.jade'));
      }
    });

  }
};

exports.health = function(req, res){
  res.send({
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
};

