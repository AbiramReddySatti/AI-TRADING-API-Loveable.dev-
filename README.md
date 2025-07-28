# AI Trading LLM API MVP

This is a minimal API that integrates a Large Language Model (LLM) with a trading account, allowing users to:
- Select their preferred LLM (OpenAI, Gemini, Copilot, Deepseek AI, Claude)
- Get AI-powered trade predictions
- Enable auto-execution of trades
- Instantly stop all trading activity
- Set stop-loss and take-profit markers
- Manage trading-related tasks (ToDo)

## Features
- Modular LLM selection (stubbed, easy to extend)
- Trade prediction endpoint
- Auto-execution toggle
- Instant stop endpoint
- User-defined stop/sell markers
- ToDo management

## Requirements
- Python 3.8+
- See `requirements.txt`

## Setup
```bash
pip install -r requirements.txt
```

## Running the API
```bash
uvicorn main:app --reload
```

## API Endpoints
- `POST /set_llm` — Set the LLM provider
- `POST /predict_trade` — Get a trade prediction
- `POST /auto_execute` — Enable/disable auto-trading
- `POST /instant_stop` — Instantly stop all trading
- `POST /set_marker` — Set stop-loss/take-profit
- `GET /todo` — List tasks
- `POST /todo` — Add a task
- `PUT /todo/{todo_id}` — Update a task
- `DELETE /todo/{todo_id}` — Delete a task

## Example Usage
### Set LLM
```bash
curl -X POST "http://localhost:8000/set_llm" -H "Content-Type: application/json" -d '{"provider": "openai"}'
```

### Predict Trade
```bash
curl -X POST "http://localhost:8000/predict_trade" -H "Content-Type: application/json" -d '{"symbol": "AAPL"}'
```

### Enable Auto-Execution
```bash
curl -X POST "http://localhost:8000/auto_execute" -H "Content-Type: application/json" -d '{"enable": true}'
```

### Instant Stop
```bash
curl -X POST "http://localhost:8000/instant_stop"
```

### Set Marker
```bash
curl -X POST "http://localhost:8000/set_marker" -H "Content-Type: application/json" -d '{"symbol": "AAPL", "marker_type": "stop_loss", "value": 150.0}'
```

### ToDo Management
```bash
curl -X POST "http://localhost:8000/todo" -H "Content-Type: application/json" -d '{"id": 1, "task": "Review AAPL trade", "done": false}'
curl http://localhost:8000/todo
```

---

**Note:** This MVP uses in-memory storage and stubbed integrations. For production, add authentication, persistent storage, and real LLM/trading API integrations. 