// Provided mock server call function
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

// Add this line to hide the modal when the page first loads
document.getElementById("modal").classList.add("hidden");

// Heart symbols
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Select all like glyphs
const hearts = document.querySelectorAll(".like-glyph");

hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    if (heart.innerText === EMPTY_HEART) {
      // When liking, simulate a server call
      mimicServerCall()
        .then(() => {
          heart.innerText = FULL_HEART;
          heart.classList.add("activated-heart");
        })
        .catch(error => {
          const modal = document.getElementById("modal");
          modal.classList.remove("hidden");
          modal.querySelector("#modal-message").innerText = error;
          setTimeout(() => modal.classList.add("hidden"), 3000);
        });
    } else {
      // If already liked, unlike immediately
      heart.innerText = EMPTY_HEART;
      heart.classList.remove("activated-heart");
    }
  });
});
