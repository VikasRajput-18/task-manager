
# Task Management Application

This project is a **Task Management Application** designed to help users manage tasks efficiently. It includes features for creating, updating, deleting, and marking tasks as complete, with a focus on usability and performance.

## Features

- **Create Tasks:** Add new tasks with title, description, priority, and other details.
- **Update Tasks:** Edit task information as needed.
- **Delete Tasks:** Remove tasks from the list.
- **Toggle Completion:** Mark tasks as complete or incomplete.
- **Priority Management:** Assign and view task priority levels.

## Technologies Used

- **Frontend:**
  - React: For building the user interface.
  - React Router: For client-side routing.
  - @testing-library/react: For testing React components.
- **Testing Framework:**
  - Vitest: For unit and integration testing.
  - @testing-library/jest-dom: For custom matchers to test the DOM.
- **Environment:**
  - jsdom: For simulating a browser environment in tests.

## Installation

To set up and run this project locally:

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm start
   ```

4. **Run Tests:**
   ```bash
   npm test
   ```

## File Structure

```
src/
├── components/
│   ├── TaskCard.tsx       # Task card component
│   └── ...                # Other reusable components
├── __tests__/
│   ├── TaskCard.test.tsx  # Unit tests for TaskCard component
├── setupTests.ts          # Global setup for tests
├── App.tsx                # Main application file
└── ...                    # Additional files and configurations
```

## Testing

This project includes unit tests for React components using **Vitest** and **@testing-library/react**:

- **Unit Tests:** Validate individual components.
- **Integration Tests:** Ensure components interact correctly.

### Running Tests
To run tests, execute:
```bash
npm test
```

## Contributions

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
