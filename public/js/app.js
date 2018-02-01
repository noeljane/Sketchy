var $randomBtn = $('#random-btn');
var $imageContainer = $('#giphy-image-container');
var $searchBtn = $('#search-btn');
var $input = $('#search-term');


// Giphy API

function searchButton () {
    var searchVal = $('#search-term').val()
    var options = {
        url: '/search/' + searchVal,
        method: 'get'
    }

    $.ajax(options).done(function(data) {
        var randomNum = Math.ceil(Math.random() * (25 - 0) + 0)
        var giphy_url = data.data[randomNum].images.original.url
        displayImage(giphy_url)
    })
}

function getRandomImage () {
    var searchVal = $('#search-term').val()
    if(searchVal) {
        var url ='/random/' + searchVal
    } else {
        var url = '/random'
    }

    var options = {
        url: url,
        method: 'get'
    }

    $.ajax(options).done(function(data) {
        var giphy_url = data.data.image_original_url
        displayImage(giphy_url)
    })
}

function displayImage(url) {
    var $img = $('<img>')
    $img.attr('src', url)
    $imageContainer.html($img)
  }

$randomBtn.on('click', getRandomImage)
$searchBtn.on('click', searchButton)

$('#giphy-form').on('submit', function(evt) {
    var giphy_url = $('#giphy-image-container').children('img').first().attr('src')
    $('#url-field').val(giphy_url)
    var imgUrl = myCanvas.toDataURL()
    console.log(imgUrl)
    $('#sketchy-url-field').val(imgUrl)
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