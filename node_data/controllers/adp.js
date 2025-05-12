const Adp = require('../models/adp');

exports.getAllAdp = (req, res, next) => {
    Adp.findAll().then(adp => {
        res.status(200).json({
            "message": "success",
            "data": adp[0]
        });
    }).catch(error => {
        res.status(500).json({
            "message": error
        });
    });
}

exports.addAdp = (req, res, next) => {
    const High = req.body.High;
    const Low = req.body.Low;
    const Open = req.body.Open;
    const Close = req.body.Close;
    const Volume = req.body.Volume;
    const AdjClose = req.body.AdjClose;
    
    const adp = new Adp(null,High, Low, Open, Close, Volume, AdjClose);
    adp.save().then(() => {
        res.status(200).json({
            "message": "success",
            "result": true
        });
    }).catch((error) => {
        res.status(200).json({
            "message": error,
            "result": false
        });
    });
}

exports.getEditAdp = (req, res, next) => {
    const id = req.params.id;
    Adp.findById(id).then((adp) => {
        res.status(200).json({
            "message": "success",
            "data": adp[0]
        });
    }).catch((error) => {
        res.status(500).json({
            "message": error
        });
    });
}

exports.editAdp = (req, res, next) => {
    const id = req.body.id;
    const High = req.body.High;
    const Low = req.body.Low;
    const Open = req.body.Open;
    const Close = req.body.Close;
    const Volume = req.body.Volume;
    const AdjClose = req.body.AdjClose;
    
    const adp = new Adp(id, High, Low, Open, Close, Volume, AdjClose);
    adp.save().then(() => {
        res.status(200).json({
            "message": "success",
            "result": true
        });
    }).catch((error) => {
        res.status(200).json({
            "message": error,
            "result": false
        });
    });
}

exports.deleteAdp = (req, res, next) => {
    const id = req.query.id;
    Adp.delById(id).then(() => {
        res.status(200).json({
            "message": "success",
            "result": true
        });
    }).catch((error) => {
        res.status(500).json({
            "message": error,
            "result": false
        });
    });
}
