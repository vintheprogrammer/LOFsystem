document.addEventListener("DOMContentLoaded", () => {
  window.showSection = function (sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => (section.style.display = "none"));
    const active = document.getElementById(sectionId);
    if (active) active.style.display = "block";
  };

  const postBtn = document.getElementById("postBtn");
  const postText = document.getElementById("postText");
  const imageUpload = document.getElementById("imageUpload");
  const postFeed = document.getElementById("postFeed");

  if (postBtn) {
    postBtn.addEventListener("click", () => {
      const text = postText.value.trim();
      const file = imageUpload.files[0];
      if (!text && !file) {
        alert("Enter text or upload image.");
        return;
      }

      const post = { text };

      const displayPost = () => {
        postFeed.innerHTML = "";
        const postDiv = document.createElement("div");
        if (post.text) {
          const p = document.createElement("p");
          p.textContent = post.text;
          postDiv.appendChild(p);
        }
        if (post.image) {
          const img = document.createElement("img");
          img.src = post.image;
          img.style.maxWidth = "300px";
          postDiv.appendChild(img);
        }
        postFeed.appendChild(postDiv);
        showSection("posted");
      };

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          post.image = e.target.result;
          displayPost();
        };
        reader.readAsDataURL(file);
      } else {
        displayPost();
      }
    });
  }
});
