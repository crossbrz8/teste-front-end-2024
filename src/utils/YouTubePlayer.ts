/// <reference types="youtube" />

let player: YT.Player;

export function createYouTubePlayer(videoId: string) {
  const dialog = document.getElementById('videoDialog') as HTMLDialogElement;
  const closeButton = document.getElementById('closeDialog') as HTMLButtonElement;

  if (player) {
    player.loadVideoById(videoId);
  } else {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: videoId,
      playerVars: {
        'autoplay': 1,
        'mute': 1 
      },
      events: {
        'onReady': onPlayerReady,
      },
    });
  }

  dialog.showModal();

  closeButton.onclick = function() {
    dialog.close();
    player.stopVideo();
  }

  dialog.addEventListener('close', () => {
    player.stopVideo();
  });
}

function onPlayerReady(event: YT.PlayerEvent) {
  event.target.playVideo();
}
