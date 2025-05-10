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
![Simulator Screenshot - iPhone 16 Pro - 2025-05-10 at 14 42 02](https://github.com/user-attachments/assets/2c818126-8698-4040-82b2-3c89a3dd04fd)
*View all your notes organized by categories*

### Add Note Screen
![Simulator Screenshot - iPhone 16 Pro - 2025-05-10 at 14 42 05](https://github.com/user-attachments/assets/67953719-07df-4eff-849a-de03f16f813b)
*Create new notes with category selection*

### Summary Screen
![Simulator Screenshot - iPhone 16 Pro - 2025-05-10 at 14 42 08](https://github.com/user-attachments/assets/2ecf9b3d-0d9b-4fcd-b7e5-5041506241ff)
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
