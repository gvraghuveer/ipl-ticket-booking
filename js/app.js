function showToast(m) {
  var toast = document.getElementById("toast");
  toast.textContent = m;
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

var bookLinks = document.getElementsByClassName("match-book-btn");

for (var i = 0; i < bookLinks.length; i++) {
  bookLinks[i].addEventListener("click", function (e) {
    e.preventDefault();

    var form = document.getElementById("match-form");
    form.scrollIntoView({ behavior: "smooth" });

    showToast("Fill in your details!");
  });
}