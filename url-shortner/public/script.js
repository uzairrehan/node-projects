async function fetchAllUrl() {
  const response = await fetch("/links");
  const links = await response.json();
  const list = document.getElementById("resultContainer");
  list.innerHTML = ""
  for (const [shortCode, url] of Object.entries(links)) {
    const li = document.createElement('li');
  
    li.innerHTML = `<a href="/${shortCode}" target="_blank">${window.location.origin}/${shortCode}</a> ${url}`
    list.appendChild(li)
}

}

document
  .getElementById("urlForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const urlInput = document.getElementById("urlInput").value;
    const codeInput = document.getElementById("customUrlInput").value;

    try {
      const response = await fetch("/short", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urlInput, codeInput }),
      });

      if (response.ok) {
        fetchAllUrl();
        e.target.reset();
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

fetchAllUrl();
