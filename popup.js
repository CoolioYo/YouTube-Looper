var videoId;
var startSeconds;
var endSeconds;
var videoTitle;
var player;
var loops;

document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('loop-button');

    button.addEventListener('click', function() {

        var link = document.getElementById("video-link").value;

        // This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Get the video url
        videoId = link.replace("https://www.youtube.com/watch?v=", "");
        videoId = videoId.split("&")[0];
        console.log(videoId);

        // Insert loop counter
        loops = 0;
        document.getElementById("loop-counter").innerHTML = "Loops: " + loops;

        // Check what portion of video to loop
        var checkbox = document.getElementById('checkbox');

        if(checkbox.checked){
            // Loop full video
            player.loadVideoById({
                videoId: videoId,
                startSeconds: 0,
                loop: 1
            });
            console.log("Looping full video")

        }else{
            // Loop part of a video
            startSeconds = document.getElementById("start-time").value;
            endSeconds = document.getElementById("end-time").value;

            startSeconds = findSeconds(startSeconds);
            endSeconds = findSeconds(endSeconds);

            player.loadVideoById({
                videoId: videoId,
                startSeconds: startSeconds,
                endSeconds: endSeconds
            });
        }
    });
});

// Convert time input to seconds
function findSeconds(time){
    minutes = parseInt(time.split(':')[0] * 60);
    seconds = minutes + parseInt(time.split(':')[1]);

    return seconds;
}

// Video setup 
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        width: "320",
        height: "180",
        videoId: videoId,
        playerVars: {
            autoplay: 1, // Auto-play the video on load
            controls: 1, // Show pause/play buttons in player
            autohide: 0, // Hide video controls when playing
            start: startSeconds,
            end: endSeconds,
        },
        events: {
            "onStateChange": onStateChange,
            "onReady": function onPlayerReady(event) {
                videoTitle = event.target.getVideoData().title;
                document.getElementById("video-title").innerHTML = videoTitle;
                console.log(videoTitle);
            }
        }
    });
}

function onStateChange(state) {
    if (state.data === YT.PlayerState.ENDED) {
        player.seekTo(startSeconds)
        loops++;
        document.getElementById("loop-counter").innerHTML = "Loops: " + loops;
    }
}

// Checkbox input
document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.getElementById('checkbox');

    checkbox.addEventListener('click', function() {
        if(checkbox.checked){
            document.getElementById("start-time").value = "start";
            document.getElementById("end-time").value = "end";

            document.getElementById("start-time").readOnly = true;
            document.getElementById("end-time").readOnly = true;
        }else{
            document.getElementById("start-time").value = "";
            document.getElementById("end-time").value = "";

            document.getElementById("start-time").readOnly = false;
            document.getElementById("end-time").readOnly = false;        
        }
    });
});
