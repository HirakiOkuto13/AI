from pydantic import BaseModel
from typing import Optional, List


# TO support creation and update APIs
class CreateAndUpdateAdp(BaseModel):
    High: float
    Low: float
    Open: float
    Close: float
    Volume: float
    AdjClose: float


# TO support list and get APIs
class Adp(CreateAndUpdateAdp):
    id: int

    class Config:
        orm_mode = True


# To support list adp API
class PaginatedAdpInfo(BaseModel):
    limit: int
    offset: int
    data: List[Adp]

