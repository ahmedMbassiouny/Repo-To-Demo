function convertUrl() {
  var convertedUrlDiv = document.getElementById("convertedUrl");
  var convertedUrlLink = document.getElementById("convertedUrl-link");

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var githubUrl = tabs[0].url.trim();

    if (isValidGithubUrl(githubUrl)) {
      var repoName = extractRepoName(githubUrl);
      var githubPagesUrl = "https://" + repoName[0].toLowerCase() + ".github.io/" + repoName[1] + "/";
      convertedUrlDiv.textContent = "GitHub Demo URL: ";
      convertedUrlLink.textContent = githubPagesUrl;
      convertedUrlLink.setAttribute('target', "_blank");
      convertedUrlLink.setAttribute('href', githubPagesUrl);
    } else {
      convertedUrlDiv.textContent = "GitHub Demo URL: ";
      convertedUrlLink.setAttribute('href', '');
      convertedUrlLink.setAttribute('target', "_self");
      convertedUrlLink.textContent = "Invalid GitHub Repository URL";
      convertedUrlLink.style.background="red";
      convertedUrlLink.style.cursor="not-allowed";


    }
  });
}

function isValidGithubUrl(url) {
  // Define a regular expression to match GitHub repository URLs
  var githubRepoPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/;

  // Test if the URL matches the GitHub repository pattern
  return githubRepoPattern.test(url);
}

function extractRepoName(url) {
  // Example: https://github.com/username/repository => "username , repository"
  return url.split("/").slice(-2);
}

document.addEventListener("DOMContentLoaded", function() {
  convertUrl();
});
