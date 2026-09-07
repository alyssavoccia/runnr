# Runnr

An app built with React & Firebase that can be used to track runs and provide insights/analytics into training.

## Features to be implemented

- [x] Google sign-in
- [x] Import data
  - [x] Apple Health
  - [x] Garmin Connect
- [ ] Weekly overview
- [ ] Graph displaying mileage trend
- [ ] All workouts with the ability to add different tags (Easy Run, Long Run, Tempo, Interval, etc.) and notes
- [ ] VO2 Max and paces
- [ ] Race predictions
- [ ] Best efforts/insights
- [ ] Track shoe mileage
- [ ] Auto-sync workouts

As I continue building out the app, I will be looking into other features and improvements that can be made to give users more insights into their training.

---

## Prerequisites

| Tool           | Notes                                                       |
| -------------- | ----------------------------------------------------------- |
| Node.js        | [ nodejs.org ](https://nodejs.org) download the LTS version |
| Firebase       | `npm install firebase`                                      |
| Google account | Used for Firebase and Google Sign-In                        |

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/alyssavoccia/runnr.git
cd runnr
npm install
```

---

### 2. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and sign in.
2. Click **Create a new Firebase project** → enter a name, e.g. `runnr-app`.
3. You can disable disable AI assistance & Google Analytics.
4. Click **Create project**.
   > **Free tier is enough for this project.**

---

### 3. Enable Firestore

1. In the Firebase console sidebar, go to **Databases & Storage** → **Firestore**.
2. Click **Create database**.
3. Select Standard edition.
4. Choose a region close to you (e.g. `nam5` for North America, `eur3` for Europe). **This cannot be changed later.**
5. Start in production mode.
6. Click **Create**.

---

### 4. Enable Google Authentication

1. Firebase console sidebar → **Security** → **Authentication**.
2. Click Get started.
3. Under Additional providers click **Google** → toggle **Enable** → enter a support email → **Save**.

---

### 5. Register the web app and get your config

1. Firebase console sidebar → Settings → click the **`</>`** (Web) icon.
2. Enter nickname `runnr-web`. Do **not** enable Firebase Hosting.
3. Click **Register app**.
4. A `firebaseConfig` object appears, copy all values in firebaseConfig.

---

### 6. Add your config to `src/firebase.js`

Open `src/firebase.js` and replace each placeholder:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...", // ← paste yours
  authDomain: "runnr-app.firebaseapp.com", // ← paste yours
  projectId: "runnr-app", // ← paste yours
  storageBucket: "runnr-app.firebasestorage.app", // ← paste yours
  messagingSenderId: "123456789012", // ← paste yours
  appId: "1:123456789012:web:abc123", // ← paste yours
};
```

---

### 7. Deploy Firestore security rules

The rules in `firestore.rules` lock each user's data to their own account.

```bash
# Login to Firebase
firebase  login

# Initialize your project configuration
# Select Firestore from the list
firebase init

# Deploy the rules
firebase deploy --only firestore:rules
```

---

### 8. Run locally

```bash
npm  run  dev
```
