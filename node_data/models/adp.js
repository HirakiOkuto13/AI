const db = require('../util/database');

module.exports = class Adp{

    constructor(id, High, Low, Open, Close, Volume, AdjClose){
        this.id = id;
        this.High = High;
        this.Low = Low;
        this.Open = Open;
        this.Close = Close;
        this.Volume = Volume;
        this.AdjClose = AdjClose;
    }

    static findAll(){
        return db.execute("select * from adp_data");
    }

    save(){
        if(this.id){
            return db.execute(
                'update adp_data set High=?, Low=?, Open=?, Close=?, Volume=?, AdjClose=? where id = ?',
                [this.High, this.Low, this.Open, this.Close, this.Volume, this.AdjClose, this.id]
            );
        }else{
            return db.execute(
                'insert into adp_data (High, Low, Open, Close, Volume, AdjClose) values(?,?,?,?,?,?)',
                [this.High, this.Low, this.Open, this.Close, this.Volume, this.AdjClose]
            );
        }
    }

    static findById(id){
        return db.execute(
            'select * from adp_data where id = ?',
            [id]
        );
    }

    static delById(id){
        return db.execute(
            'delete from adp_data where id = ?',
            [id]
        );
    }

}