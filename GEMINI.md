# Gemini CLI Instructions for Church App Redesign

## Project Overview
Update the existing church ministry application to use a unified design system across mobile and desktop platforms. The app is called "Jesus Is Lord Radio" and includes features for live radio streaming, teachings, events, and more.

**IMPORTANT BRANDING:**
- Station Name: "Jesus Is Lord Radio" (NOT "JIL Radio")
- Logo: Use `/logo.png` from public folder (already exists in project)
- Always use full station name in headers and player displays

## Design System Reference
Use the `design.json` file provided as the single source of truth for all styling decisions.

---

## Core Requirements

### 1. **Unified Live Indicator Component**
Create a consistent live indicator badge that appears across all screens:

**Mobile Implementation:**
- Red pulsing dot (8px) + "LIVE" text
- Background: Light red (#FEE2E2)
- Text: Red (#EF4444), 12px, uppercase, bold
- Padding: 4px 12px
- Fully rounded corners
- Add CSS animation for pulsing dot (see design.json animations.pulse)

**Desktop Implementation:**
- Same styling but slightly larger (14px text)
- Padding: 6px 16px
- Pulsing dot: 8px

**Usage:** Apply to:
- Home page featured content (when live)
- Live radio player (always when streaming)
- Event cards when streaming live
- Program cards during live broadcasts

---

### 2. **Unified Radio Player Component**

**CRITICAL:** The radio player must be the SAME component whether it appears on the Home page or the Live Radio page. Both instances should:
- Share the same playing state
- Display the same current program information
- Control the same audio stream
- Show/hide based on live status

**When to Show:**
- **On Home Page:** Display as featured card ONLY when station is live
- **On Radio Page:** Always display the player interface
- **Live Status Detection:** Component checks if station is currently broadcasting and updates UI accordingly

**States to Handle:**
1. **Live + Playing:** Show live indicator, animated waveform, pause button
2. **Live + Paused:** Show live indicator, static waveform, play button
3. **Offline:** Show schedule/upcoming program, disable play button, hide live indicator

**Component Structure:**
```
<RadioPlayer 
  variant="home-featured" | "page-full" | "mini-player"
  isLive={stationLiveStatus}
  isPlaying={audioPlaying}
  currentProgram={programData}
/>
```

---

### 3. **App Header Structure**

**CRITICAL:** Headers must include language selector and notifications on ALL pages

**Mobile Header:**
```
[Logo "Jesus Is Lord Radio"] ............ [Globe Icon] [Bell Icon]
```
- Logo: Use `/logo.png` (height: 32px)
- Globe icon: Language selector button
- Bell icon: Notifications button (with red dot badge if unread)
- Background: White with bottom border
- Sticky position at top

**Desktop Header:**
```
[Logo] [Home] [Radio] [Teachings] [Events] ............ [Globe] [Bell] [Profile]
```
- Logo: Use `/logo.png` (height: 32px) on left
- Navigation items: Centered group
- Globe icon: Language selector
- Bell icon: Notifications (with badge)
- Profile icon/avatar: Right side
- Fixed position at top

**Header Components to Create:**
1. Language selector modal/dropdown
2. Notifications panel/dropdown
3. Icon buttons with hover states
4. Notification badge (red dot indicator)

---

### 4. **Responsive Navigation System**

**Mobile Navigation (Bottom Tab Bar):**
- Fixed position at bottom
- Height: 64px
- White background with top border (#E5E7EB)
- 5 items: Home, Radio, Teachings, Events, More
- Each item: icon (24px) + label (12px)
- Active state: Blue (#2563EB)
- Inactive state: Gray (#6B7280)
- Add safe area padding for iOS

**Desktop Navigation (Integrated in Header):**
- Navigation items appear in center of header bar
- Items: Home, Radio, Teachings, Events
- Horizontal layout with 8px gap
- Each item: icon + label (14px)
- Active state: Blue background (#DBEAFE) + blue text
- Hover state: Light gray background (#F3F4F6)
- No "More" option on desktop (all items visible)

**Transformation:**
- Use CSS media query at 1024px breakpoint
- Bottom nav: `display: flex` on mobile, `display: none` on desktop
- Header nav: `display: none` on mobile, `display: flex` on desktop

---

### 5. **Page-Specific Updates**

#### **Home Page**

**Mobile Layout:**
```
- Header: [Logo] [Globe] [Bell]
- Featured Live Card (ONLY if station is live):
  - Same RadioPlayer component as Radio page
  - Background image with gradient overlay
  - "LIVE" badge (top-left)
  - Title: Current program name (e.g., "Morning Devotion")
  - Subtitle: "with Pastor John"
  - Waveform animation (if playing)
  - Play/Pause button (centered)
  - OnClick: Navigate to full Radio page
- Upcoming Programs (horizontal scroll):
  - Card size: 128px x 170px
  - Thumbnail + title + time
- Recent Teachings (vertical list):
  - Thumbnail (48px) + title + speaker + duration
  - Download icon
- Upcoming Events:
  - Date badge + title + location
- Bottom: Mini player (if audio playing)
- Navigation bar
```

**Desktop Layout:**
```
- Header: [Logo] [Nav Items] [Globe] [Bell] [Profile]
- Main container: max-width 1280px, centered
- 3-column grid:
  - Left (8 cols): Featured live player + Upcoming programs
  - Right (4 cols): Recent teachings + Events sidebar
- Featured card: 
  - Larger, 21:9 aspect ratio
  - Same RadioPlayer component
  - Shows ONLY when live
- Program cards: 3-4 across
- Mini player: fixed bottom-right corner (if playing)
```

**Key Point:** The featured card on Home should use the exact same RadioPlayer component as the Radio page, just with `variant="home-featured"`. Both instances share state.

#### **Live Radio Player Page**

**Mobile Layout:**
```
- Header: [Back Arrow] ["Jesus Is Lord Radio"] [Globe] [Bell]
- "LIVE NOW" badge (centered, prominent)
- Large circular player (300px):
  - RadioPlayer component with variant="page-full"
  - Blue gradient rings (pulsing animation)
  - Microphone icon in center
  - Play/pause button below (64px)
- Program title: Current program name
- Host info: "Host: Pastor John Doe"
- Audio waveform visualization
- Share button
- Listener chat section (expandable):
  - "124 online" + "EXPAND" button
  - Message input + send button
  - Recent messages list
- Bottom: Navigation bar
```

**Desktop Layout:**
```
- Header: [Logo] [Nav Items] [Globe] [Bell] [Profile]
- Split view (centered, max-width 1280px):
  - Left (7 cols): 
    - Large circular player (400px)
    - RadioPlayer component
    - Program info
    - Controls
  - Right (5 cols): 
    - Live chat (always visible)
    - Full height
    - Message list scrollable
    - Input always at bottom
- No bottom navigation
```

**CRITICAL:** This page uses the SAME RadioPlayer component as Home page. The only differences are:
- Layout/size variants
- Chat is integrated on Radio page
- Always shows (not conditional on live status)
- Displays "Offline" state when not broadcasting

#### **Teachings Page**

**Mobile Layout:**
```
- Header: [Logo] [Globe] [Bell]
- Page title: "Teachings"
- Toggle: Audio / Video (tab selector)
- Filter button (funnel icon)
- "Popular on Spotify" section:
  - Sermon cards with cover art (square thumbnails)
  - Title + series info + duration
  - Three-dot menu for options
  - Vertical list layout
- "View more on Spotify" link (external)
- Bottom: Navigation bar
```

**Desktop Layout:**
```
- Header: [Logo] [Nav Items] [Globe] [Bell] [Profile]
- Main content (max-width 1280px):
  - Left sidebar (3 cols):
    - Filter options:
      - Speaker dropdown
      - Series dropdown
      - Date range picker
      - Topic tags
      - "Apply Filters" button
  - Right content (9 cols):
    - Audio/Video toggle at top
    - 3-column grid of sermon cards
    - Each card: 250px width
    - Hover: Lift effect + play button overlay
    - Load more button at bottom
```

#### **Events Page**

**Mobile Layout:**
```
- Header: [Logo] [Globe] [Bell]
- Page title: "Events"
- Calendar widget:
  - Month/year header with nav arrows
  - 7-column day grid (S M T W T F S)
  - Day cells (40px each)
  - Active date: Blue circle background
  - Event dates: Small colored dot below number
  - Today: Blue outline
- Selected date display: "Wednesday, Oct 25" + "3 Events" badge
- Event cards list:
  - Event icon (colored background)
  - Title + time range
  - Host/speaker name
  - Location/format
  - Action button:
    - "Join Live" (blue) for happening now
    - "Remind" for future events
    - "Add to Calendar" for upcoming
  - Different accent colors per event type:
    - Prayer: Orange
    - Youth: Blue
    - Service: Purple
- Bottom: Navigation bar
```

**Desktop Layout:**
```
- Header: [Logo] [Nav Items] [Globe] [Bell] [Profile]
- Two-column layout (max-width 1280px):
  - Left (5 cols): 
    - Large calendar widget (600px)
    - Month view with bigger day cells (60px)
    - Hover effects on dates
    - Event preview on hover
  - Right (7 cols):
    - Filter options at top:
      - Event type dropdown
      - Date range
      - Location/format
    - Event cards (larger, more details visible)
    - Quick action buttons visible on hover
    - Pagination if needed
```

---

### 6. **Component Specifications**

#### **Header Component**
**Required on ALL pages:**
```jsx
<Header>
  <Logo src="/logo.png" alt="Jesus Is Lord Radio" />
  {/* Desktop only: Navigation items */}
  <Navigation items={[Home, Radio, Teachings, Events]} />
  {/* Always visible: */}
  <LanguageSelector icon="globe" />
  <NotificationButton icon="bell" hasBadge={unreadCount > 0} />
  {/* Desktop only: */}
  <ProfileMenu />
</Header>
```

#### **RadioPlayer Component**
**Shared across Home and Radio pages:**
```jsx
<RadioPlayer
  variant="home-featured" | "page-full" | "mini-player"
  isLive={stationStatus.isLive}
  isPlaying={audioState.isPlaying}
  currentProgram={{
    title: "Morning Devotion",
    host: "Pastor John",
    startTime: "09:00 AM",
    backgroundImage: "/programs/morning-devotion.jpg"
  }}
  onPlayPause={handlePlayPause}
  onNavigateToFull={() => navigate('/radio')}
/>
```

**Key behaviors:**
- Home page: Only renders when `isLive === true`
- Radio page: Always renders, shows offline state when `isLive === false`
- Both instances control the same audio stream
- State synchronized via React Context or Redux

#### **LiveIndicator Component**
```jsx
<LiveIndicator size="sm" | "md" | "lg" />
```
- Always includes pulsing dot animation
- Use on: Featured player, event cards during stream, program cards

#### **Cards**
- Default: white background, 12px border-radius, subtle shadow
- Hover: Slight lift (transform: translateY(-2px))
- Padding: 16px mobile, 20px desktop

#### **Buttons**
- Primary: Blue (#2563EB), white text, 8px border-radius
- Secondary: Light gray background, dark text
- Icon buttons: 40px circle, gray background
- Play button: 64px circle, blue, white icon

#### **Typography Scale**
- Headings: 24px → 32px (mobile → desktop)
- Body: 16px (both)
- Small text: 12px → 14px
- Line height: 1.5

#### **Spacing System**
- Mobile padding: 16px
- Desktop padding: 32px
- Card gaps: 12px mobile, 24px desktop
- Section spacing: 24px mobile, 48px desktop

---

### 7. **Consistency Rules**

**Branding:**
- Station name: "Jesus Is Lord Radio" (NEVER abbreviate)
- Logo: Always use `/logo.png` from public folder
- Logo height: 32px mobile, 36px desktop

**Headers:**
- ALL pages must include: Logo + Globe + Bell icons
- Desktop adds: Navigation items + Profile
- Sticky on mobile, fixed on desktop
- White background with subtle border

**Radio Player:**
- MUST be the same component on Home and Radio pages
- Different visual layouts, same functionality
- Shares audio state across app
- Shows on Home ONLY when live
- Always shows on Radio page (with offline state if needed)

**Colors:**
- Use ONLY colors from design.json color palette
- Primary blue: #2563EB for all interactive elements
- Gray scale: defined neutral colors only
- Live red: #EF4444 with #FEE2E2 background

**Borders:**
- All borders: 1px solid #E5E7EB
- Border radius: 12px for cards, 8px for buttons, full for circles

**Shadows:**
- Cards: `0 1px 3px 0 rgba(0, 0, 0, 0.1)`
- Elevated: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- Player: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`

**Icons:**
- Mobile: 24px
- Desktop: 24-28px
- Use consistent icon library (recommend Lucide or Heroicons)

---

### 6. **Animations & Interactions**

**Required Animations:**
1. Live indicator pulse (2s infinite)
2. Fade in for page loads (0.3s)
3. Slide up for modals (0.3s)
4. Button hover: scale(1.02)
5. Card hover: translateY(-2px)

**Transitions:**
- All interactive elements: 0.2s ease
- Page transitions: 0.3s ease-in-out

---

### 7. **Accessibility Requirements**

- All interactive elements: minimum 44px touch target
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Focus states: 2px blue outline
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Screen reader announcements for live status

---

### 8. **Technical Implementation Notes**

**CSS Approach:**
- Use CSS custom properties for colors
- Mobile-first responsive design
- CSS Grid for layouts
- Flexbox for components

**React/Component Structure:**
```
components/
  - shared/
    - Header.jsx (logo + globe + bell + nav)
    - LiveIndicator.jsx (reusable badge)
    - LanguageSelector.jsx (modal/dropdown)
    - NotificationPanel.jsx (dropdown)
  - Navigation/
    - MobileNav.jsx (bottom tabs)
    - DesktopNav.jsx (header nav items)
  - Player/
    - RadioPlayer.jsx (unified component with variants)
    - MiniPlayer.jsx (bottom bar when playing)
    - PlayerControls.jsx
    - CircularVisualizer.jsx
  - Cards/
    - ProgramCard.jsx
    - TeachingCard.jsx
    - EventCard.jsx
```

**State Management:**
```javascript
// Global state (Context or Redux)
{
  station: {
    isLive: boolean,
    currentProgram: {
      title: string,
      host: string,
      backgroundImage: string
    }
  },
  audio: {
    isPlaying: boolean,
    currentTime: number,
    volume: number
  },
  navigation: {
    currentPage: string,
    previousPage: string
  },
  notifications: {
    unreadCount: number,
    items: []
  },
  language: {
    current: string,
    available: []
  }
}
```

**Critical Shared State:**
- RadioPlayer on Home and Radio pages must read from the SAME state
- Changing play/pause on either should update both
- Audio element should be singleton (only one instance)

---

### 9. **Testing Checklist**

**Header Requirements:**
- [ ] Logo loads from `/logo.png` on all pages
- [ ] Globe icon (language selector) appears on all pages
- [ ] Bell icon (notifications) appears on all pages
- [ ] Bell shows red badge when there are unread notifications
- [ ] Desktop header shows navigation items
- [ ] Mobile header is sticky at top
- [ ] Desktop header is fixed at top

**Radio Player Consistency:**
- [ ] Same RadioPlayer component used on Home and Radio pages
- [ ] Home page shows player ONLY when station is live
- [ ] Radio page always shows player
- [ ] Both instances share the same playing state
- [ ] Playing on Home continues when navigating to Radio page
- [ ] Play/pause button works on both instances
- [ ] Current program info displays correctly on both

**Live Indicator:**
- [ ] Live indicator appears consistently with same styling
- [ ] Pulsing animation works smoothly
- [ ] Appears on Home featured card when live
- [ ] Appears on Radio player when live
- [ ] Uses correct colors (#EF4444 on #FEE2E2 background)

**Navigation:**
- [ ] Bottom tabs visible on mobile (< 1024px)
- [ ] Header nav visible on desktop (>= 1024px)
- [ ] Navigation transforms correctly at 1024px breakpoint
- [ ] Active state highlights correct page
- [ ] All touch targets meet 44px minimum

**General:**
- [ ] All colors match design.json exactly
- [ ] Station name is "Jesus Is Lord Radio" everywhere
- [ ] Animations are smooth (60fps)
- [ ] Works on iOS Safari and Chrome Android
- [ ] Keyboard navigation functions
- [ ] Screen reader announces content properly

---

### 10. **Priority Order**

1. **Create shared Header component** with logo, language selector, and notifications
2. **Create unified RadioPlayer component** with variants for different contexts
3. **Create LiveIndicator component** for consistent badge display
4. **Implement responsive navigation** system (mobile tabs → desktop header items)
5. **Update Home page**:
   - Add Header with all required icons
   - Integrate RadioPlayer (shows only when live)
   - Ensure proper responsive layout
6. **Update Radio Player page**:
   - Add Header with all required icons
   - Use same RadioPlayer component as Home
   - Implement chat interface
7. **Update Teachings page** with Header
8. **Update Events page** with Header
9. **Ensure state synchronization** between Home and Radio player instances
10. **Polish animations and transitions**
11. **Accessibility audit and fixes**

---

## Example Prompts for Gemini CLI

**For header component:**
```
Create a Header component for all pages that includes the logo from /logo.png, a language selector (globe icon), and notifications (bell icon with optional badge). On desktop, it should also show navigation items (Home, Radio, Teachings, Events) in the center. Use the exact specifications from design.json header section.
```

**For unified radio player:**
```
Create a RadioPlayer component that can be used on both the Home page and Radio page. It should accept a "variant" prop to control the layout ("home-featured" or "page-full"). Both instances must share the same audio state and control the same stream. The component should show a live indicator when broadcasting, display current program info, and include play/pause controls. Use the radioPlayer specifications from design.json.
```

**For navigation:**
```
Transform the navigation to be responsive: show bottom tab bar on mobile (< 1024px) with 5 items, and show navigation items in the desktop header (>= 1024px) with 4 items. The "More" tab should only appear on mobile. Use exact styling from design.json navigationBar specifications.
```

**For page updates:**
```
Update the Home page to include the new Header component at the top with logo, globe icon, and bell icon. Add the RadioPlayer component as the featured card, but only render it when the station is live (isLive === true). Use the layout specifications from design.json and the instructions document.
```

**For state management:**
```
Set up a global state management system (using Context or Redux) that tracks: station.isLive, station.currentProgram, audio.isPlaying, notifications.unreadCount, and language.current. Ensure the RadioPlayer component on both Home and Radio pages reads from and updates this shared state.
```

---

## File References

- **Design System:** `design.json`
- **Color Palette:** `design.json → colors`
- **Component Specs:** `design.json → components`
- **Layout Grids:** `design.json → layouts`
- **Animations:** `design.json → animations`

---

## Support

If you encounter any ambiguity:
1. Refer to design.json first
2. Follow mobile-first principles
3. Prioritize consistency over novelty
4. Test on real devices
5. Ask for clarification on specific sections