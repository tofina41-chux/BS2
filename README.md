# BS2 Booking-System-2

# FOLDER STRUCTURE
BS2-Booking-System/
├── client/                # React + Tailwind Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI (Buttons, Inputs)
│   │   ├── pages/         # Dashboard, BookingPage, Login
│   │   ├── services/      # API calls to the backend
│   │   └── App.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Node.js + Express Backend (MVC)
│   ├── config/            # Database connection
│   ├── controllers/       # Logic (how to book, how to cancel)
│   ├── models/            # Data schemas (Room, User, Booking)
│   ├── routes/            # API Endpoints (e.g., /api/rooms)
│   ├── middleware/        # Auth and validation
│   ├── .env               # Private keys/secrets
│   ├── package.json
│   └── server.js
├── .gitignore             # Tells Git to ignore node_modules
└── README.md              # Project description
