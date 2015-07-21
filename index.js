var fs = require("fs")
, path = require("path")

var fileName = "foo.txt";
console.log('you are about to begin');

fs.exists(fileName, function(exists) {
  if (exists) {
    fs.stat(fileName, function(error, stats) {
      chmodr("foo.txt", 0777, function(err) {
        if (err) {
          console.log(err);
          throw err;
        }
          console.log('change permission of folder to 0777');
        // done
      })
      fs.open(fileName, "r", function(error, fd) {
        var buffer = new Buffer(stats.size);
        console.log(stats.size);
        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
          var data = buffer.toString("utf8", 0, buffer.length);

          console.log(data);
          fs.close(fd);
        });
      });
    });
  }
  console.log('after looking for file');

});


function chmodr (p, mode, cb) {
  fs.readdir(p, function (er, children) {
    // any error other than ENOTDIR means it's not readable, or
    // doesn't exist.  give up.
    if (er && er.code !== "ENOTDIR")
      return cb(er)
    var isDir = !er
    var m = isDir ? dirMode(mode) : mode
    if (er || !children.length)
      return fs.chmod(p, m, cb)

    var len = children.length
    var errState = null
    children.forEach(function (child) {
      chmodr(path.resolve(p, child), mode, then)
    })
    function then (er) {
      if (errState) return
      if (er) return cb(errState = er)
      if (-- len === 0) return fs.chmod(p, dirMode(mode), cb)
    }
  })
}

function chmodrSync (p, mode) {
  var children
  try {
    children = fs.readdirSync(p)
  } catch (er) {
    if (er && er.code === "ENOTDIR") return fs.chmodSync(p, mode)
    throw er
  }
  if (!children.length) return fs.chmodSync(p, dirMode(mode))

  children.forEach(function (child) {
    chmodrSync(path.resolve(p, child), mode)
  })
  return fs.chmodSync(p, dirMode(mode))
}

// If a party has r, add x
// so that dirs are listable
function dirMode(mode) {
  if (mode & 0400) mode |= 0100
  if (mode & 040) mode |= 010
  if (mode & 04) mode |= 01
  return mode
}
