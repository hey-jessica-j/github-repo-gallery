



//Gobal variables
const overviewElement = document.querySelector(".overview");
const repoListElement = document.querySelector(".repo-list")

const username = "hey-jessica-j";


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
  for (repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoListElement.append(li);
  }
};
