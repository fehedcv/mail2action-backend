from typing import Optional, Literal
from pydantic import BaseModel


class Email(BaseModel):
    id: str
    sender: str
    subject: str
    body: str
    received_at: str


class Action(BaseModel):
    id: str
    email_id: str

    type: Literal[
        "task",
        "deadline",
        "event",
        "followup",
        "important"
    ]

    title: str
    description: Optional[str] = None

    deadline: Optional[str] = None
    start_time: Optional[str] = None
    location: Optional[str] = None

    priority: Literal[
        "high",
        "medium",
        "low"
    ] = "medium"

    reason: str

    completed: bool = False


class AnalyzeResponse(BaseModel):
    actions: list[Action]