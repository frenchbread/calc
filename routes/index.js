var express = require('express');
var router = express.Router();

var moment = require('moment');

//home
router.get('/', function(req, res) {

    var cars = [

        {

            "value": "Стандарт",
            "title": "Standart"

        },
        {

            "value": "Бизнес",
            "title": "Business"

        },
        {

            "value": "Премиум",
            "title": "Premium"

        },
        {

            "value": "Минивен эконом",
            "title": "Miniven eco"

        },
        {

            "value": "Минивен бизнес",
            "title": "Minivan business"

        },
        {

            "value": "Минивен премиум",
            "title": "Minivan premium"

        },
        {

            "value": "Микроавтобус",
            "title": "Microbus"

        },

        {
            "value": "Автобус",
            "title": "Autobus"
        }

    ];

    var cities = [

        {

            "value": "Санкт-Петербург",
            "key": "spb"

        },

        {
            "value": "Москва",
            "key": "msk"
        }

    ];

    var hotels = [
        {
            "title": "Grand Hotel Europe 5*",
            "value": ""
        },{
            "title": "W ST.PETERSBURG 5*",
            "value": ""
        },{
            "title": "Astoria 5*",
            "value": ""
        },{
            "title": "Angleterre 4*",
            "value": ""
        },{
            "title": "CROWNE PLAZA LIGOVSKY 4*",
            "value": ""
        },{
            "title": "Dostoevsky 3*",
            "value": ""
        },{
            "title": "Novotel St.-Petersburg Centre 4*",
            "value": ""
        },{
            "title": "MOIKA 22 Kempinski 5*",
            "value": ""
        },{
            "title": "COURTYARD by Marriott St.Petersburg Vasilievsky 4*",
            "value": ""
        },{
            "title": "SOKOS PALACE BRIDGE 5*",
            "value": ""
        },{
            "title": "SOKOS  Olimpia Garden 5*",
            "value": ""
        },{
            "title": "Sokos Hotel Vasilievsky 4*",
            "value": ""
        },{
            "title": " Corinthia Nevsky Palace 5*",
            "value": ""
        }
    ];

    var rooms = [
        {
            "title" : "Single"
        },
        {
            "title" : "Double"
        },
        {
            "title" : "Triple"
        }
    ];


    res.render('index', {
        cars    : cars,
        cities  : cities,
        hotels  : hotels,
        rooms   : rooms
    });

});

