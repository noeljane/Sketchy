var $randomBtn = $('#random-btn');
var $imageContainer = $('#image-container');
var $searchBtn = $('#search-btn');
var $input = $('#search-term');


//giphy
function getRandomImage(){
    if($input.val()){
        var url ='/random/' + $input.val()
    }else{
        var url= '/random'
    }
    console.log(url)
    var options ={
        url:'/random/' + $input.val(),
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
        url:'/search/' + $input.val(), 
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

//user canvas
var $myCanvas = $('#myCanvas');
var $ctx = $myCanvas.getContext('2d')
$ctx.beginPath();
$ctx.arc(100, 100, 50, 1.5 * Math.PI, 0.5 * Math.PI, false);
$ctx.lineWidth = 10;
$ctx.stroke();
var imgData = $myCanvas.toDataURL();