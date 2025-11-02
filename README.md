# Mood Tracker App

A simple React app to track your daily moods, thoughts, and get inspirational quotes. Built with **React**, **Vite**, and **Tailwind CSS**, featuring **light/dark themes**, **forms**, and **API integration**.

## Features

* Select your **current mood** (Happy, Sad, Excited, Calm, Angry, Tired)
* Submit your **thoughts**
* Fetch **inspirational quotes** based on mood
* Maintain a **history of recent quotes**
* **Light/Dark mode** toggle with local storage persistence
* Responsive design for mobile and desktop


## Tech Stack

* **React** (Functional components & hooks)
* **Vite** (Fast build tool)
* **Tailwind CSS** (Utility-first styling)
* **Local storage** (to persist theme preference)
* Optional backend for user history (can be added)


## Getting Started

### Prerequisites

* Node.js v18+
* npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/dcsarmistha/MOOD-TRACKER.git
cd <repo-folder>

# Install dependencies
npm install

### Run Dev Server

```bash
npm run dev


Open your browser at `http://localhost:5173` (Vite default port).

---

## Folder Structure

```
src/
 ├─ App.jsx        # Main app component
 ├─ index.css      # Tailwind + custom styles
 
```

---

## How It Works

1. **Select a mood** → triggers API call for a quote.
2. **Submit a thought** → fetches a new quote and clears the form.
3. **Toggle theme** → updates light/dark mode and saves preference in local storage.
4. **History** → last 20 quotes stored in state and displayed as a grid.

---

## Customization

* **Add moods**: Extend `moods` array in `App.jsx`
* **Change API**: Update `fetchQuote()` function to call a different endpoint
* **Styling**: Modify Tailwind classes or custom CSS in `index.css`

---

## License

MIT License

---

**Enjoy tracking your mood and getting inspired daily!**
