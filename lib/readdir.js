var dir = `data/${title}`;
var fs = requeire('fs');

fs.readdir(dir, function(error, filelist) {
    console.log(filelist);
})