# Sales Performance Dashboard

A modern data visualization application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, following the **Atomic Design** principle.

## Features
- **Atomic Design Architecture**: Components are organized into Atoms, Molecules, Organisms, and Templates for maximum reusability.
- **Dynamic Data Visualization**: Switch between **Bar Charts** and **Line Charts** using Recharts.
- **Sales Filtering**: Custom input to set a minimum sales threshold, filtering data in real-time.
- **Mock API Integration**: Data is served via an internal Next.js Route Handler to simulate real-world API fetching.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Language**: TypeScript

## Project Structure
```text
src/
  ├── app/              # Routes & API Handlers
  └── components/
      ├── atoms/        # Smallest units (Button, Input, Heading)
      ├── molecules/    # Combinations of atoms (ChartToggle, FilterGroup)
      ├── organisms/    # Complex functional blocks (SalesChartCard, Sidebar)
      └── templates/    # Page layouts (DashboardLayout)

```
## Data Insights & Logic
- **Sorting**: Data is automatically sorted chronologically (Jan -> Dec) using a custom `monthOrder` property.
- **Aggregation**: To prevent "tangled lines" in visualization, the app aggregates multiple daily orders into a single monthly data point.
- **Null Safety**: Uses Recharts' `connectNulls` to ensure a smooth visual experience even if specific months have no data.

## Installation & Setup

Clone the repository:

```
git clone <your-github-link>
cd sales-dashboard
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open http://localhost:3000/dashboard to see the result.

## Dashboard Preview
<img width="1919" height="1079" alt="preview" src="https://github.com/user-attachments/assets/0dd8064a-3e4b-44dd-8cd5-5008a2fbd659" />
