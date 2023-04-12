const searchInput = document.getElementById("searchInput");
const resultsContainer = document.querySelector(".user__profile");
const searchNum = document.getElementById("numSearch")

searchInput.addEventListener("input", function(e) {
    const searchValue = e.target.value.toLowerCase();
    searchUsers(searchValue);
});

function searchUsers(searchValue) {
    let numSearch = 0; // Reset numSearch to 0 on each search
    if (!searchValue) {
        searchValue = "a"; // Provide a default search value
    }
    fetch(`https://api.github.com/search/users?q=${searchValue}`, {
        headers: {
            "Authorization": "SHA256:uZ+MpqvxKnpwtyX/HH/XcrfVzH/oMg5fyA6jlLgk13w=",
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        resultsContainer.innerHTML = "";
        data.items.forEach(user => {
            numSearch++;
            const resultItem = document.createElement("div");
            resultItem.classList.add("user__profile");
            resultItem.innerHTML = `
                <div class="user__container">
                <img src="${user.avatar_url}" class="user__image" alt="">
                <div class="user__details">
                        <p class="user__name">${user.login}</p>
                        <a href="${user.html_url}" target="_blank" class="button">View Profile</a>
                </div>
                </div>
                <div class="horizontal__line"></div>
            `;
            if (user.login.toLowerCase().includes(searchValue)) {
                resultsContainer.appendChild(resultItem);
            }
        });
        searchNum.innerHTML = `${numSearch} results`; // Update numSearch
    })
    .catch(error => console.error(error));
}
