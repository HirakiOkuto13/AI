from fastapi import APIRouter, Depends, HTTPException
from fastapi_utils.cbv import cbv
from schemas import Adp, CreateAndUpdateAdp, PaginatedAdpInfo
from sqlalchemy.orm import Session
from database import get_db
from crud import get_adp_info_by_id ,get_all_adp, create_adp,update_adp_info, delete_adp_info
from exceptions import AdpInfoException

router = APIRouter()

# Example of Class based view
@cbv(router)
class Adps:
    session: Session = Depends(get_db)

    # API to get the list of adp info
    @router.get("/adp", response_model=PaginatedAdpInfo)
    def list_adp(self, limit: int = 10, offset: int = 0):

        adp_list = get_all_adp(self.session, limit, offset)
        response = {"limit": limit, "offset": offset, "data": adp_list}

        return response

    # API endpoint to add a adp info to the database
    @router.post("/adp")
    def add_adp(self, adp_info: CreateAndUpdateAdp):

        try:
            adp_info = create_adp(self.session, adp_info)
            return adp_info
        except AdpInfoException as cie:
            raise HTTPException(**cie.__dict__)

@router.get("/adp/{adp_id}", response_model=Adp)
def get_adp_info(adp_id: int, session: Session = Depends(get_db)):
    print(adp_id)
    try:
        adp_info = get_adp_info_by_id(session, adp_id)
        
        return adp_info
    except AdpInfoException as cie:
        print("adp_info")
        raise HTTPException(**cie.__dict__)

# API to update a existing adp info
@router.put("/adp/{adp_id}", response_model=Adp)
def update_adp(adp_id: int, new_info: CreateAndUpdateAdp, session: Session = Depends(get_db)):

    try:
        adp_info = update_adp_info(session, adp_id, new_info)
        return adp_info
    except AdpInfoException as cie:
        raise HTTPException(**cie.__dict__)

# API to delete a adp info from the data base
@router.delete("/adp/{adp_id}")
def delete_adp(adp_id: int, session: Session = Depends(get_db)):

    try:
        return delete_adp_info(session, adp_id)
    except AdpInfoException as cie:
        raise HTTPException(**cie.__dict__)