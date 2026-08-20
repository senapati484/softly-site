# Softly Mobile Application — System Design & Architecture Specification

## 1. Executive Overview & Purpose
**Softly** is a cross-platform digital wellness mobile application designed around warm desaturated pastels, tactile typography, and fluid mindful pacing. Unlike addictive feeds with red notification badges, Softly provides an unhurried digital sanctuary that encourages intentional screen time, somatic breath regulation, ambient sound immersion, and daily micro-reflections.

---

## 2. Core Architecture & Tech Stack

- **Framework**: React Native with [Expo SDK 52+](https://expo.dev)
- **Routing**: [Expo Router v4](https://docs.expo.dev/router/introduction/) (File-based tab routing)
- **Styling**: [NativeWind v4 (Tailwind CSS)](https://www.nativewind.dev/) for 1:1 parity with web design tokens
- **Animations & Motion**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) + [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- **Audio Engine**: `expo-av` for seamless ambient soundscape loops
- **Haptic Engine**: `expo-haptics` for tactile breathing pacing
- **State & Local Persistence**: [Zustand](https://github.com/pmndrs/zustand) with `AsyncStorage` (Offline-first, 100% private)
- **Icons**: `lucide-react-native`

---

## 3. Project Directory Structure (`mobile/`)

```
mobile/
├── app/
│   ├── _layout.tsx              # Root layout: Theme Provider, Fonts, GestureHandler
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Floating Pill Tab Bar with Reanimated active indicator
│   │   ├── index.tsx            # [Tab 1] "Quiet Room" (Interactive Breathe companion & Unplug Window)
│   │   ├── reflections.tsx      # [Tab 2] "Reflections" (Morning Pebble notes & Ambient audio)
│   │   └── sanctuary.tsx        # [Tab 3] "Night Sanctuary" (Dusk wind-down & Peace stats)
│   ├── modal/
│   │   └── new-entry.tsx        # Slide-up modal for composing daily slow notes
├── components/
│   ├── ui/
│   │   ├── Card.tsx             # Tactile card with subtle border & shadow
│   │   ├── PillBadge.tsx        # Soft pill tag component
│   │   └── GrainTexture.tsx     # Subtle tactile grain overlay
│   ├── breathe/
│   │   ├── BreathingCircle.tsx  # Multi-ring pulsing Reanimated component
│   │   ├── BreathTimer.tsx      # Phase countdown (Inhale / Hold / Exhale)
│   │   └── PatternSelector.tsx  # 4-7-8 Relax / Box Breath / Gentle Flow selector
│   ├── sounds/
│   │   ├── SoundCard.tsx        # Ambient sound card with live playing equalizer wave
│   │   └── VolumeSlider.tsx     # Tactile ambient sound level slider
│   └── sanctuary/
│       ├── PeaceDashboard.tsx   # Hours preserved from feeds & mindful pauses metrics
│       └── DuskShiftCard.tsx    # Sunset mode amber light preview
├── hooks/
│   ├── useBreatheEngine.ts      # Precise breathing phase timer & haptic triggers
│   └── useSoundscapes.ts        # Background audio playback & looping
├── store/
│   └── useSoftlyStore.ts        # Zustand persistent store with AsyncStorage
├── theme/
│   ├── colors.ts                # Palette tokens (Sage, Coral, Lavender, Cream, Dark Stone)
│   └── typography.ts            # Font configurations
├── app.json
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

---

## 4. Design System & Palette Tokens

| Token Name | Hex Code | Usage Context |
| :--- | :--- | :--- |
| **Cream (Primary Canvas)** | `#FDFCF8` | Default background for the Quiet Room and overall canvas |
| **Sage (Mindful Morning)** | `#E8EFE8` | Reflections tab, daily notes, morning pebble cards |
| **Coral (Warm Life)** | `#FFB7B2` | Pulsing breathe rings, primary CTAs, active highlights |
| **Lavender (Dusk Transition)** | `#EFEDF4` | Night Sanctuary, blue-light wind-down, peace metrics |
| **Dark Stone (Ink)** | `#292524` | Primary high-contrast text and dark floating pill shells |
| **Muted Stone** | `#78716C` | Body copy, secondary descriptions, timestamps |
| **Border Stone** | `#E7E5E4` | Tactile card borders and dividers |

---

## 5. Screen & Feature Specifications

### 5.1 Tab 1: Quiet Room (`app/(tabs)/index.tsx`)
- **Header**: Time-aware greeting (*"Good morning/afternoon/evening, Elena"*) + *Quiet Room* active status.
- **Breathing Engine (`BreathingCircle.tsx`)**:
  - Animated multi-layer concentric circles pulsing in Coral (`#FFB7B2`).
  - Supports 3 scientifically validated breathing patterns:
    1. **4-7-8 Relaxing Breath**: Inhale (4s) → Hold (7s) → Exhale (8s).
    2. **Box Breathing**: Inhale (4s) → Hold (4s) → Exhale (4s) → Hold (4s).
    3. **Gentle Flow**: Inhale (3s) → Exhale (3s).
  - Micro-haptic ticks on phase shifts via `expo-haptics`.
- **Unplug Window Status**: Active countdown timer for digital detox sessions.

### 5.2 Tab 2: Morning Pebble & Reflections (`app/(tabs)/reflections.tsx`)
- **Daily Reflection Card**: Daily curated mindful affirmation with bookmarking/favorite toggle.
- **Personal Slow Notes**: Feed of locally stored journal entries with mood tags.
- **Ambient Soundscapes Player**:
  - Sound selections: *Rain on Cedar*, *Forest Wind*, *Old Library*.
  - Smooth audio loop playback with play/pause soft chimes.
- **Mindful Streak Badge**: Pebble icon streak tracker (*"14 days of mindful mornings"*).

### 5.3 Tab 3: Night Sanctuary (`app/(tabs)/sanctuary.tsx`)
- **Blue-Light Wind Down Card**: Interactive slider demonstrating amber screen warmth shift for bedtime.
- **"This Week's Peace" Dashboard**:
  - *4.2h* saved from mindless doomscrolling.
  - Total mindful breathing minutes completed.
  - Zero late-night feeds logged.
- **Sleep Guard**: Configurable evening notification silence window.

---

## 6. Data Model & Persistence Schema

```typescript
export interface ReflectionEntry {
  id: string;
  createdAt: string; // ISO String
  quote: string;
  userNotes?: string;
  moodTag?: 'Peaceful' | 'Grounded' | 'Reflective' | 'Restful';
  isFavorite: boolean;
}

export interface PeaceStats {
  totalBreathingMinutes: number;
  sessionsCompleted: number;
  estimatedSavedHours: number;
}

export interface SoftlyState {
  reflections: ReflectionEntry[];
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string;
  };
  peaceStats: PeaceStats;
  activeSound: string | null;
  isPlayingSound: boolean;
  breathePattern: '4-7-8' | 'box' | 'gentle';
  hapticsEnabled: boolean;

  addReflection: (notes: string, moodTag?: ReflectionEntry['moodTag']) => void;
  toggleFavoriteReflection: (id: string) => void;
  recordSession: (minutes: number) => void;
  toggleSound: (soundName: string) => void;
  setBreathePattern: (pattern: '4-7-8' | 'box' | 'gentle') => void;
  setHapticsEnabled: (enabled: boolean) => void;
}
```

---

## 7. Decision Log

| # | Decision | Alternatives Considered | Rationale |
| :--- | :--- | :--- | :--- |
| 1 | **Expo + Expo Router** | Bare React Native CLI | File-based routing, native tab bars, instant multiplatform deployment (iOS/Android) |
| 2 | **Decoupled `mobile/` Folder** | Monorepo (Nx / Turborepo) | Keeps the marketing website lightweight and decoupled; zero monorepo configuration friction |
| 3 | **NativeWind (Tailwind CSS v4)** | StyleSheet / React Native Paper | 100% design token parity with web landing page; rapid styling |
| 4 | **Offline-First (Zustand + AsyncStorage)** | Cloud DB (Firebase/Supabase) | 100% private, instantaneous response times, zero network dependency, frictionless UX |
| 5 | **Sensory Sync (Haptics + Audio)** | Visual-only animations | Somatic wellness apps require tactile touch and ambient sound for real relaxation |
