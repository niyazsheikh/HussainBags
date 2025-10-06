async function fetchProducts() {
  try {
    const res = await fetch("https://sheetdb.io/api/v1/ylbzy90nrpcto");
    const data = await res.json();
    const container = document.getElementById("product-list");

    function renderProducts(search = "") {
      container.innerHTML = "";
      data
        .filter(item =>
          item.Name.toLowerCase().includes(search.toLowerCase())
        )
        .forEach(item => {
          const card = document.createElement("div");
          card.className = "card";

          // Create card content
          card.innerHTML = `
            <img src="${item.Image}" alt="${item.Name}">
            <h2>${item.Name}</h2>
            <p class="price">₹${item.Price}</p>
            <p>${item.Description}</p>
            <button class="buy-btn" data-link="${item.Link}">Buy Now</button>
          `;

          container.appendChild(card);
        });

      // Attach WhatsApp redirection to each button
      document.querySelectorAll(".buy-btn").forEach(button => {
        button.addEventListener("click", () => {
          const link = button.getAttribute("data-link");
          window.open(link, "_blank");
        });
      });
    }

    // Default load
    renderProducts();

    // Search
    document.getElementById("searchBox").addEventListener("input", (e) => {
      renderProducts(e.target.value);
    });

  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
fetchProducts();