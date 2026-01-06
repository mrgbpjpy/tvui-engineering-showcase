# TV UI Engineering Showcase

A production-style TV UI engineering project demonstrating core interaction
patterns used in large-scale, 10-foot streaming applications.

This repository focuses on deterministic focus management, remote input handling,
and interaction architecture for TV platforms, built with scalability and
maintainability in mind.

---

## Purpose

This project is intentionally **not** a visual clone of any streaming product.

Instead, it demonstrates **engineering decisions** and **interaction patterns**
that matter in real-world TV applications, including:

- Predictable focus movement
- Remote-first input handling
- Explicit interaction loops
- Clear separation of UI, state, and navigation logic
- Patterns that scale across screens and features

---

## Core Engineering Concepts

### Deterministic Focus Management
Explicit, predictable focus behavior designed for directional input
(Up / Down / Left / Right) rather than mouse or touch.

### Remote Input Handling
Keyboard and remote keys mapped to intent-based actions with a complete
interaction loop (Navigate → Select → Act → Feedback).

### Interaction Architecture
Clear separation between presentation, navigation, and state management
to ensure scalability and maintainability.

### 10-Foot UI Constraints
Designed for large displays with readable typography, visible focus states,
and intentional motion.

---

## Tech Stack

- React
- TypeScript
- Vite
- CSS (explicit transitions)

---

## Project Structure

src/
  components/      Reusable UI components  
  navigation/      Focus and navigation logic  
  input/           Remote / keyboard input handling  
  state/           Interaction and navigation state  
  screens/         Screen-level composition  

---

## How to Run

npm install  
npm run dev  

Use keyboard arrow keys to simulate remote navigation.

---

## Notes for Reviewers

This repository emphasizes interaction architecture and focus predictability.
Key files are kept intentionally readable to highlight decision-making and tradeoffs.

---

## Author

Erick Esquilin  
Senior Software Engineer  
TV UI Engineering & Interaction Systems
