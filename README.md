# Demo Finance Tracker

This is a demo React app that lets you track your personal finances. You can view, edit and add transactions, and track your daily spending habits.

The app was built as part of a technical task to create reusable UI components and showcase them in a small, realistic application.

## Live demo

The live demo can be accessed through Github pages at [https://mirakeers.github.io/demo-finance-tracker/](https://mirakeers.github.io/demo-finance-tracker/)

## Installation

### npm i

Install dependencies

### npm run dev

Run the app in development mode

### npm run build

Create a production build

### npm run storybook

Run Storybook with component examples

## Components

### DataGrid

- Client-side sorting and filtering
- Column-based configuration (label, accessor, visibility)
- Supports loading and empty states
- Designed as a presentational component (no data fetching)

### Timeline

- Displays transactions grouped by day
- Focuses on a single selected day (acts as a "current day" visualizer)
- Updates application state when navigating between days
- Serves as a driver for date-based filtering

### Form (Add / Edit Transaction)

- Controlled inputs using headless UI components
- Fields: Date, Category, Amount, Description
- Validation on submit
- Supports both create and edit flows via shared component
- Integrated in a modal dialog

## Application

The app combines all components into a single page:

- Timeline controls the currently selected day
- DataGrid displays filtered transactions
- "Add transaction" opens a modal form
- Editing is triggered from the grid (actions column)

## Architecture

### Data sources

- Imported dataset (mock CSV)
- Manual transactions (stored in cookies)
- Overrides for imported transactions (stored in cookies)

### Data structure

```
type Transaction = {
  id: string;
  date: Date;
  amount: number;
  description: string;
  category: Category;
  source: TransactionSource;
};
```

- Imported data remains immutable
- Edits to imported data are stored as overrides
- Manual entries are stored separately and merged at runtime

### State management

- useTransactions
  - Loads imported data
  - Reads/writes cookies for manual data and overrides
  - Merges all data into a single list

- useTransactionViewState
  - Manages filters and current day
  - Handles interaction between Timeline and DataGrid

### Key decisions

- Single source of truth in hooks
- Data fetching and mutations live in hooks, not components
- Separation of concerns
- Components are mostly presentational and reusable
- String-based date filters, Date-based data
  - UI uses strings (for inputs and placeholders)
  - Core data uses Date objects

- Cookie persistence (simple approach): Used to persist manual data without introducing a backend

## Further development

The following items from the original task or natural extensions were not fully implemented:

### DataGrid

- Pagination
- Column hide/show configuration UI
- Error state UI
- Mobile table layout improvements

### Timeline

- Full keyboard navigation (arrow keys)
- Screen-reader announcements for navigation
- More advanced grouping options (e.g. week/month)
- Click category → filter integration

### Form

- Explicit success message region (ARIA live region)
- More advanced validation feedback patterns

### General UX

- Transitional animations (e.g. modal, timeline changes)
- Improved mobile responsiveness (especially DataGrid)
- Better empty/error states across components

### Tooling / Documentation

- Complete Storybook coverage and documentation

### Data / persistence

- Replace cookies with a more robust persistence layer
- Sync between multiple sessions/devices

## Attributions

**Personal_Finance_Dataset.csv** is sourced from [https://www.kaggle.com/datasets/ramyapintchy/personal-finance-data](https://www.kaggle.com/datasets/ramyapintchy/personal-finance-data). It was further transformed with the help of an LLM into **Personal_Finance_Dataset_Austria_Updated.csv**
