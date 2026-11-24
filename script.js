/* dark mode */
const darkModeButton = document.getElementById("dark-mode-btn");

/* localStorage keeps the theme saved in the browser, so it survives page changes */
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  if (darkModeButton !== null) {
    darkModeButton.textContent = "☀️ Light";
  }
}

if (darkModeButton !== null) {

  darkModeButton.addEventListener("click", function () {

    /* toggle adds the class if it's missing and removes it if it's there */
    document.body.classList.toggle("dark-mode");

    /* save whichever mode we ended up in */
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      darkModeButton.textContent = "☀️ Light";
    } else {
      localStorage.setItem("theme", "light");
      darkModeButton.textContent = "🌙 Dark";
    }
  });
}


/* greeting and date on the home page */
const greetingText = document.getElementById("greeting-text");
const dateText     = document.getElementById("date-text");

if (greetingText !== null && dateText !== null) {

  const now  = new Date();
  const hour = now.getHours();

  /* let because the value changes in the if/else below */
  let greeting = "";

  if (hour >= 0 && hour < 12) {
    greeting = "GOOD MORNING";
  } else if (hour >= 12 && hour < 18) {
    greeting = "GOOD AFTERNOON";
  } else {
    greeting = "GOOD EVENING";
  }

  const options     = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const todayString = now.toLocaleDateString("en-GB", options);

  /* capitals so it matches the label style */
  greetingText.textContent = greeting;
  dateText.textContent     = "· " + todayString.toUpperCase();
}


/* club search, hides cards that don't match what you type */
const clubSearchInput = document.getElementById("club-search");
const noResultsMsg    = document.getElementById("no-results-msg");

if (clubSearchInput !== null) {

  clubSearchInput.addEventListener("keyup", function () {

    /* lowercase both sides so capital letters don't matter */
    const searchTerm = clubSearchInput.value.toLowerCase();

    const allCards = document.querySelectorAll(".club-card");
    let visibleCount = 0;

    for (let i = 0; i < allCards.length; i++) {

      const cardText = allCards[i].textContent.toLowerCase();

      /* indexOf gives -1 when the text isn't found */
      if (cardText.indexOf(searchTerm) !== -1) {
        allCards[i].style.display = "block";
        visibleCount = visibleCount + 1;
      } else {
        allCards[i].style.display = "none";
      }
    }

    if (visibleCount === 0) {
      noResultsMsg.style.display = "block";
    } else {
      noResultsMsg.style.display = "none";
    }
  });
}


/* events table filter */
const categoryFilter = document.getElementById("category-filter");

if (categoryFilter !== null) {

  categoryFilter.addEventListener("change", function () {

    const selectedCategory = categoryFilter.value;

    const tableRows = document.querySelectorAll("#events-table tbody tr");

    /* each row has a data-category in the html that we compare against */
    for (let i = 0; i < tableRows.length; i++) {

      const rowCategory = tableRows[i].getAttribute("data-category");

      if (selectedCategory === "All" || rowCategory === selectedCategory) {
        tableRows[i].style.display = "table-row";
      } else {
        tableRows[i].style.display = "none";
      }
    }
  });
}


/* contact form check */
const contactForm = document.getElementById("contact-form");
const formError   = document.getElementById("form-error");
const formSuccess = document.getElementById("form-success");
const messageTextarea = document.getElementById("message");
const charCounter     = document.getElementById("char-counter");

if (contactForm !== null) {

  contactForm.addEventListener("submit", function (event) {

    /* stops the page from reloading on submit */
    event.preventDefault();

    const nameValue    = document.getElementById("name").value;
    const emailValue   = document.getElementById("email").value;
    const messageValue = messageTextarea.value;

    /* trim removes spaces so a field with only spaces counts as empty */
    const nameTrimmed    = nameValue.trim();
    const emailTrimmed   = emailValue.trim();
    const messageTrimmed = messageValue.trim();

    formError.style.display   = "none";
    formSuccess.style.display = "none";

    if (nameTrimmed === "" || emailTrimmed === "" || messageTrimmed === "") {

      formError.textContent   = "⚠️ Please fill in your name, email, and message before submitting.";
      formError.style.display = "block";

    } else {

      formSuccess.textContent   = "✅ Thanks, your message has been received!";
      formSuccess.style.display = "block";

      contactForm.reset();

      /* reset doesn't touch the counter text so we do it ourselves */
      if (charCounter !== null) {
        charCounter.textContent = "0 / 300 characters";
        charCounter.style.color = "";
      }
    }
  });
}


/* character counter for the message box */
if (messageTextarea !== null && charCounter !== null) {

  messageTextarea.addEventListener("keyup", function () {

    const currentLength = messageTextarea.value.length;

    charCounter.textContent = currentLength + " / 300 characters";

    /* goes red after 300 */
    if (currentLength > 300) {
      charCounter.style.color = "#d93025";
    } else {
      charCounter.style.color = "";
    }
  });
}


/* back to top button */
const backToTopButton = document.getElementById("back-to-top-btn");

if (backToTopButton !== null) {

  /* the css hides the button until it gets the visible class */
  window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}