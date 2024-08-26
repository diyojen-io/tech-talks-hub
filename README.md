# TechTalks Hub

TechTalks Hub aims to provide a platform where organizations can host and share tech talks. Our goal is to facilitate knowledge sharing by allowing organizations to support their tech talks with materials, enabling users to follow, receive notifications, and ask questions about the talks. This project is open source and community-supported.

## Features

- **Create and Share Tech Talks:** Organizations can create tech talks and share them with the community.
- **Material Support:** Organizations can upload supporting materials for their tech talks.
- **User Interaction:** Users can follow tech talks, receive notifications, and ask questions.
- **Community Supported:** Open-source project encouraging community contributions.

## Tech Stack

- **Framework:** Next.js with app router
- **UI Library:** Material UI v5
- **Backend:** Firebase

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js installed
- Firebase account

### Installation

1. **Clone the repo:**
   ```sh
   git clone https://github.com/diyojen-io/tech-talks-hub.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd tech-talks-hub
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
   or
   ```sh
   yarn
   ```
4. **Set up Firebase:**

   - Create a new Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Add a new web app to your Firebase project.
   - Copy the Firebase configuration and add it to your project.

5. **Create a `.env.local` file in the root directory and add your Firebase configuration:**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### Running the App

1. **Start the development server:**

   ```sh
   npm run dev
   ```

   or

   ```sh
   yarn dev
   ```

## Contributing

Contributions are what make the open-source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
