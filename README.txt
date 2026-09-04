Shariff Muhammad u23611732

PiqHarbour - Deliverable 1

GitHub repository: https://github.com/NIILLEE/PiqHarbour

How to build and run using Docker:

-Make sure Docker Desktop is running.
-Open a terminal in the root of this project (where docker-compose.yml is located).
-Run the following command to build and start both containers:

   docker-compose up --build

-Once both containers are running, open your browser and go to:

   Frontend: http://localhost:5173
   Backend:  http://localhost:3000

-To stop the containers, press Ctrl+C in the terminal, then run:

   docker-compose down

Directory structure:

PiqHarbour/
├── frontend/ - React app (built with Vite)
│   ├── src/
│   │   ├── components/ - Reusable UI components
│   │   ├── pages/ - Page-level components (Splash, Home, Profile, Post, Search)
│   │   └── assets/ - Images and dummy data
│   └── Dockerfile
├── backend/ - Express server
│   ├── server.js- Stubbed authentication endpoints (login, signup)
│   └── Dockerfile
└── docker-compose.yml - Runs both frontend and backend containers together