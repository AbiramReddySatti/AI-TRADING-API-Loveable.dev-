from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import Optional, List, Dict

app = FastAPI(title="AI Trading LLM API MVP")

# --- In-memory storage for MVP ---
user_state = {
    "llm": None,
    "auto_execute": False,
    "markers": {},  # {symbol: {"stop_loss": value, "take_profit": value}}
    "todos": [],
    "trading_active": True,
}

# --- Models ---
class LLMChoice(BaseModel):
    provider: str  # e.g., 'openai', 'gemini', etc.

class TradePredictionRequest(BaseModel):
    symbol: str
    context: Optional[str] = None

class TradePredictionResponse(BaseModel):
    action: str  # 'buy', 'sell', 'hold'
    rationale: str

class AutoExecuteRequest(BaseModel):
    enable: bool

class MarkerRequest(BaseModel):
    symbol: str
    marker_type: str  # 'stop_loss' or 'take_profit'
    value: float

class TodoItem(BaseModel):
    id: int
    task: str
    done: bool = False

# --- LLM Integration Stub ---
def get_llm_prediction(symbol: str, context: Optional[str], provider: str) -> TradePredictionResponse:
    # Stub: Replace with real LLM API call
    return TradePredictionResponse(
        action="buy",
        rationale=f"Stub prediction for {symbol} using {provider}. Context: {context}"
    )

# --- Trading API Stub ---
def execute_trade(symbol: str, action: str):
    # Stub: Replace with real trading API call
    return {"status": "executed", "symbol": symbol, "action": action}

def stop_all_trading():
    user_state["trading_active"] = False
    return {"status": "stopped"}

# --- Endpoints ---
@app.post("/set_llm")
def set_llm(choice: LLMChoice):
    user_state["llm"] = choice.provider
    return {"message": f"LLM set to {choice.provider}"}

@app.post("/predict_trade", response_model=TradePredictionResponse)
def predict_trade(req: TradePredictionRequest):
    provider = user_state["llm"] or "openai"
    prediction = get_llm_prediction(req.symbol, req.context, provider)
    return prediction

@app.post("/auto_execute")
def auto_execute(req: AutoExecuteRequest):
    user_state["auto_execute"] = req.enable
    return {"auto_execute": req.enable}

@app.post("/instant_stop")
def instant_stop():
    stop_all_trading()
    return {"message": "All trading activity stopped."}

@app.post("/set_marker")
def set_marker(req: MarkerRequest):
    if req.symbol not in user_state["markers"]:
        user_state["markers"][req.symbol] = {}
    user_state["markers"][req.symbol][req.marker_type] = req.value
    return {"symbol": req.symbol, "marker_type": req.marker_type, "value": req.value}

@app.get("/todo", response_model=List[TodoItem])
def get_todos():
    return user_state["todos"]

@app.post("/todo", response_model=TodoItem)
def add_todo(item: TodoItem):
    user_state["todos"].append(item)
    return item

@app.put("/todo/{todo_id}", response_model=TodoItem)
def update_todo(todo_id: int, item: TodoItem):
    for idx, todo in enumerate(user_state["todos"]):
        if todo.id == todo_id:
            user_state["todos"][idx] = item
            return item
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todo/{todo_id}")
def delete_todo(todo_id: int):
    user_state["todos"] = [todo for todo in user_state["todos"] if todo.id != todo_id]
    return {"message": "Todo deleted"}

# --- Root endpoint ---
@app.get("/")
def root():
    return {"message": "AI Trading LLM API MVP is running."} 