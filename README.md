# Ficy - A Song of Ice and Fire Web Application

## Overview

Ficy is a single-page web application built with Angular that provides an engaging experience around the "A Song of Ice and Fire" universe. Leveraging a custom Node.js server with pre-fetched data from the [An API of Ice and Fire](https://anapioficeandfire.com), the app offers flexible and comprehensive browsing, searching, and favoriting capabilities for characters, books, and houses.

## Features

- **User Authentication:** Login and registration system.
- **Home Page:** Displays top 3 random characters, books, and houses as recommendations.
- **Dedicated Pages:** Separate pages for Characters, Books, and Houses, each with detailed views.
- **Search Functionality:** Search and filter items within each section.
- **Favorites:** Users can add or remove items (characters, books, houses) from their favorites list.
- **Responsive & Mobile-First Design:** Optimized for both mobile devices and desktop screens.
- **State Management:** Utilizes NgRx for managing application state efficiently.

## Technologies Used

- Angular
- NgRx
- Node.js (for backend data handling)
- Docker
- HTML5 & CSS3 (with a mobile-first approach)
- TypeScript

## Setup Instructions

### Prerequisites

- Docker installed and running
- Node.js (v20 or higher)
- Angular CLI (v19 or higher)
- npm (comes with Node.js)

### Environment Configuration

- Update your `.env` file with your preferred settings before running the containers.

### Running with Docker

To build and start the entire application stack, run:

```bash
docker-compose up --build
```

Ensure your `.env` file is configured correctly before executing this command.

### Running Backend and Frontend Separately

If you prefer to run the backend and frontend independently:

- **Backend:**

```bash
cd backend
npm install
npm run dev
```

- **Frontend:**

```bash
cd frontend
npm install
ng build
ng serve
```

_(Make sure your backend server is running and accessible at the configured URL)_

### Running Dockerized MongoDB

To run MongoDB separately, use:

```bash
docker run -d -p 27017:27017 --name mongo mongo
```

## Usage

- Register a new account or log in.
- On the Home page, view recommended top 3 random items.
- Browse Characters, Books, or Houses via dedicated pages.
- Use the search bar to filter items.
- View detailed information on each item.
- Add or remove items from your favorites list using the Favorites page.

## Demo

_(may be in future)_

## License

This project is open-source and available under the MIT License.

## Contact

For questions or feedback, contact: sirendra99@gmail.com

---

_Note:_ Ensure your backend server is running and accessible for the frontend to fetch data properly.

---

**Enjoy exploring the world of Ice and Fire with Ficy!**
