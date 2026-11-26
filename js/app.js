// custom toast message function
function showToast(m) {
  var toast = document.getElementById("toast");
  toast.textContent = m;
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}
// smooth scroll for each book button pressed
var bookLinks = document.getElementsByClassName("match-book-btn");

for (var i = 0; i < bookLinks.length; i++) {
  bookLinks[i].addEventListener("click", function (e) {
    e.preventDefault();

    var form = document.getElementById("match-form");
    form.scrollIntoView({ behavior: "smooth" });

    showToast("Fill in your details!");
  });
}

// booking form match filter
var teamFilter = document.getElementById("team-filter");

teamFilter.addEventListener("change", function () {
  var team = teamFilter.value;

  for (var i = 1; i < matchSelect.options.length; i++) {
    var option = matchSelect.options[i];

    if (team === "" || option.value.includes(team)) {
      option.hidden = false;
    } else {
      option.hidden = true;
    }
  }
});

// ticket summary change event listener

var matches = {
  "rcb-csk": {
    name: "RCB vs CSK",
    venue: "Bengaluru",
    date: "2027-03-01 19:00 IST",
    general: 1500,
    premium: 4500,
    vip: 7000,
  },
  "kkr-dc": {
    name: "KKR vs DC",
    venue: "Kolkata",
    date: "2027-03-02 19:00 IST",
    general: 1200,
    premium: 3000,
    vip: 5700,
  },
  "mi-rcb": {
    name: "MI vs RCB",
    venue: "Mumbai",
    date: "2027-03-03 19:00 IST",
    general: 700,
    premium: 5000,
    vip: 9235,
  },
  "csk-kkr": {
    name: "CSK vs KKR",
    venue: "Chennai",
    date: "2027-03-04 19:00 IST",
    general: 1700,
    premium: 2500,
    vip: 5487,
  },
  "dc-mi": {
    name: "DC vs MI",
    venue: "Delhi",
    date: "2027-03-05 19:00 IST",
    general: 450,
    premium: 1000,
    vip: 3000,
  },
};

var matchSelect = document.getElementById("match");
var standSelect = document.getElementById("stand-category");
var quantityInput = document.getElementById("ticket-quantity");
var summaryMatch = document.getElementById("summary-match");
var summaryVenue = document.getElementById("summary-venue");
var summaryDate = document.getElementById("summary-date");
var summaryStand = document.getElementById("summary-stand");
var summaryPrice = document.getElementById("summary-price");
var summaryQuantity = document.getElementById("summary-quantity");
var summaryTotal = document.getElementById("summary-total");
var bookingForm = document.getElementById("booking-form");

function updateSummary() {
  var matchValue = matchSelect.value;
  var standValue = standSelect.value;
  var quantity = quantityInput.value;

  if (matchValue !== "") {
    var match = matches[matchValue];
    summaryMatch.textContent = match.name;
    summaryVenue.textContent = match.venue;
    summaryDate.textContent = match.date;
  } else {
    summaryMatch.textContent = "";
    summaryVenue.textContent = "";
    summaryDate.textContent = "";
  }

  summaryStand.textContent = standValue;
  summaryQuantity.textContent = quantity;

  if (matchValue !== "" && standValue !== "") {
    var price = matches[matchValue][standValue];
    summaryPrice.textContent = "₹" + price;

    if (quantity >= 1 && quantity <= 6) {
      summaryTotal.textContent = "₹" + price * quantity;
    } else {
      summaryTotal.textContent = "";
    }
  } else {
    summaryPrice.textContent = "";
    summaryTotal.textContent = "";
  }

  showToast("Booking summary updated");
}

matchSelect.addEventListener("change", updateSummary);
standSelect.addEventListener("change", updateSummary);
quantityInput.addEventListener("change", updateSummary);

bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();

  showToast("Ticket booked successfully!");
  bookingForm.reset();
});

// filter match cards by team 
var scheduleFilter = document.getElementById("schedule-filter");
var matchCards = document.getElementsByClassName("match-card");

scheduleFilter.addEventListener("change", function () {
  var team = scheduleFilter.value;

  for (var i = 0; i < matchCards.length; i++) {
    var teams = matchCards[i].getAttribute("data-teams");

    if (team === "" || teams.includes(team)) {
      matchCards[i].classList.remove("hide");
    } else {
      matchCards[i].classList.add("hide");
    }
  }

  showToast("Match list filtered");
});

// list / grid view 
var cardsBox = document.getElementById("match-cards");
var gridBtn = document.getElementById("grid-btn");
var listBtn = document.getElementById("list-btn");

gridBtn.addEventListener("click", function () {
  cardsBox.classList.remove("list-view");
  showToast("Grid view");
});

listBtn.addEventListener("click", function () {
  cardsBox.classList.add("list-view");
  showToast("List view");
});

// hamburger menu class toggle
var menuBtn = document.getElementById("menu-btn");
var navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", function () {
  navbar.classList.toggle("open");
});

navbar.addEventListener("click", function () {
  navbar.classList.remove("open");
});