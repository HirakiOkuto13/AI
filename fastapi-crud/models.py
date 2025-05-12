from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, Float
from database import Base
# import enum


# class FuelType(str, enum.Enum):
#     Petrol = "Petrol"
#     Diesel = "Diesel"
#     RPG = "RPG"


class AdpInfo(Base):
    __tablename__ = "adp_data"

    id = Column(Integer, primary_key=True, index=True)
    High = Column(Float)
    Low = Column(Float)
    Open = Column(Float)
    Close = Column(Float)
    Volume = Column(Float)
    AdjClose = Column(Float)

