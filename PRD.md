# PRD - Quiz Simulator (Based on Current Implementation)

## Document Boundary

This document is the source of truth for product scope, functional requirements, and acceptance criteria.

- Architecture, API internals, and deployment details are owned by [ARCH.md](ARCH.md).
- UI visual language and interaction style are owned by [STYLE.md](STYLE.md).
- Documentation ownership map is defined in [DOCUMENTATION.md](DOCUMENTATION.md).

## 1. Product Summary

Quiz Simulator is a ServiceNow Fluent application for test preparation using question collections. The application allows users to:

- Browse available collections
- Save collections per user
- Create quizzes from a saved collection
- Run quizzes with auto-saved progress
- Submit a quiz and receive results
- Review quiz history and completed attempts
- Publish new collections through a JSON payload

The UI is implemented as a React UiPage and the backend is implemented as a custom ServiceNow REST API.

## 2. Business Goal

Enable continuous practice of technical questions through a per-user incremental learning loop:

- Prioritize never-seen questions
- Reinforce failed questions (last attempt and historical failures)
- Track progress per collection using correctness and coverage

## 3. Functional Scope (In Scope)

### 3.1 Access and Authorization

- Access to the application requires an authenticated user.
- Most endpoints require the x_2119443_quiz_sim.user role.
- The UI validates access on startup and shows the Error Page if the user lacks permission or if access loading fails.

### 3.2 Main Navigation

The internal UI navigation includes 3 entries:

- Home
- Collections
- Publish collection

### 3.3 Home (User Saved Collections)

- Lists only collections saved by the authenticated user.
- Allows opening a saved collection.
- Allows removing a saved collection.
- Removing a collection also deletes legacy user quizzes for that collection in the backend.

### 3.4 Collections (Global Catalog)

- Lists all available collections.
- Each row allows:
    - Open directly if already saved
    - Save and open if not yet saved

### 3.5 Open Collection (Collection Functional Detail)

- Shows question statistics by group:
    - Never seen
    - Correct
    - Ever failed
    - Last attempt failed
    - All
- Each stat count is clickable and opens a filtered question list.
- Allows creating a new quiz through a configuration modal.
- Shows a table of previous quizzes (status, result, date) with Continue/Review actions by state.

### 3.6 Collection Questions (Filtered List)

- Renders questions by selected filter:
    - all
    - never_seen
    - correct
    - ever_failed
    - last_attempt_failed
- Shows answers for each question.
- If backend metadata exists, shows an info tooltip with:
    - rationale
    - docs (documentation link)

### 3.7 Create Quiz

- Created from a saved collection.
- Allowed parameters:
    - question_count: 10, 20, 40
    - mode: never_seen, random, last_attempt_failed, ever_failed
- The backend randomly selects questions from the mode subset.
- If no questions are available for that mode, the API returns an error.

### 3.8 Quiz Run

- Supports single-choice and multiple-choice questions.
- Loads prior answers if the quiz is already in progress.
- Saves progress automatically (700 ms debounce after changes) via API.
- Allows quiz submit only when status is in_progress.
- For completed quizzes:
    - Editing is locked
    - Correct answers and selected wrong answers are highlighted

### 3.9 Quiz Submit and Result Calculation

- Submit requires answers for all quiz questions.
- Per-question grading rule:
    - Correct only when selected answers exactly match the set of correct answers.
- score_percent is calculated and rounded.
- quiz_question status is updated (correct/failed).
- quiz is marked as completed and result is stored.
- user_collection progress lists are updated:
    - Processed questions are removed from never_seen
    - Correct ones are added to correct and removed from last_attempt_failed
    - Failed ones are added to ever_failed and last_attempt_failed

### 3.10 Publish Collection

- Page with a JSON textarea for publishing content.
- Requires valid JSON on the frontend.
- Backend creates collection, questions, and answers in one logical operation.
- Backend validations:
    - collection.name is required
    - at least one question is required
    - each question must include text and at least one answer
    - each question must include at least one correct answer
    - is_correct must be provided as a string when explicitly set
- If creation fails at any step, the backend performs manual rollback of created records.

## 4. Out of Scope (Current)

- Editing collections from the React UI
- Editing questions/answers from the React UI
- Deleting base collections from the React UI
- Advanced analytics, aggregated reporting, or dashboards
- Quiz timer, user ranking, gamification
- Offline support

## 5. User Types and Permissions

