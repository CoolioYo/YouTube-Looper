var videoId;
var startSeconds;
var endSeconds;
var videoTitle;
var player;

document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('loop-button');

    button.addEventListener('click', function() {

        var link = document.getElementById("video-link").value;

        // This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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
    });
});

function findSeconds(time){
    minutes = parseInt(time.split(':')[0] * 60);
    seconds = minutes + parseInt(time.split(':')[1]);

    return seconds;
}

function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        width: "320",
        height: "180",
        videoId: videoId,
        playerVars: {
            autoplay: 1, // Auto-play the video on load
            controls: 1, // Show pause/play buttons in player
            disablekb: 1, // Disable keyboard
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
    }
}