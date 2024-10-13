# KeyWick

**KeyWick** is a **Universal Hotkey Manager** designed specifically for **Electron Applications**. It provides a seamless and intuitive way to manage keyboard shortcuts, enabling developers to enhance user interactions and streamline application workflows. Built with **TypeScript** and **React**, KeyWick offers a robust and flexible solution for integrating hotkey functionalities into your Electron projects.

## Table of Contents

- [KeyWick](#keywick)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
    - [Basic Usage](#basic-usage)
    - [Advanced Configuration](#advanced-configuration)
  - [API Reference](#api-reference)
    - [HotkeyManager](#hotkeymanager)
    - [HotkeyProfile](#hotkeyprofile)
    - [Hotkey](#hotkey)
  - [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Building the Package](#building-the-package)
    - [Running Tests](#running-tests)
    - [Linting and Formatting](#linting-and-formatting)
  - [Contributing](#contributing)
  - [Roadmap](#roadmap)
  - [License](#license)
  - [Author](#author)
  - [Acknowledgements](#acknowledgements)

## Features

- **Global and Local Hotkeys**: Register hotkeys that work globally across the system or locally within your application.
- **Conflict Resolution**: Automatically detects and resolves conflicts when registering hotkeys to ensure smooth functionality.
- **Profile Management**: Create, switch, rename, and delete hotkey profiles to manage different sets of shortcuts tailored to specific workflows or user preferences.
- **TypeScript Support**: Fully written in TypeScript, providing strong typing and improved developer experience.
- **React Components**: Comes with pre-built React components for managing and editing hotkeys, making integration straightforward for React-based Electron applications.
- **Extensible Logging**: Integrated logging system to monitor hotkey registrations and handle errors effectively.
- **Testing Suite**: Comprehensive tests using Jest and React Testing Library to ensure reliability and stability.
- **ESLint and Prettier Integration**: Maintain code quality and consistency with built-in linting and formatting tools.

*Note: Replace the above link with an actual GIF or video demonstrating KeyWick's functionalities.*

## Installation

To install KeyWick, use **npm** or **yarn**:

```bash
# Using npm
npm install keywick

# Using yarn
yarn add keywick
```

**Peer Dependencies:**

Ensure that your project has the following peer dependencies installed:

- `react` (version ^17.0.0 or ^18.0.0)
- `react-dom` (version ^17.0.0 or ^18.0.0)

You can install them using:

```bash
# Using npm
npm install react react-dom

# Using yarn
yarn add react react-dom
```

## Getting Started

### Basic Usage

Integrate KeyWick into your Electron application with React components to manage hotkeys efficiently.

1. **Import KeyWick Components and Classes:**

   ```typescript
   import React, { useEffect, useState } from 'react';
   import ReactDOM from 'react-dom';
   import { HotkeyManager, Hotkey, HotkeyProfile } from 'keywick';
   import HotkeyList from 'keywick/HotkeyList';
   import HotkeyEditor from 'keywick/HotkeyEditor';
   import HotkeyProfileManager from 'keywick/HotkeyProfileManager';
   import { validateShortcut } from 'keywick/utils';
   import './styles.css';
   ```

2. **Initialize HotkeyManager:**

   ```typescript
   const hotkeyManager = new HotkeyManager();
   ```

3. **Create the Main App Component:**

   ```tsx
   const App: React.FC = () => {
     const [hotkeys, setHotkeys] = useState<Hotkey[]>([]);
     const [editingHotkey, setEditingHotkey] = useState<Hotkey | null>(null);
     const [error, setError] = useState<string | null>(null);

     const refreshHotkeys = () => {
       setHotkeys(hotkeyManager.getAllHotkeys());
     };

     useEffect(() => {
       refreshHotkeys();
     }, []);

     const handleAddHotkey = () => {
       setEditingHotkey({ shortcut: '', callback: () => {}, global: true });
     };

     const handleEditHotkey = (hotkey: Hotkey) => {
       setEditingHotkey(hotkey);
     };

     const handleSaveHotkey = (hotkey: Hotkey) => {
       if (!hotkey.shortcut) {
         setError('Shortcut cannot be empty.');
         return;
       }

       if (!validateShortcut(hotkey.shortcut)) {
         setError('Invalid shortcut format.');
         return;
       }

       const success = hotkeyManager.register(hotkey.shortcut, hotkey.callback, hotkey.global);
       if (success) {
         setError(null);
         refreshHotkeys();
         setEditingHotkey(null);
       } else {
         setError(`Failed to register shortcut: ${hotkey.shortcut}`);
       }
     };

     const handleDeleteHotkey = (shortcut: string) => {
       hotkeyManager.unregister(shortcut);
       refreshHotkeys();
     };

     const handleCancel = () => {
       setEditingHotkey(null);
       setError(null);
     };

     const handleProfileSwitch = () => {
       refreshHotkeys();
     };

     return (
       <div className="container">
         <h1>KeyWick Hotkey Manager</h1>
         {error && <div className="error">{error}</div>}
         <HotkeyProfileManager hotkeyManager={hotkeyManager} onProfileSwitch={handleProfileSwitch} />
         <HotkeyList hotkeys={hotkeys} onEdit={handleEditHotkey} onDelete={handleDeleteHotkey} />
         <button onClick={handleAddHotkey} className="add-button">
           Add Hotkey
         </button>
         {editingHotkey && (
           <HotkeyEditor
             existingHotkey={editingHotkey.shortcut ? editingHotkey : undefined}
             onSave={handleSaveHotkey}
             onCancel={handleCancel}
           />
         )}
       </div>
     );
   };

   ReactDOM.render(<App />, document.getElementById('root'));
   ```

4. **Run the Application:**

   Ensure that your Electron main process is set up to load the React application and that KeyWick is properly integrated.

### Advanced Configuration

KeyWick offers advanced functionalities such as profile management, conflict resolution, and custom logging.

1. **Profile Management:**

   Manage different sets of hotkeys through profiles, allowing users to switch between predefined or custom configurations.

   ```tsx
   <HotkeyProfileManager hotkeyManager={hotkeyManager} onProfileSwitch={handleProfileSwitch} />
   ```

2. **Conflict Resolution:**

   Automatically handles conflicts by unregistering existing hotkeys before registering new ones.

   ```typescript
   const resolver = new ConflictResolver(hotkeyManager);
   resolver.resolve('CommandOrControl+X');
   ```

3. **Custom Logging:**

   Utilize the built-in Logger class to monitor hotkey registrations and handle errors.

   ```typescript
   const logger = new Logger();
   logger.info('Hotkey registered successfully.');
   logger.warn('Potential conflict detected.');
   logger.error('Failed to register hotkey.');
   ```

## API Reference

### HotkeyManager

Manages the registration, unregistration, and overall management of hotkeys.

#### Methods

- **register(shortcut: string, callback: () => void, global?: boolean): boolean**

  Registers a new hotkey.

  - `shortcut`: The key combination (e.g., 'CommandOrControl+X').
  - `callback`: The function to execute when the hotkey is activated.
  - `global`: Whether the hotkey is global. Defaults to `true`.

  **Returns:** `true` if registration is successful, `false` otherwise.

- **unregister(shortcut: string): void**

  Unregisters an existing hotkey.

  - `shortcut`: The key combination to unregister.

- **unregisterAll(): void**

  Unregisters all registered hotkeys.

- **getAllHotkeys(): Hotkey[]**

  Retrieves all registered hotkeys.

  **Returns:** An array of `Hotkey` objects.

- **isRegistered(shortcut: string): boolean**

  Checks if a hotkey is already registered.

  - `shortcut`: The key combination to check.

  **Returns:** `true` if registered, `false` otherwise.

- **createProfile(profileName: string): boolean**

  Creates a new profile with the current hotkeys.

  - `profileName`: Name of the new profile.

  **Returns:** `true` if creation is successful, `false` otherwise.

- **switchProfile(profileName: string): boolean**

  Switches to a specified profile.

  - `profileName`: Name of the profile to switch to.

  **Returns:** `true` if successful, `false` otherwise.

- **deleteProfile(profileName: string): boolean**

  Deletes a specified profile.

  - `profileName`: Name of the profile to delete.

  **Returns:** `true` if deletion is successful, `false` otherwise.

- **renameProfile(oldName: string, newName: string): boolean**

  Renames an existing profile.

  - `oldName`: Current name of the profile.
  - `newName`: New name for the profile.

  **Returns:** `true` if renaming is successful, `false` otherwise.

- **getAllProfiles(): HotkeyProfile[]**

  Retrieves all profiles.

  **Returns:** An array of `HotkeyProfile` objects.

### HotkeyProfile

Represents a set of hotkeys grouped under a specific profile.

#### Properties

- **name: string**

  The name of the profile.

- **hotkeys: Hotkey[]**

  An array of `Hotkey` objects associated with the profile.

### Hotkey

Defines the structure of a hotkey.

#### Properties

- **shortcut: string**

  The key combination (e.g., 'CommandOrControl+X').

- **callback: () => void**

  The function to execute when the hotkey is activated.

- **global: boolean**

  Indicates whether the hotkey is global (`true`) or local (`false`).

## Development

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 14.x or 16.x)
- **npm** (version 7.x or 8.x) or **Yarn** (version 1.22.x or 3.x)

### Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/wickstudio/keywick.git
   cd keywick
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install --legacy-peer-deps
   ```

   Using Yarn:

   ```bash
   yarn install
   ```

### Building the Package

To build the production bundle:

```bash
npm run build
```

This command executes the `webpack.prod.js` configuration, generating the optimized bundle in the `dist` directory.

### Running Tests

KeyWick uses Jest and React Testing Library for testing.

```bash
npm run test
```

This command runs all test suites, ensuring that the core functionalities work as expected.

### Linting and Formatting

Maintain code quality with ESLint and Prettier.

- **Linting:**

  ```bash
  npm run lint
  ```

- **Formatting:**

  ```bash
  npm run format
  ```

These commands help in identifying and fixing code style issues, ensuring consistency across the codebase.

## Contributing

Contributions are welcome! Follow the guidelines below to contribute to KeyWick.

### How to Contribute

1. **Fork the Repository:**

   Click the "Fork" button on the [GitHub repository](https://github.com/wickstudio/keywick) to create your own copy.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/<your-username>/keywick.git
   cd keywick
   ```

3. **Create a New Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes:**

   Implement your feature or bug fix, ensuring adherence to the project's coding standards.

5. **Commit Your Changes:**

   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   ```

6. **Push to Your Fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request:**

   Navigate to the original repository and open a pull request from your fork, describing your changes in detail.

### Code of Conduct

By participating, you agree to abide by our [Code of Conduct](https://github.com/wickstudio/keywick/blob/main/CODE_OF_CONDUCT.md). Please read it to understand the expectations for behavior within the community.

## Roadmap

KeyWick is continuously evolving. Here's what's planned for future releases:

- **Enhanced UI Components:**
  - More customizable and themeable React components.
  - Drag-and-drop functionality for hotkey ordering.

- **Persistence:**
  - Save profiles and hotkey configurations to local storage or external files.
  - Import and export profiles for easy sharing.

- **Internationalization (i18n):**
  - Support for multiple languages to cater to a global audience.

- **Advanced Conflict Resolution:**
  - Suggestions for alternative shortcuts when conflicts arise.

- **Integration with Other Libraries:**
  - Plugins or extensions for popular Electron frameworks and libraries.

If you have ideas or suggestions, feel free to open an issue or contribute directly!

## License

This project is licensed under the [MIT License](https://github.com/wickstudio/keywick/blob/main/LICENSE).

## Author

**wickstudio**

- [GitHub](https://github.com/wickstudio)
- [Instagram](https://www.instagram.com/mik__subhi/)
- [Discord](https://discord.gg/wicks)

Feel free to reach out for collaborations, questions, or feedback!

## Acknowledgements

- **Electron:** For providing the foundation for building cross-platform desktop applications.
- **React:** For offering a powerful and flexible library for building user interfaces.
- **TypeScript:** For enabling type-safe JavaScript development.
- **Webpack:** For bundling the project efficiently.
- **Jest & React Testing Library:** For facilitating robust testing practices.
- **ESLint & Prettier:** For maintaining code quality and consistency.