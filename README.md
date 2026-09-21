# Patient Management — FastAPI + React

Full-stack patient records app: **FastAPI** backend for validation, BMI calculation and CRUD + **React + Vite + Tailwind + React Router** frontend with routed list/detail views.

## Features

**Backend (`main.py`)**
- CRUD: `POST /create`, `GET /view`, `GET /patients/{id}`, `PUT /edit/{id}`, `DELETE /delete/{id}`
- Pydantic validation: `age 1–120`, `height/weight > 0`, `gender: male | female | others`
- Auto-computed `bmi = weight / height²` and `validate` (Underweight / Normal / Overweight / Obese) via `@computed_field`
- Sorting/filter: `GET /view_patients?sort_by=height|age&order=asc|desc`
- CORS enabled for Vite dev server, JSON file persistence (`patients.json`)
- Auto interactive docs at `/docs` (Swagger) and `/redoc`

**Frontend (`frontend/my-app`)**
- `/` — Add patient form (Tailwind styled)
- `/patients` — Beautiful responsive card grid of all patients with BMI badges, search-ready, delete inline
- `/patients/:id` — Detail view with full record
- Insert auto-navigates to detail page; shared `api.js` normalizes FastAPI object-map response

## Why FastAPI — Features

1. **Performance:** Built on Starlette + Uvicorn (ASGI, async). Comparable to Node/Go for I/O-bound APIs.
2. **Validation for free:** Pydantic models validate types, ranges, enums and return clear 422 errors — no manual `if` checks.
3. **Auto OpenAPI docs:** `/docs` and `/redoc` generated from type hints, no extra YAML.
4. **Python type hints:** Editor autocomplete + fewer runtime bugs.
5. **Dependency injection:** `Depends()` for auth, DB sessions, clean testing.
6. **Async + sync:** `async def` / `def` both supported.
7. **AI/ML ecosystem:** Direct use of NumPy, pandas, scikit-learn, PyTorch — ideal for AI-engineer projects like BMI/classification logic.

## FastAPI vs Node (Express)

| Concern | FastAPI (Python) | Node + Express |
|---|---|---|
| Validation | Built-in via Pydantic, declarative | Manual or extra libs (Joi/Zod) |
| Docs | Auto Swagger/ReDoc | Manual (Swagger JSDoc) |
| AI/ML libs | Native (best in class) | Limited, often calls Python service |
| Async I/O | `asyncio`, similar throughput for CRUD | Event loop, mature npm ecosystem |
| Learning | Less boilerplate for data APIs | More JS ecosystem familiarity if frontend-heavy |
| CPU-bound | Weaker (GIL), offload or use workers | Weaker too (single-thread), offload similarly |

**Takeaway:** For data-validation + AI-heavy backends, FastAPI needs less code and gives docs/validation out of the box. For realtime-heavy or JS-only teams, Node can be simpler. This project uses FastAPI for the API + React (JS) for UI — best of both.

## Quickstart

```powershell
# 1. Backend
cd ai-engineer
python -m venv myenv; .\myenv\Scripts\Activate
pip install fastapi uvicorn
uvicorn main:app --reload --port 8000
# docs: http://localhost:8000/docs

# 2. Frontend (new terminal)
cd frontend/my-app
npm install
npm run dev
# app: http://localhost:5173
```

## API Examples

```bash
# Create
curl -X POST http://localhost:8000/create -H "Content-Type: application/json" -d "{\"id\":\"P006\",\"name\":\"Asha\",\"city\":\"Delhi\",\"age\":29,\"gender\":\"female\",\"height\":1.62,\"weight\":60}"

# Get one / all
curl http://localhost:8000/patients/P006
curl http://localhost:8000/view
```

## Structure

```
ai-engineer/
├── main.py                 # FastAPI app
├── patients.json           # file DB
├── frontend/my-app/src/
│   ├── App.jsx             # router
│   ├── PersonForm.jsx      # insert/update form
│   ├── api.js              # API helpers
│   ├── components/Navbar.jsx
│   └── pages/PatientsList.jsx, PatientDetail.jsx
└── README.md
```
