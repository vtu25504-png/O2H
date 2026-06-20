const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const darkBtn = document.getElementById("darkBtn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let valid = true;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("messageError").innerText = "";

  if (name === "") {
    document.getElementById("nameError").innerText = "Name is required";
    valid = false;
  }

  if (email === "") {
    document.getElementById("emailError").innerText = "Email is required";
    valid = false;
  } else if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("emailError").innerText = "Enter valid email";
    valid = false;
  }

  if (message === "") {
    document.getElementById("messageError").innerText = "Message is required";
    valid = false;
  }

  if (valid) {
    alert("Form submitted successfully!");
    form.reset();
  }
});

const postsDiv = document.getElementById("posts");
const loading = document.getElementById("loading");
const apiError = document.getElementById("apiError");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(data => {
    loading.style.display = "none";

    const posts = data.slice(0, 6);

    posts.forEach(post => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
      postsDiv.appendChild(div);
    });
  })
  .catch(() => {
    loading.style.display = "none";
    apiError.innerText = "Failed to load posts";
  });