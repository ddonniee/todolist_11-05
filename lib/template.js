module.exports={
    HTML:function(title,list,body,control,listup) {
        return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ToDoList</title>
    <link rel="stylesheet" href="style.css"></style>
</head>
<body>
    <a href="index.html"><img src="img/paint.png" id="home"></a>
    <h2>${title}</h2>

    <form name="Selector" class="selector">
    ${list}
    ${control}
    ${body}
    <script src="main.js">
    function showBtn(filelist);
</script>
    <!-- create 시에 mode / specfic list 값을 lists 의 form 으로 함께 전송 -->
 <fieldset class="chart">
   <p><input type="text" id="title"placeholder="add your plan..">
      <button id="add" value="add">add</button></p>
        <input type="radio" class="choice" value="daily" id="choice-1" checked>
        <label for="daily">D</label>
        <input type="radio" class="choice" value="weekly" id="choice-2">
        <label for="weekly">W</label>
        <input type="radio" class="choice" value="monthly" id="choice-3">
        <label for="monthly">M</label>
        <input type="radio" class="choice" value="yearly" id="choice-4">
        <label for="yearly">Y</label>
        <input type="radio" class="choice" value="bucketlist" id="choice-5">
        <label for="bucketlist">Bucket</label>
</form>
    ${listup}
</fieldset>

</body>
</html>
        `;
    }, list:function(filelist) {
        var list = '<ul>';
        var i = 0;
    
        while(i<filelist.lenght) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i += 1;
        }
        list = list + '</ul>';
        return list;
    }, listup:function(todolist) {
        var listup='<ul>';
        var k = 0;

        while(k<todolist.lenght) {
            listup = listup + `<li><a href="data/${title}/${todolist[i]}">${todolist[k]}</a></li>`
            k += k;
        }
        listup = listup + '</ul>';
        return listup;
    }
}