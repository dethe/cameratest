var video = document.querySelector('video');
var width = window.screen.availWidth;
var height = window.screen.availHeight;

video.setAttribute('width', Math.min(width, height));
video.setAttribute('height', Math.min(width, height));

navigator.getMedia = ( navigator.getUserMedia ||
   navigator.webkitGetUserMedia ||
   navigator.mozGetUserMedia ||
   navigator.msGetUserMedia);
var videoStream = navigator.getMedia({video:true}, function(stream) {
    if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
    } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
    }
    video.play();
},function(err){
    console.log('an error occurred: %o', err);
});