- Authenticated user with x_2119443_quiz_sim.user role:
    - Full access to simulator UI and API
- Authenticated user without role:
    - Can call the roles endpoint
    - Cannot use simulator functionality
    - UI ends on Error Page due to missing access

## 6. Main Flows

### 6.1 Save and Open Collection

1. User enters Collections.
2. If collection is not saved, user triggers Save.
3. Backend creates/updates user_collection for that user.
4. UI opens Open Collection.

### 6.2 Create and Run Quiz

1. User opens a saved collection.
2. User selects mode and count in modal.
3. Quiz is created with in_progress status.
4. User answers questions.
5. Changes are auto-saved.
6. User submits quiz.
7. Backend grades, closes quiz, and updates progress.

### 6.3 Review Completed Quiz

1. User opens a previous quiz with completed status.
2. UI displays historical selections.
3. UI highlights correct and incorrect outcomes.
4. Responses cannot be edited.

### 6.4 Publish Collection

1. User navigates to Publish collection.
2. User pastes JSON payload.
3. Frontend validates JSON format.
4. Backend validates business contract.
5. If valid, backend creates records and returns counts.

## 7. Detailed Functional Requirements

### RF-01 Access Control

- System must validate user roles at application startup.
- If role is missing or access loading fails, Error Page must be shown.

### RF-02 Collection Listing

- System must list collections with per-user is_saved indicator.
- Must support saved-only filter (saved_only=true in API).

### RF-03 Per-User Collection Persistence

- Saving a collection must maintain a per-user, per-collection relation.
- On first save, never_seen_questions must be initialized with all collection questions.

### RF-04 Saved Collection Removal

- Must delete user_collection relation for the target user and collection.
- Must delete legacy quizzes associated with user+collection.

### RF-05 Open Collection View

- Must return statistics, question groups, full question list with answers, and user quiz history.

### RF-06 Quiz Creation

- Must allow only question_count in {10,20,40}.
- Must allow only mode in {never_seen,random,last_attempt_failed,ever_failed}.
- Must create quiz and quiz_question rows with initial unanswered status.

### RF-07 Progress Save

- Must accept answers as an array of objects with question_id and selected_answer_ids.
- Must validate question membership in quiz and answer membership in question.
- Must reject duplicate question_id entries.

### RF-08 Quiz Submit

- Must require answers for all quiz questions.
- Must compute result using exact answer-set matching.
- Must persist score_percent and completed status.

### RF-09 Content Publish

- Must create collection, questions, and answers from payload.
- Must ensure consistency with rollback on failure.

## 8. Observable Non-Functional Requirements

### NFR-01 Security

- API is protected by authentication and endpoint ACLs.
- Frontend sends X-UserToken in all calls.

### NFR-02 Data Integrity

- Strict server-side payload validation.
- User ownership checks for quizzes and saved collections.

### NFR-03 Usability

- Simple single-level navigation.
- Loading and disabled states for critical actions (save/remove/create/submit).

### NFR-04 Fault Tolerance

- In page-level async errors, UI redirects to Error Page.

## 9. Technical References

To avoid duplication, the following implementation details are maintained in [arch.md](arch.md):

- Data model and entity relationships
- API route structure and contract conventions
- Security architecture and ownership checks
- Build and deployment architecture
- Technical constraints

## 10. Current Functional Risks

- If a saved collection is missing or inconsistent, multiple operations return 404.
- Publish relies on manual JSON payload input, which is error-prone.
- Frontend error strategy is global (Error Page), with limited per-screen recovery granularity.

## 11. Acceptance Criteria (Current State)

### AC-01 Access

- Given a user without role, when opening the app, then Error Page is shown.

### AC-02 Collection Save

- Given a non-saved collection, when user saves it, then it is marked as saved and can be opened.

### AC-03 Saved Collection Removal

- Given a collection in Home, when user removes it, then it disappears from saved list.

### AC-04 Quiz Creation

- Given a saved collection, when user creates a quiz with valid parameters, then the created quiz opens.

### AC-05 Auto Save

- Given an in-progress quiz, when user changes answers, then the system persists progress automatically.

### AC-06 Full Submit

- Given an in-progress quiz, when user submits answers for all questions, then quiz moves to completed with calculated score.

### AC-07 Completed Quiz Review

- Given a completed quiz, when user opens it, then user can review it without editing and with correctness highlighting.

### AC-08 Publish

- Given a valid JSON payload, when user publishes, then collection, questions, and answers are created.
