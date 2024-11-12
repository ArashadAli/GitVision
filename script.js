let gitName = document.querySelector("input");
let userData = document.querySelector("form");
let userName = document.querySelector(".p_info h2");
let userLName = document.querySelector(".p_info p");
let userProfileImg = document.querySelector(".p_img img");
let repoList = document.querySelector(".item3 ul");
let userFollowers = document.querySelectorAll(".p_img p");

userData.addEventListener("submit", (event) => {
    event.preventDefault();
    let username = gitName.value;
    userName.innerText = username;
    userLName.innerText = `@${username.toLowerCase()}`;
    
    // Fetch user profile data
    let userProfileRequest = new XMLHttpRequest();
    userProfileRequest.open("get", `https://api.github.com/users/${username}`);
    userProfileRequest.send();
    
    userProfileRequest.addEventListener("load", () => {
        let profileData = JSON.parse(userProfileRequest.response);
        userProfileImg.src = profileData.avatar_url; // Set profile image
        userFollowers[0].innerText = `Followers - ${profileData.followers}`;
        userFollowers[1].innerText = `Following - ${profileData.following}`;
    });

    // Fetch user repositories data
    let gitData = new XMLHttpRequest();
    gitData.open("get", `https://api.github.com/users/${username}/repos`);
    gitData.send();
    
    gitData.addEventListener("load", () => {
        let repoData = JSON.parse(gitData.response);
        displayGitData(repoData);
    });

    gitName.value = '';
});

function displayGitData(userData) {
    repoList.innerHTML = ""; // Clear previous repository list
    userFollowers[2].innerText = `Total repo - ${userData.length}`; // Total repositories
    
    userData.forEach(repo => {
        console.log(repo)
        let li = document.createElement("li");
        let anchor = document.createElement("a");
        anchor.href = repo.html_url; // Correct repo link
        anchor.innerText = repo.name;
        anchor.target = "_blank"; // Open in new tab
        li.append(anchor);
        repoList.append(li);
    });
}
