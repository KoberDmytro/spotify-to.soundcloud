const clientId = '471c661d53644248903f362f4b0aab76';
const redirectUri = 'https://koberdmytro.github.io/spotify-to.soundcloud/';
const scopes = [
  'playlist-read-private',
  'playlist-read-collaborative'
];

document.getElementById('login-btn').addEventListener('click', () => {
  const authUrl = "https://accounts.spotify.com/authorize?" +
    `client_id=${clientId}` +
    `&response_type=token` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scopes.join(' '))}`;

  window.location.href = authUrl;
});

document.getElementById("convertBtn").addEventListener("click", () => {
  const url = document.getElementById("playlistInput").value.trim();

  if (!url || !url.includes("spotify.com/playlist/")) {
    alert("Пожалуйста, вставьте корректную ссылку на плейлист Spotify.");
    return;
  }

  const mockTracks = [
    { title: "Imagine", artist: "John Lennon" },
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana" }
  ];

  const trackList = document.getElementById("trackList");
  trackList.innerHTML = "<h2>Треки из плейлиста:</h2>";

  mockTracks.forEach((track) => {
    const trackDiv = document.createElement("div");
    trackDiv.className = "track";
    trackDiv.textContent = `${track.title} — ${track.artist}`;
    trackList.appendChild(trackDiv);
  });
});

// Проверка, есть ли access_token в URL
window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash) {
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');

    if (accessToken) {
      console.log("✅ Access token получен:", accessToken);

      // Можно сохранить его в переменную или localStorage
      // localStorage.setItem('spotify_token', accessToken);

      // Обнови интерфейс, если нужно
      document.getElementById('login-btn').textContent = '✅ Авторизовано';
      document.getElementById('login-btn').disabled = true;
    }
  }
});
