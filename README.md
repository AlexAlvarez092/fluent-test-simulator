# Test Simulator

This is a ServiceNow Fluent application designed as a comprehensive test and exam preparation platform. The system manages collections of questions organized by topic (e.g., ITIL Fundamentals, certification exam prep) and enables users to create customized tests, track their performance, and manage their learning progress.

## Core Features

### Collections Management

- Users can browse and explore a repository of question collections organized by topic/certification
- Users can save collections to their personal dashboard for easy access
- Users can remove collections from their personal space
- Administrators can create, modify, and delete collections

### Personal Dashboard

- Displays all collections saved by the user
- Shows test statistics and performance metrics (pass/fail rates, score progression, etc.)
- Provides quick access to collections for test generation
- Allows management of saved collections (removal, access)

### Test Creation & Customization

- Users can generate tests from a selected collection by specifying the number of questions
- Test question selection modes:
    - **Unseen questions**: Questions the user hasn't answered yet
    - **Failed questions**: Questions the user answered incorrectly in previous tests
    - **Random selection**: Random mix from all questions in the collection
- Users can exit/complete tests at any time without answering all questions
- Test results are saved to user statistics

### Test Taking Experience

- Users can view correct answer(s) after completing each question
- Users can access theoretical explanation for each question
- Users can view external documentation links for deeper learning
- Users can flag/report errors in questions
- Users can save questions for later review
- Test progress is tracked and can be resumed or abandoned

### User Roles & Permissions

**Standard Users:**

- Browse and search collections
- Save/remove collections from personal dashboard
- Create and take tests with flexible question modes
- View performance statistics
- Review answers and explanations
- Report question errors
- Save questions for review

**Administrators:**

- Full CRUD operations on collections
- Create, modify, and delete questions and answers
- Manage question metadata (topic, difficulty, correct answers, explanations, documentation links)
- View and manage user statistics
- Handle error reports on questions
- Configure collection settings
