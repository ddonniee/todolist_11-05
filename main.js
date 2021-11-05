var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');

// 각 page 만들기 by 은정

window.onload = function() {

    class todolist{
        constructor(mode,title) {
             this.mode = mode;
             this.title = titlel;
        }
    }

    var arr = [];
    document.getElementById('add').onclick = function() {
        var addMode = document.getElementsByClassName('choice').checked;
        var addTitle = document.getElementById('title');

        var mode = addMode.value;
        var title = addTitle.value;

        arr.push(new todolist(mode,title));
        
        addMode.value='';
        addTitle.value='';
    }

    // 여기는 다시 봐야된다.
     document.getElementsById('listUp')=function() {
         var listup = document.createElement('li');
           listup.setAttribute('class','liClass'); 
           let description = document.createTextNode('input description');
           
           listup.appendChild(description);

           document.getElementById('result').appendChild(listup);
     }
}

var app = http.createServer(function (req, res) {
    var _url = req.url;
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    
    // 정상 경로일 때
    if(pathname==='/') {
        if(queryData.id===undefined) {
            var title = queryData.id;
            fs.readdir('./data',function(error, filelist) {
                var title = 'To do list';
                var description = 'Hello Stranger.';
                var list = template.list(filelist);
                var html = template.HTML(title,list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`
                    );
                res.writehead(200);
                res.end(html);
            });
        }
        // 이게 뭘가?ㅎㅎ
        else {
            fs.readdir('./data', function(error, filelist){
                fs.readFile(`./data/${queryData.id}/${queryData.id}`,'utf-8', function (err, description) {
                    var title = queryData.id;
                    var list = template.list(filelist);
                    var html = template.HTML(title, list,
                      `<h2>${title}</h2>`,
                      ` <a href="/create">create</a>
                        <a href="/update?id=${title}">update</a>
                        <form action="delete_process" method="post">
                          <input type="hidden" name="id" value="${title}">
                          <input type="submit" value="delete">
                        </form>`
                        ,`${listup}`
                    );
                    response.writeHead(200);
                    response.end(html);
                });
              });
            }
        
    }else if(pathname==='/create'){
        fs.readdir(`./${title}`, function(err, filelist) {
            var title = 'web';
            var list = template.list(filelist);
            var html = template.HTML(title,list,
                `
                <form action = "/create_process" method = "post">
                <p>
                <input type="text" name="title" palceholder="add to do list..">
                </p>
                <p><input type="submit"></p>
                </form>
                `,
                ''
                ,`${listup}`);  
            res.writehead(200);
            res.end(html);
        });
    }else if(pathname==='/create_process'){
        var body ='';
        req.on('data', function(data) {
            body = body + data;
        });
        req.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
             // 현재 폴더의 해당 directory 에 file 생성
             // 이렇게하면 좀 비효율적이니까 나중에 json 으로 바꾸는걸로 하자
             // by 은정 2021.11.03
            fs.writeFile(`./${title}`,'description','utf-8', function(err) {
                res.writehead(302, {Location: `/?id=${title}`});
                res.end();
            });
        });
    }else if(pathname==='/update'){
        // queryData.id 와 일치하는 폴더내의 list 를 읽어오자 by 은정
        fs.readdir('./data', function(err, filelistt) {
            fs.readFile(`./data/${title}/${title}`,'utf-8',function (err,description) {
                var title = queryData.id;
                var list = template.list(filelist);
                var html = template.HTML(title,
                    `
                    <form action = "update_process" method = "post">
                    <input type = "hidden" name="old_title" value="${title}">
                    <p><input type = "text" name="title" palceholder="title" value="${title}></p>
                    <input type = "submit">
                    </form>
                    `,
                    `<a href="/create">create</a>
                     <a href="/update?id=${title}">update</a>
                    `
                    ,`${listup}`);
    
                res.writehead(200)
                res.end(html);
            });
        });
    }else if(pathname==='/update_process'){
        var body ='';
        req.on('data', function() {
            body = body+data;
        });
        req.on('end', function() {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            fs.rename(`${id}`,`${title}`,function(err) {
                fs.writeFile(`${title}`,title,'utf-8', function (err) {
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                })
            });
        });
    }else if(pathname==='/delete_process'){
        var body = '';
        //객체에 event를 binding한다.
        req.on('data', function(data){
            body = body + data;
        });
        req.on('end',function() {
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`./${title}/${id}`,function(error) {
                res.writeHead(302, {Location: `/`});
                res.end();
            })
        });
    }else {
        res.writehead(404);
        res.end('Not found');
    }
});
app.listen(3000);