



//Gobal variables
const overviewElement = document.querySelector(".overview");
const username = "hey-jessica-j";

const githubUserData = async function() {
  const userData = await fetch(`https://api.github.com/users/${username}`);
  const data = await userData.json();
  console.log(data);
  displayUserData(data);
};

githubUserData();

const displayUserData = async function(data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url}>
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;

    overviewElement.append(div);
};
