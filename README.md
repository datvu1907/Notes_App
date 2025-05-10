# Notes App

A modern note-taking application built with React Native and Expo, featuring a beautiful UI and intuitive user experience.

## Features

- 📝 Create and manage notes with categories
- 🏷️ Organize notes into categories (Work and Study, Life, Health and Well-being)
- 🎨 Beautiful gradient UI with smooth animations
- 📱 Responsive design for both iOS and Android
- 🔄 Real-time updates with MobX state management
- 🌐 Internationalization support

## Screenshots

### Home Screen
![Simulator Screenshot - iPhone 16 Pro - 2025-05-10 at 14 42 02](https://github.com/user-attachments/assets/3c6ffe16-4cf1-4463-8eb5-b93e09f0bd84)
*View all your notes organized by categories*

### Add Note Screen
![Simulator Screenshot - iPhone 16 Pro - 2025-05-10 at 14 42 05](https://github.com/user-attachments/assets/511bfa57-b680-473d-87a1-0bcf531699e0)
*Create new notes with category selection*

### Summary Screen
![Simulator Screenshot - iPhone 16 Pro - 2025-05-10 at 14 42 08](https://github.com/user-attachments/assets/66aac4ee-c0b1-4b74-b7c8-694e0e732a8f)

*Get an overview of your notes by category*

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd notes-app
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn start
```

4. Run on your preferred platform:
```bash
# For iOS
yarn ios

# For Android
yarn android
```

## Project Structure

```
app/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── models/         # MobX store models
├── theme/          # Theme configuration
├── i18n/           # Internationalization
└── assets/         # Images and icons
```

## Development

### Building for Production

```bash
# Build for iOS
yarn build:ios

# Build for Android
yarn build:android
```

### Running Tests

```bash
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [React Native](https://reactnative.dev/)
- UI components powered by [Expo](https://expo.dev/)
- State management with [MobX](https://mobx.js.org/)
