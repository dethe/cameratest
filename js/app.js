var video = document.querySelector('video');
var width = window.screen.availWidth;
var height = window.screen.availHeight;

video.setAttribute('width', Math.min(width, height));
video.setAttribute('height', Math.min(width, height));

var cameraManager = navigator.mozCameras ? navigator.mozCameras[0] : navigator.mozCamera;

function getPreview(camera){
    var sizes = camera.capabilities.videoSizes;
    camera.getPreviewVideoMode({size: sizes[sizes.length - 1]}, showPreview, errHandler);
}

function showPreview(stream){
    var vendorURL = window.URL || window.webkitURL;
    video.src = vendorURL.createObjectURL(stream);
    video.play();
}

function errHandler(errString){
    console.log('Error: %s', errString);
}

if (cameraManager) {
    var cameras = cameraManager.getListOfCameras();
    for (var i = 0; i < cameras.length; i++){
        console.log('camera #%s: %o', i, cameras[i]);
    }
    // get camera
    cameraManager.getCamera({camera: camera[cameras.length - 1]}, getPreview);
} else {
    navigator.getMedia = ( navigator.getUserMedia ||
       navigator.webkitGetUserMedia ||
       navigator.mozGetUserMedia ||
       navigator.msGetUserMedia);
    var videoStream = navigator.getMedia({video:true}, showPreview, errHandler);
}