# Web based fluent design notepad builded with Svelte and Fluent Svelte library.

## Local development

### Preliminary requirements
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) with `npm`
- [Firebase](https://firebase.google.com/) with Firestore and Auth

### Building

#### 1: Clone this repository

```git clone https://github.com/oleklukasiewicz/fluent-pad.git ```
</br>
then
</br>
```cd fluent-pad```

#### 2: Install Dependencies
```npm i```
#### 3: Set up Firebase config

- Create new project in Firebase and set up firestore and auth

create .env file with following content:
```
API_KEY="YOUR_API_KEY"
AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
PROJECT_ID="YOUR_PROJECT_ID"
STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
SENDER_ID="YOUR_MESSEGING_SENDER_ID"
APP_ID="YOUR_APP_ID"
MEASURE_ID="YOUR_MEASUREMENT_ID"
```
#### 4: Run Build Script

```npm run dev```