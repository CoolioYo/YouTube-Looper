const { start } = require("repl");

var videoId;
var startSeconds;
var endSeconds;

function loadVideo(){

    // This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var link = document.getElementById("video-link").value;

    videoId = link.replace("https://www.youtube.com/watch?v=", "");
    videoId = videoId.split("&")[0];
    console.log(videoId);

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

function findSeconds(time){
    minutes = parseInt(time.split(':')[0] * 60);
    seconds = minutes + parseInt(time.split(':')[1]);

    return seconds;
}

var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        width: "640",
        height: "360",
        videoId: videoId,
        playerVars: {
            autoplay: 1, // Auto-play the video on load
            controls: 0, // Show pause/play buttons in player
            start: startSeconds,
            end: endSeconds,
            autohide: 0, // Hide video controls when playing
        },
        events: {
            "onStateChange": onStateChange
        }
    });
}

function onStateChange(state) {
    if (state.data === YT.PlayerState.ENDED) {
        player.seekTo(startSeconds)
    }
}