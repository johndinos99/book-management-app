# Book Management App

This is a full-stack web application for managing a book collection saved on a remote database. The project provides a simple frontend for adding and searching books, communicating with a RESTful backend API through AJAX requests and a MySQL database.

It was created as part of the **Web Technologies and Applications** university course. The course focuses on developing modern web applications. Topics covered included web protocols and HTTP, HTML/CSS, JavaScript and the DOM, event-driven and asynchronous programming, REST APIs and web services, Node.js, client-server and three-tier architectures, MVC applications and cloud-based development.

## App Features

- Simple UI using vanilla HTML, CSS, JavaScript frontend with AJAX
- Form for adding new books to the database
- Field validation for the required input (Title, Author, Genre & Price)
- Select the book genre from a dropdown
- Search for books by keyword
- Display search results in a structured table
- RESTful API for book management
- MySQL database for storing books information

## Technologies

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js - Express JS
- **Database:** MySQL
- **Communication:** REST API / AJAX

## Frontend

The UI contains a search bar at the top where users can search for books by entering keywords. There is also a form at the bottom where users can add books to the database by providing the title, author, genre and price..

In the genre section, The user will be able to choose from the following:

- Science Fiction
- Satire
- Drama
- Action and Adventure
- Romance
- Mystery
- Horror

<img width="900" height="700" alt="app-frontend" title="App UI" src="https://github.com/user-attachments/assets/741dbbc9-4456-4ad4-8763-bddc05c7dfa5" />

In the **Add a Book** section at the bottom, if the user tries to submit an empty form, the validation system in and the UI informs the user of the required fields.

<img width="500" height="500" alt="app-frontend-form-validation" title="Form validation" src="https://github.com/user-attachments/assets/59936f4a-4b1c-4b7e-9358-db7929842bb8" />

The UI also informs the user if they try to enter a negative value in the price field.

<img width="500" height="490" alt="app-frontend-form-validation-price" title="Price validation" src="https://github.com/user-attachments/assets/b87c52ed-e984-40f4-838f-07d38c65785f" />

Once the user has submitted the required data, they can press the **Add Book** button to add a book. If the process is successful, a pop-up message will appear to notify the user.

**Success:**

<img width="400" height="166" alt="app-frontend-success" title="Success message" src="https://github.com/user-attachments/assets/5fc32ca6-11d9-4c07-abd5-9d2ed9815976" />

**Failure:**

<img width="400" height="160" alt="app-frontend-fail" title="Fail message" src="https://github.com/user-attachments/assets/b6e67f6f-c0cf-4813-ab88-806e2a712347" />

In the **Search Books** section at the top, entering a keyword will display matching books in a structured table at the bottom.

<img width="600" height="252" alt="app-frontend-search-results" title="Search results" src="https://github.com/user-attachments/assets/0013e847-8269-48f1-a555-e1d24903a2a6" />

If there are no matching books, this row appears inside the table.

<img width="600" height="244" alt="app-frontend-search-no-results" title="No results message" src="https://github.com/user-attachments/assets/acf7d1ce-1e8e-46af-9955-0a5dd19d961f" />

## Backend

The backend is a simple RESTfull API using the Express JS library and is connected to an MySQL database for storing all the information.

### API Endpoints

### Search Books

```http
GET /books/{keyword}
```

Searches for books whose title contains the specified keyword.

**Example:**

```http
GET /books/rings
```

Returns a JSON array containing the matching books.

```json
[
    {
        "id": "5",
        "title": "Lord of the Rings",
        "author": "J. R. R. Tolkien",
        "genre": "Fantasy",
        "price": 19.99
    },

    {...}
]
```

### Add Book

```http
POST /books/
```

Adds a new book to the database.

**Request body:**

```json
{
    "title": "The Rings of Saturn",
    "author": "W. G. Sebald",
    "genre": "Sciense Fiction",
    "price": 13.99
}
```

The API returns a JSON response indicating whether the operation was successful.

### Database

The application uses a table named `books` with the following structure:

```sql
CREATE TABLE books (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(25) NOT NULL,
    title VARCHAR(40) NOT NULL,
    genre VARCHAR(20) NOT NULL,
    price FLOAT NOT NULL
);
```

## Project Structure

```text
/
├── frontend/
│   ├── frontend.html
│   ├── script.js
│   └── style.css
│
└── src/
    ├── controllers
    │   └── books.js
    |
    ├── database
    │   └── db.js
    |
    ├── routes
    │   └── books.js
    |
    └── app.js
...
```

## Running the Project

### Requirements

Before running the project, make sure you have:

- [Node.js](https://nodejs.org/) installed
- A running **MySQL** database
- The required database and [books](#database) table configured

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install the project dependencies:

```bash
npm install
```

3. Create the required `.env` file using `example.env` as a reference.

   Add your MySQL database connection details to the `.env` file.

4. Start the server:

```bash
npm run start
```

The server will start at:

```text
http://localhost:3000
```

5. Open `frontend.html` in your browser to use the application.
