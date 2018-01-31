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
        var imgUrl = data.data[randomNum].images.original.url
        displayImage(imgUrl)
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
        var imgUrl = data.data.image_original_url
        displayImage(imgUrl)
    })
}

function displayImage(url) {
    var $img = $('<img>')
    $img.attr('src', url)
    $imageContainer.html($img)
  }

$randomBtn.on('click', getRandomImage)
$searchBtn.on('click', searchButton)

//user canvas
//variables
var myCanvas = document.getElementById('myCanvas')
var ctx = myCanvas.getContext('2d')

ctx.beginPath()
ctx.arc(100, 100, 50, 1.5 * Math.PI, 0.5 * Math.PI, false)
ctx.lineWidth = 15
ctx.stroke()

// var myImage = new Image()
// myImage.src = imgData
// $ctx.drawImage(myImage, 0, 0)



//Save the image
//var imgData = $myCanvas.toDataURL()
