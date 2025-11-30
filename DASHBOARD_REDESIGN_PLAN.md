# Dashboard Redesign Implementation Plan

## Overview
Redesigning the dashboard to match the modern learning management system design with:
- ✅ Calendar with event tracking
- ✅ Study plans management (CRUD operations)
- ✅ User settings with profile editing
- ✅ Language switcher on dashboard
- ✅ Status cards (Lessons, Assignments, Tests)
- ✅ Upcoming events sidebar

## Components Created

### 1. Calendar Component (`components/dashboard/Calendar.tsx`)
- Interactive monthly calendar
- Event indicators (colored dots)
- Multi-language month/day names
- Month navigation
- Click handlers for dates
- Event types: exam, plan, test
- Status indicators: completed, upcoming, failed

### 2. Study Plans Component (`components/dashboard/StudyPlans.tsx`)
- Add/Edit/Delete plans
- Plan categories:
  - Upcoming plans
  - Completed plans
  - Failed plans
- Plan properties:
  - Title, description
  - Target date
  - Target score (optional)
  - Type (exam/practice/goal)
  - Status (upcoming/completed/failed)
- Color-coded cards
- Full CRUD operations

### 3. User Settings Component (`components/dashboard/UserSettings.tsx`)
- Profile editing:
  - Name
  - Email
  - Phone number
  - Avatar upload
- Language switcher (3 languages)
- Save/Cancel functionality

## Translations Added

All three languages (Uzbek, Russian, English) now include:
- `dashboard.calendar.*`
- `dashboard.studyPlans.*`
- `dashboard.settings.*`

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Header: Search, Notifications, User Menu, Language         │
├─────────────┬───────────────────────────────┬───────────────┤
│  Sidebar    │  Main Content                 │  Right Panel  │
│             │                               │               │
│  Dashboard  │  Status Cards                 │  Calendar     │
│  Courses    │  ┌─────┬─────┬─────┐         │  ┌──────────┐ │
│  Chapter    │  │ 42  │ 08  │ 03  │         │  │ Nov 2025 │ │
│  Help       │  │Less │Assi │Test │         │  │ Mo Tu We │ │
│  Settings   │  └─────┴─────┴─────┘         │  │  1  2  3 │ │
│  FAQ        │                               │  │  ...     │ │
│  Logout     │  My Courses / Study Plans     │  └──────────┘ │
│             │  ┌─────────────────────────┐  │               │
│             │  │ Course/Plan Cards       │  │  Upcoming     │
│             │  │ with progress bars      │  │  ┌──────────┐ │
│             │  └─────────────────────────┘  │  │ Events   │ │
│             │                               │  │ List     │ │
│             │                               │  └──────────┘ │
└─────────────┴───────────────────────────────┴───────────────┘
```

## Features

### Status Cards
- Lessons completed (with progress circle)
- Assignments completed (with progress circle)
- Tests completed (with progress circle)

### Calendar Features
- Current month display
- Event indicators (colored dots)
- Hover to see event details
- Click to view/edit events

### Study Plans Features
- Create new plans with dialog
- Edit existing plans
- Delete plans
- Mark as completed/failed
- Filter by status
- Target score tracking
- Due date tracking

### User Settings Features
- Upload profile photo
- Edit personal information
- Change language (affects entire app)
- Save changes with validation

## Next Steps

1. Update the main dashboard page to use these components
2. Add state management for plans and events
3. Integrate with localStorage for persistence
4. Add animations and transitions
5. Test all CRUD operations
6. Verify translations in all languages

## File Structure

```
components/
  dashboard/
    Calendar.tsx          ✅ Created
    StudyPlans.tsx        ✅ Created
    UserSettings.tsx      ✅ Created
    
lib/
  translations.ts         ✅ Updated with new translations
  
app/
  (dashboard)/
    dashboard/
      page.tsx           ⏳ To be updated
```

## Design Inspiration

Based on the Quyl learning management system design:
- Clean, modern interface
- Soft color palette
- Card-based layout
- Progress indicators
- Calendar integration
- Status tracking
- Multi-language support
