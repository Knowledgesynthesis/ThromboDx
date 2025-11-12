# ThromboLens

> Master DIC, TTP, ITP, HUS — from smear to systems

An interactive, mobile-first educational platform for learning about thrombotic and hemostatic disorders. Built for medical students, residents, fellows, and attending physicians.

## Features

### 🎯 Core Tools
- **Comparison Table**: Side-by-side comparison of DIC, TTP, ITP, and HUS
- **PLASMIC Score Calculator**: Rapid TTP assessment tool with real-time guidance
- **ISTH DIC Score Calculator**: Validated DIC scoring system
- **Lab Interpreter**: Interactive lab value interpretation (coming soon)
- **Clinical Cases**: Branching case studies with real-world scenarios (coming soon)

### 🎨 User Experience
- **Dark Mode**: Optimized for comfortable learning in any lighting
- **Mobile-First**: Responsive design for learning on the go
- **Offline-Ready**: PWA technology for access anytime, anywhere
- **Accessibility**: WCAG 2.2 AA compliant with keyboard navigation and screen reader support

### 📚 Educational Content
- Comprehensive comparison tables with clinical pearls
- Evidence-based calculator tools with citations
- Structured curriculum from fundamentals to advanced topics
- Safety warnings and clinical disclaimers throughout

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Icons**: Lucide React
- **PWA**: vite-plugin-pwa

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── calculators/     # Calculator implementations
│   ├── cases/           # Case study components
│   └── layout/          # Layout components
├── data/                # Static data and content
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Page components
├── store/               # Zustand state management
├── styles/              # Global styles
└── types/               # TypeScript type definitions
```

## Key Features Implemented

### Calculators
1. **PLASMIC Score** (v2017)
   - 7-point scoring system
   - Risk stratification (low/intermediate/high)
   - Urgent action guidance for high-risk scores
   - Complete with references and clinical pearls

2. **ISTH DIC Score** (v2001)
   - 5-parameter assessment
   - Risk factor validation
   - Management recommendations
   - Serial assessment guidance

### Comparison Table
- Comprehensive side-by-side comparison
- 17 categories including triggers, labs, and management
- Toggle syndrome visibility
- Clinical pearls and key warnings
- "Don't miss" alerts for critical conditions

### Settings & Personalization
- Theme selection (light/dark/system)
- Unit conversion (US/SI)
- Learner level customization
- Learning context selection
- Progress tracking
- Accessibility options

## Safety & Clinical Disclaimer

⚠️ **This application is for educational purposes only.** It should not replace clinical judgment or substitute for professional medical advice. Always consult with appropriate specialists and consider the full clinical context when making treatment decisions.

## Educational Philosophy

ThromboLens is built on evidence-based content with:
- Peer-reviewed literature citations
- Society guideline references
- Version dating for all criteria
- Prominent safety warnings
- Clinical context emphasis

## Roadmap

### Phase 1: Core Foundation ✅
- Comparison table
- PLASMIC calculator
- DIC calculator
- Basic navigation and settings

### Phase 2: Enhanced Tools (In Progress)
- Lab interpreter with probability hints
- Coagulation panel simulator
- MAHA fundamentals module
- Additional calculators

### Phase 3: Interactive Learning (Planned)
- Branching case studies
- Assessment engine
- Spaced repetition system
- Progress analytics

### Phase 4: Advanced Features (Future)
- Offline content sync
- Export to PDF
- Research mode
- Multi-language support

## Contributing

This is an educational project. Suggestions for improvements, additional content, or bug reports are welcome.

## License

Educational use only. All clinical content is referenced to original sources.

## References

Key guidelines and literature:
- PLASMIC Score: Bendapudi PK, et al. Lancet Haematol. 2017
- ISTH DIC: Taylor FB Jr, et al. Thromb Haemost. 2001
- TTP Guidelines: Zheng XL, et al. J Thromb Haemost. 2020
- ITP Guidelines: Neunert C, et al. Blood Adv. 2019

See the References page in the app for complete citations.

## Support

For issues or questions about the application, please file an issue in the repository.

---

Built with ❤️ for hematology education
