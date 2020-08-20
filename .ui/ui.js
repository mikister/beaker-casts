async function injectPageInfo() {
  let pageTitle = document.getElementById("page_title");
  let pageDesc = document.getElementById("page_desc");

  let siteInfo = await beaker.hyperdrive.drive().getInfo();

  pageTitle.innerText = siteInfo.title;
  pageDesc.innerText = siteInfo.description;
}

async function injectPodcastList() {
  let episodes = await beaker.hyperdrive
    .readdir("/podcasts")
    .catch(console.error);

  let episodeList = document.createElement("div");
  episodeList.className = "episode_list";
  document.body.append(episodeList);

  episodes.forEach(async (name, index) => {
    let pathToFile = "/podcasts/" + name;

    let episode = document.createElement("div");
    episode.className = "episode";

    let epIndex = document.createElement("span");
    epIndex.innerText = index + 1;

    let link = document.createElement("a");
    link.href = pathToFile;
    link.innerText = name;

    episodeList.append(episode);
    episode.append(epIndex);
    episode.append(link);
  });
}

async function injectEpisode() {
  let player = document.createElement("div");
  player.className = "player";

  let logo = document.createElement("img");
  logo.src = "/thumb";
  logo.className = "logo";

  document.body.append(player);
  player.append(logo);
}

(async function () {
  const ALLOWED_PODCAST_FORMATS = [".wav", ".mp3", ".flac"];
  injectPageInfo();

  if (
    location.pathname.endsWith("/") ||
    location.pathname.endsWith("index.html")
  ) {
    injectPodcastList();
  } else if (
    ALLOWED_PODCAST_FORMATS.map((format) =>
      location.pathname.endsWith(format)
    ).includes(true)
  ) {
    injectEpisode();
  }
})();