router.post('/', function (req, res) {

    console.log("Processing data..");

    var submittedData = req.body;

    console.log(submittedData);

    var acc = {
        daysTotal: 0,
        accommodations : [
            {
                accommodationId : 0,
                city            : "",
                hotel           : "",
                moveIn          : "",
                moveout         : "",
                rooms   : [
                    {
                        roomId      : 0,
                        roomType    : "",
                        roomsAmount : 0,
                        roomPrice   : 0
                    }
                ]
            }
        ]
    };

    var accommodations = [];

    for (var i=0; i<=10; i++) {

        //accommodation

        var city = "accommodation_city_" + i;

        if (submittedData.hasOwnProperty(city)) {

            var hotel = "accommodation_hotel_" + i;
            var moveIn = "accommodation_moveIn_" + i;
            var moveOut = "accommodation_moveOut_" + i;

            var cityVal = "";
            var hotelVal = "";
            var moveInVal = "";
            var moveOutVal = "";

            var rooms = [];

            cityVal = submittedData[city];

            if (submittedData.hasOwnProperty(hotel)) {
                hotelVal = submittedData[hotel];
            }

            if (submittedData.hasOwnProperty(moveIn)) {
                moveInVal = moment(submittedData[moveIn], "DD-MM-YYYY");
            }

            if (submittedData.hasOwnProperty(moveOut)) {
                moveOutVal = moment(submittedData[moveOut], "DD-MM-YYYY");
            }

            for (var j=0; j<=50; j++) {

                var roomType    = "room_roomType_"+i+"_"+j;

                if (submittedData.hasOwnProperty(roomType)) {

                    var roomAmount  = "room_roomAmount_"+i+"_"+j;
                    var roomPrice   = "room_roomPrice_"+i+"_"+j;

                    var roomTypeVal     = "";
                    var roomAmountVal   = 0;
                    var roomPriceVal    = 0;

                    roomTypeVal     = submittedData[roomType];
                    roomAmountVal   = submittedData[roomAmount];
                    roomPriceVal    = submittedData[roomPrice];

                    //if (submittedData.hasOwnProperty[roomAmount]) {
                    //    roomAmountVal = submittedData[roomAmount];
                    //}
                    //
                    //if (submittedData.hasOwnProperty[roomPrice]) {
                    //    roomPriceVal = submittedData[roomPrice];
                    //}

                    rooms.push({
                        roomId      : j,
                        roomType    : roomTypeVal,
                        roomAmount  : roomAmountVal,
                        roomPrice   : roomPriceVal

                    });

                }


            }

            accommodations.push({
                accommodationId : i,
                city            : cityVal,
                hotel           : hotelVal,
                moveIn          : moveInVal,
                moveOut         : moveOutVal,
                rooms           : rooms
            });
        }
    }

    //calculation
    var accommodationsCount = accommodations.length;
    var fullCost            = 0;


    for (var k=0; k<accommodationsCount; k++){

        var days = accommodations[k].moveOut.diff(accommodations[k].moveIn, 'days');

        for (var l=0; l<accommodations[k].rooms.length; l++) {

            fullCost += parseInt(accommodations[k].rooms[l].roomPrice) * parseInt(accommodations[k].rooms[l].roomAmount) * days;

        }

    }

    console.log(fullCost)

    var program = [
        {
            day  : 0,
            city : "",
            services: [
                {
                    type        : "",
                    // driver & transfer
                    carType     : "",
                    from        : "",
                    to          : "",
                    //rest
                    restaurant  : "",
                    menu        : "",
                    //excursion
                    goingPlace  : "",
                    pplAmount   : "",

                    price       : 0
                }
            ]
        }
    ];

    var programs = [];
    var services = [];

    for (var m=0; m<=10; m++) {

        var day = "day_city_" + m;

        if (submittedData.hasOwnProperty(day)) {

            for (var n=0; n<=50; n++) {

                var serviceType = "service_serviceType_"+m+"_"+n;

                if (submittedData.hasOwnProperty(serviceType)) {

                    var serviceTypeVal = submittedData[serviceType];

                    //transfer
                    var transferCarType = "";
                    var transferFrom    = "";
                    var transferTo      = "";
                    var transferPrice   = 0;

                    //driver
                    var driverCarType   = "";
                    var driverFrom      = "";
                    var driverTo        = "";
                    var driverPrice     = 0;

                    //excursion
                    var goingPlace      = "";
                    var pplAmount       = "";
                    var excursionPrice  = 0;

                    //food
                    var restaurant      = "";
                    var menu            = "";
                    var foodPrice       = "";

                    switch (serviceTypeVal) {
                        case "transfer" :

                            transferCarType = submittedData["transferCarType_"+m+"_"+n];
                            transferFrom    = submittedData["transferFrom_"+m+"_"+n];
                            transferTo      = submittedData["transferTo_"+m+"_"+n];
                            transferPrice   = submittedData["transferPrice_"+m+"_"+n];

                            services.push({
                                type    : serviceTypeVal,
                                carType : transferCarType,
                                from    : transferFrom,
                                to      : transferTo,
                                price   : transferPrice
                            });

                            break;
                        case "withDriver" :

                            driverCarType = submittedData["driverCarType_"+m+"_"+n];
                            driverFrom    = moment(submittedData["driverFrom_"+m+"_"+n], "DD-MM-YYYY");
                            driverTo      = moment(submittedData["driverTo_"+m+"_"+n], "DD-MM-YYYY");
                            driverPrice   = submittedData["driverPrice_"+m+"_"+n];

                            services.push({
                                type    : serviceTypeVal,
                                carType : driverCarType,
                                from    : driverFrom,
                                to      : driverTo,
                                price   : driverPrice
                            });

                            break;
                        case "excursion" :

                            goingPlace      = submittedData["goingPlace_"+m+"_"+n];
                            pplAmount       = submittedData["pplAmount_"+m+"_"+n];
                            excursionPrice  = submittedData["excusrionPrice_"+m+"_"+n];

                            services.push({
                                type        : serviceTypeVal,
                                goingPlace  : goingPlace,
                                pplAmonut   : pplAmount,
                                price       : excursionPrice
                            });

                            break;
                        case "food" :

                            restaurant      = submittedData["restaurant_"+m+"_"+n];
                            menu            = submittedData["menuTitle_"+m+"_"+n];
                            foodPrice       = submittedData["foodPrice_"+m+"_"+n];

                            services.push({
                                type        : serviceTypeVal,
                                restaurant  : restaurant,
                                memu        : menu,
                                price       : foodPrice
                            });

                            break;
                    }

                }

            }

            programs.push({
                day         : m,
                city        : submittedData[day],
                services    : services
            });

        }


    }

    // calculations

    var programsCount = programs.length;
    var secondCost = 0;

    for (var p=0; p<programsCount; p++){

        //var days = accommodations[k].moveOut.diff(accommodations[k].moveIn, 'days');

        for (var o=0; o<programs[p].services.length; o++) {

            secondCost += parseInt(programs[p].services[o].price);

        }

    }

    console.log(secondCost);

    fullCost += secondCost;


    var trip = {
        documentFor     : req.body.documentFor,
        tripStarts      : req.body.tripStarts,
        tripEnds        : req.body.tripEnds,
        totalGuests     : req.body.guestsCount,
        accommodation   : accommodations,
        program         : programs,
        price           : fullCost
    };


    res.json(trip);
});

module.exports = router;
