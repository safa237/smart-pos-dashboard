# Smart POS Dashboard

## Project Architecture

The project follows a feature-based architecture.

Each feature is self-contained and includes:

- Pages
- Components
- Models
- Services (Data Access)

Shared components and services are placed under the `shared` folder for reusability.

---

## Folder Structure

```text
src/
│
├── core/
│
├── shared/
│   ├── components/
│   ├── services/
│   └── models/
│
├── features/
│   ├── orders/
│   ├── products/
│   ├── kitchen/
│   └── ai-assistant/
│
├── layouts/
│
└── assets/
```

---

## Design Decisions

- Standalone Components were used.
- Feature-based architecture improves scalability.
- Shared UI components reduce duplicated code.
- Services handle business logic while components focus on presentation.
- Mock API (`json-server`) is used to simulate backend behavior.

---

## State Management Approach

State is managed using **RxJS BehaviorSubject**.

Each feature exposes observable streams.

This keeps the UI reactive without introducing external state management libraries.

---

## Performance Optimizations

- `ChangeDetectionStrategy.OnPush`
- Debounced search input
- `trackBy` in `ngFor`
- Shared reusable components
- Optimistic UI updates
- Skeleton loading
- Async data streams

---

## Assumptions

- Backend is simulated using `json-server`.
- AI recommendations are simulated.
- WebSocket updates are simulated.

---

## Known Limitations

- No authentication.
- No real notification service.

---

## Future Improvements

- Integrate with a real backend.
- Use IndexedDB for the offline queue.
- Add authentication & roles.
- Add unit and integration tests.

---

## Installation

Install dependencies:

```bash
npm install
```

Start the mock backend:

```bash
npm run mock-api
```

Run the Angular application:

```bash
ng serve
```

---

## Mock Backend

- Mock dataset: `db.json`
- Start server: `npm run mock-api`
- Postman collection: `postman/Smart POS Dashboard.postman_collection.json`