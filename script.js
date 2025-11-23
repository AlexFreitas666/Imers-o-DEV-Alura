let data = [];

window.onload = async () => {
  addModalToDOM();
  await loadData();
  
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", search);

  // Close modal logic
  const modal = document.getElementById("game-list-modal");
  const closeBtn = document.querySelector(".modal-close");
  closeBtn.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
};

async function loadData() {
  try {
    const response = await fetch("data.json");
    data = await response.json();
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function search() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase();

  const filteredData = data.filter((console) =>
    console.name.toLowerCase().includes(searchTerm)
  );
  displayResults(filteredData);
}

function displayResults(results) {
  const container = document.querySelector(".card-container");
  container.innerHTML = "";

  if (document.getElementById("search-input").value && results.length === 0) {
    container.innerHTML = "<p>No consoles found.</p>";
    return;
  }

  results.forEach((console) => {
    let gamesDisplay;
    // Check if a game list file exists for this console
    if (console.game_list_file) {
      // Create a link that calls our JavaScript function
      gamesDisplay = `<a href="javascript:void(0)" onclick="showGameList('${console.game_list_file}')">${console.released_games_count}</a>`;
    } else {
      gamesDisplay = console.released_games_count;
    }

    const consoleArticle = document.createElement("article");
    consoleArticle.innerHTML = `
      <div class="article-content">
        <h2>${console.name}</h2>
        <p><strong>Manufacturer:</strong> ${console.manufacturer}</p>
        <p><strong>Generation:</strong> ${console.generation}</p>
        <p><strong>Release Year:</strong> ${console.production_years.start}</p>
        <p><strong>Units Sold Globally:</strong> ${console.units_sold_global}</p>
        <p><strong>Released Games:</strong> ${gamesDisplay}</p>
        <p>${console.notes}</p>
        <p><a href="${console.wikipedia_link}" target="_blank">Read more on Wikipedia</a></p>
      </div>
      <div class="article-image-container">
        <img src="${console.image_tag}" alt="Image of ${console.name}">
      </div>
    `;
    container.appendChild(consoleArticle);
  });
}

async function showGameList(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Could not fetch ${filePath}. File not found or error.`);
    }
    const gameData = await response.json();
    
    const modal = document.getElementById("game-list-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    modalTitle.textContent = `Games for ${gameData.console}`;
    
    let gameListHtml = '<ul>';
    // Check for nested array structure in the JSON and get the correct list.
    const games = Array.isArray(gameData.games[0]) ? gameData.games[0] : gameData.games;

    games.forEach(game => {
      gameListHtml += `<li>${game.title}</li>`;
    });
    gameListHtml += '</ul>';

    modalBody.innerHTML = gameListHtml;
    modal.style.display = "block";

  } catch (error) {
    console.error("Error loading game list:", error);
    alert("Could not load the game list. See console for details.");
  }
}

function addModalToDOM() {
  const modalHTML = `
    <div id="game-list-modal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2 id="modal-title">Game List</h2>
        <div id="modal-body"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modalStyle = `
    .modal { display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.5); }
    .modal-content { background-color: #2c2c2c; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 500px; border-radius: 8px; position: relative; }
    .modal-close { color: #aaa; float: right; font-size: 28px; font-weight: bold; position: absolute; top: 10px; right: 20px; }
    .modal-close:hover, .modal-close:focus { color: white; text-decoration: none; cursor: pointer; }
    #modal-body ul { list-style-type: disc; padding-left: 20px; }
    #modal-body li { margin-bottom: 8px; }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = modalStyle;
  document.head.appendChild(styleSheet);
}
