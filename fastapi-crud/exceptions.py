class AdpInfoException(Exception):
    ...


class AdpInfoNotFoundError(AdpInfoException):
    def __init__(self):
        self.status_code = 404
        self.detail = "Adp Info Not Found"


class AdpInfoAlreadyExistError(AdpInfoException):
    def __init__(self):
        self.status_code = 409
        self.detail = "Adp Info Already Exists"
