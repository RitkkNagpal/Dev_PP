let videoPlayer=document.querySelector("video");
let recordingState=false;
let mediaRecorder;
let constraints={"audio":true , "video":true};
let recordedData;
let photoBtn=document.querySelector("capture-photo");
let recordBtn=document.querySelector("#recording-button");
let captureBtn=document.querySelector("#capture-photo");
(async function(){
    
    try{
        // let mediaDevices=await navigator.mediaDevices.enumerateDevices();
        // console.log(mediaDevices);
        
        let mediaStream=await navigator.mediaDevices.getUserMedia(constraints);
        mediaRecorder=new MediaRecorder(mediaStream);
        videoPlayer.srcObject=mediaStream;
        
        mediaRecorder.onstart=function(e){
            console.log("in start!");
        }
        
        mediaRecorder.onstop=function(e){
            console.log("in stop");
        }
        
        mediaRecorder.ondataavailable=function(e){
            console.log("in data available!");
            recordedData=e.data;
            saveDataToFs();
        }
        
        recordBtn.addEventListener("click",function(e){
            if(recordingState){
                mediaRecorder.stop();
                recordBtn.innerHTML="Record";
            }
            else{
                mediaRecorder.start();
                recordBtn.innerHTML="Recording";
            }
            recordingState=!recordingState;
        });

        captureBtn.addEventListener("click",capturePhotos)
        console.log(mediaRecorder);
    }
    catch(error){
        console.log(error);
    }
})();

function saveDataToFs(){
    console.log("Saving Video");
    let videoUrl=URL.createObjectURL(recordedData); //creates blob object to url
    
    let aTag=document.createElement("a");
    aTag.download="video.mp4"; // ensures no navigation takes place and it gets downloaded
    aTag.href=videoUrl;

    aTag.click();
    aTag.remove();
}

function capturePhotos(){
    let canvas=document.createElement("canvas");
    canvas.height=videoPlayer.videoHeight;
    canvas.width=videoPlayer.videoWidth;

    let ctx=canvas.getContext('2d');
    
    ctx.drawImage(videoPlayer,0,0);
    let imageURL=canvas.toDataURL("image/jpg");
    let aTag=document.createElement("a");
    aTag.download="photo.jpg";
    aTag.href=imageURL;
    aTag.click();
}