# Formula One Explorer

A React + TypeScript application for exploring Formula 1 seasons, races, and race results using the Ergast API.

## Setup & Run

1. Install dependencies:
   ```bash
   npm install

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Run unit tests:

   ```bash
   npm run test
   ```

4. Run end-to-end tests (optional):

   ```bash
   npm run test:e2e
   ```

## Technical Overview

* Built with **React**, **TypeScript**, and **React Router**.
* Used **Material UI** (`@mui/material`) for UI components and toggle controls.
* Integrated **nprogress** for loading indicators and **recharts** for data visualization.
* Seasons are fetched once, sorted descendingly, and paginated client-side.
* Server-side pagination implemented for Races using `offset` and `limit`.
* Pinned races are persisted using `localStorage`.

## Code Architecture

* The codebase is **clean, modular**, and easy to maintain.
* Reusable, **generic components** were created for Card and List views (`CardsListView`, `ListView`).
* Clear separation of concerns across components, views, and services.

## Notable Features

* Toggle between **Card view** and **List view** for both Seasons and Races.
* Ability to **pin favorite races** which persist after refresh and appear at the top.
* **Interactive bar chart** showing driver performance by race time.
* **Responsive layout** with thoughtful UI styling and accessibility considerations.

## Design Decision: Pin Behavior

**Should pinned races be removed when selecting a different season?**

* ✅ Yes, if pins are intended to be per-season
* ❌ No, if you want users to build a cross-season favorite list

> This implementation resets pinned races when selecting a new season, treating pins as season-specific.
