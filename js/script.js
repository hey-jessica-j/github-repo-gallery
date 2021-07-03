

const username = "hey-jessica-j";

//Gobal variables
const overviewElement = document.querySelector(".overview");
const repoListElement = document.querySelector(".repo-list");
const repoElement = document.querySelector(".repos");
const repoDataElement = document.querySelector(".repo-data");




//Fetch and display user data
const githubUserData = async function() {
  const fetchUserData = await fetch(`https://api.github.com/users/${username}`);
  const userData = await fetchUserData.json();
  displayUserData(userData);
};

githubUserData();

const displayUserData = async function(userData) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${userData.avatar_url}>
    </figure>
    <div>
      <p><strong>Name:</strong> ${userData.name}</p>
      <p><strong>Bio:</strong> ${userData.bio}</p>
      <p><strong>Location:</strong> ${userData.location}</p>
      <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
    </div>
    `;

    overviewElement.append(div);
};

const githubRepoData = async function() {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updates&per_page=100`);
  const repoData = await fetchRepos.json();
  //console.log(repoData);
  displayRepoData(repoData);
};

githubRepoData();

const displayRepoData = async function (repos) {
  for (const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoListElement.append(li);
  }
};

repoListElement.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    repoData(repoName);
  }
});

const repoData = async function(repoName) {
  const fetchRepoData = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchRepoData.json();
  console.log(repoInfo);
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  //console.log(languageData);

//Gets languages used
  const languages = [];
  for (const lang in languageData) {
    languages.push(lang);
  };
  //console.log(languages);
//Getpages URL
  const pages = repoInfo.has_pages;

  displayRepoInfo(repoInfo, languages, pages);

};


const displayRepoInfo = function (repoInfo, languages, pages) {
  repoDataElement.innerHTML = "";
  repoDataElement.classList.remove("hide");
  repoElement.classList.add("hide");
  const div = document.createElement("div");
  const displayHTML =  `
      <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;

  if (pages == true) {
    div.innerHTML = displayHTML + `
    <a class="visit" href="https://${username}.github.io/${repoInfo.name}" target="_blank" rel="noreferrer noopener">View the live site!</a>
    `;
  }
  else {
    div.innerHTML = displayHTML;
  }

  repoDataElement.append(div);

};
