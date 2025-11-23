# Video Game Consoles Database

This project is a simple and interactive web application that serves as a database for classic and modern video game consoles. It allows users to browse and search for information about various consoles, from the first generation to the most recent ones.

This project was developed as part of the "Imersão DEV com IA" by Alura.

## Features

- **Dynamic Card Display:** Consoles are loaded from a JSON file and displayed as informative cards.
- **Search Functionality:** Users can search for consoles by name. The list updates in real-time as the user types.
- **Detailed Information:** Each card provides key details about the console, including:
    - Generation and manufacturer
    - Production years
    - Technical specifications (Processor, RAM, etc.)
    - Global units sold
    - Release price
    - Fun facts and relevant notes
- **External Links:** A link to the console's Wikipedia page is provided for more in-depth information.

## How to Use

1.  Open the `index.html` file in your web browser.
2.  All video game consoles from the database will be displayed on the main page.
3.  To find a specific console, use the search bar at the top. Start typing the name of the console, and the list will automatically filter to show matching results.

## Technologies Used

-   **HTML5:** For the basic structure of the web page.
-   **CSS3:** For styling the layout, cards, and other visual elements.
-   **JavaScript (ES6+):** For fetching data, dynamically creating elements, and implementing the search functionality.
-   **JSON:** As the data format for storing the console and game information.

## Project Structure

```
.
├── 📁 games_list/      # Contains JSON files with game lists for each console
├── 📁 images/          # Contains images of the consoles
├── 📄 data.json        # Main database file with information on all consoles
├── 📄 index.html       # The main HTML file
├── 📄 script.js        # The core JavaScript file for application logic
├── 📄 style.css        # The CSS file for styling
└── 📄 README.md        # This file
```

## Credits

This project was created by Rosana Galvão during the Alura Imersão DEV com IA.