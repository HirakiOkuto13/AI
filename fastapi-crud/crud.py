from typing import List
from sqlalchemy.orm import Session
from exceptions import AdpInfoAlreadyExistError, AdpInfoNotFoundError
from models import AdpInfo
from schemas import CreateAndUpdateAdp

# Function to get list of adp info
def get_all_adp(session: Session, limit: int, offset: int) -> List[AdpInfo]:
    return session.query(AdpInfo).offset(offset).limit(limit).all()

# Function to  get info of a particular adp
def get_adp_info_by_id(session: Session, _id: int) -> AdpInfo:
    adp_info = session.query(AdpInfo).get(_id)

    if adp_info is None:
        raise AdpInfoNotFoundError

    return adp_info

# Function to add a new adp info to the database
def create_adp(session: Session, adp_info: CreateAndUpdateAdp) -> AdpInfo:
    adp_details = session.query(AdpInfo).filter(AdpInfo.High == adp_info.High, AdpInfo.Low == adp_info.Low).first()
    if adp_details is not None:
        raise AdpInfoAlreadyExistError

    new_adp_info = AdpInfo(**adp_info.dict())
    session.add(new_adp_info)
    session.commit()
    session.refresh(new_adp_info)
    return new_adp_info

# Function to update details of the adp
def update_adp_info(session: Session, _id: int, info_update: CreateAndUpdateAdp) -> AdpInfo:
    adp_info = get_adp_info_by_id(session, _id)

    if adp_info is None:
        raise AdpInfoNotFoundError

    adp_info.High = info_update.High
    adp_info.Low = info_update.Low
    adp_info.Open = info_update.Open
    adp_info.Close = info_update.Close
    adp_info.Volume = info_update.Volume
    adp_info.AdjClose = info_update.AdjClose

    session.commit()
    session.refresh(adp_info)

    return adp_info

# Function to delete a adp info from the db
def delete_adp_info(session: Session, _id: int):
    adp_info = get_adp_info_by_id(session, _id)

    if adp_info is None:
        raise AdpInfoNotFoundError

    session.delete(adp_info)
    session.commit()

    return