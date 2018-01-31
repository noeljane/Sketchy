var $randomBtn = $('#random-btn');
var $imageContainer = $('#image-container');
var $searchBtn = $('#search-btn');
var $input = $('#search-term');


//giphy
function getRandomImage(){
    if($input.val()){
        var url ='/random/' + $input.val() //need url
    }else{
        var url= '/random' //need url
    }
    console.log(url)
    var options ={
        url:'/random/' + $input.val(), //need url
        method: 'get'
    }
    $.ajax(options).done(function(data){
        var imgUrl = data.data.image_original_url
        displyImage(imgUrl)
    })
}
 $randomBtn.on('click', getRandomImage)



function searchImage(){
    var options ={
        url:'/search/' + $input.val(), //need url
        method: 'get'
    }
    $.ajax(options).done(function(data){
        console.log(data)
        var imgUrl = data.data[0].images.original.url
        displyImage(imgUrl)
    })
}
$searchBtn.on('click', searchImage)


function displyImage(url){
    var $img = $('<img>')
    $img.attr('src', url)
    $imageContainer.html($img)
}

$('#giphy-form').on('submit', function(evt) {
    var imgUrl = $('#giphy-image-container').children('img').first().attr('src')
    console.log(imgUrl)
    $('#url-field').val(imgUrl)
})


//usesr canvas
//variables
var canvas;
var ctx;
var strokes = [];
var currentStroke = null;
var brush = {
    x: 0,
    y: 0,
    color: '#000000',
    size: 10,
    down: false,
};

//functions
function redraw () {
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    ctx.lineCap = 'round';
    for (var i = 0; i < strokes.length; i++) {
        var s = strokes[i];
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (var j = 0; j < s.points.length; j++) {
            var p = s.points[j];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }
}

function init () {
    canvas = $('#myCanvas');
    canvas.attr({
        width: 600,
        height: 600,
    });
    ctx = canvas[0].getContext('2d');

    function mouseEvent (e) {

        var rect = canvas[0].getBoundingClientRect();
        brush.x = e.clientX - rect.left;
        brush.y = e.clientY - rect.top;

        console.log('brush x: ' + brush.x);

        currentStroke.points.push({
            x: brush.x,
            y: brush.y,
        });

        redraw();
    }

    canvas.mousedown(function (e) {
        brush.down = true;

        currentStroke = {
            color: brush.color,
            size: brush.size,
            points: [],
        };

        strokes.push(currentStroke);

        mouseEvent(e);
    }).mouseup(function (e) {
        brush.down = false;

        mouseEvent(e);

        currentStroke = null;
    }).mousemove(function (e) {
        
        if (brush.down)
            mouseEvent(e);
    });

    $('#undo-btn').click(function () {
        strokes.pop();
        redraw();
    });

    $('#clear-btn').click(function () {
        strokes = [];
        redraw();
    });

    $('#color-picker').on('input', function () {
        brush.color = this.value;
    });

    $('#save-btn').click(function () {
        window.open(canvas[0].toDataURL());
    });

    $('#brush-size').on('input', function () {
        brush.size = this.value;
    });
}

$(init);

