# DailyDo - Your AI-Powered Task Manager

This is a Next.js application built with Firebase and Genkit. It provides a simple yet powerful task management interface with AI-powered features like priority suggestions.

## Running the Project Locally

To run this application on your local system, you will need to set up a Firebase project and configure your environment.

### Prerequisites

-   **Node.js**: Version 18.x or later. You can download it from [nodejs.org](https://nodejs.org/).
-   **Firebase Account**: A Google account to create and manage your Firebase project. Sign up at [firebase.google.com](https://firebase.google.com/).
-   **Firebase CLI**: The command-line interface for Firebase. Install it globally after installing Node.js:
    ```bash
    npm install -g firebase-tools
    ```

### Step 1: Get the Code

If you were working with a git repository, you would clone it. For this environment, you already have the code.

### Step 2: Install Dependencies

Navigate to the project's root directory in your terminal and install the required npm packages:

```bash
npm install
```

### Step 3: Set Up Your Firebase Project

1.  **Create a Firebase Project**: Go to the [Firebase console](https://console.firebase.google.com/) and create a new project.
2.  **Add a Web App**: Inside your new project, add a new Web Application. Firebase will provide you with a `firebaseConfig` object. You will need these values for the next step.
3.  **Enable Authentication**: In the Firebase console, go to the "Authentication" section and enable the **Email/Password** and **Google** sign-in providers.
4.  **Enable Firestore**: Go to the "Firestore Database" section and create a new database. Start in **production mode**. The default location is fine.

### Step 4: Configure Environment Variables

1.  In the project root, create a new file named `.env.local`.
2.  Copy the contents of the `.env` file into your new `.env.local` file.
3.  Fill in the Firebase configuration values from the previous step. All variables must start with `NEXT_PUBLIC_`.

    Your `.env.local` should look like this:
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_PROJECT_ID.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    # ... and so on for all the firebase config values.

    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```
4. **Get a Gemini API Key**: To use the AI features, you'll need an API key for the Gemini model. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey). Add this key to your `.env.local` file.

### Step 5: Deploy Firestore Security Rules

The project includes security rules in `firestore.rules`. You need to deploy these to your Firebase project.

1.  Log in to the Firebase CLI:
    ```bash
    firebase login
    ```
2.  Set your active project. Replace `YOUR_PROJECT_ID` with the ID of the project you created.
    ```bash
    firebase use YOUR_PROJECT_ID
    ```
3.  Deploy the Firestore rules:
    ```bash
    firebase deploy --only firestore:rules
    ```

### Step 6: Run the Application

This application requires two processes to run concurrently: the Next.js frontend and the Genkit AI server.

1.  **Start the Next.js development server**:
    ```bash
    npm run dev
    ```
    This will start the main application, typically on [http://localhost:3000](http://localhost:3000).

2.  **Start the Genkit development server**: In a **new terminal window**, run:
    ```bash
    npm run genkit:dev
    ```
    This starts the server that handles the AI-powered suggestions.

Your application should now be fully running locally!
