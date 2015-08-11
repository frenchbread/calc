$(document).ready(function () {

    var labelAcc    = "accommodation";
    var labelRoom   = "room";

    var accommodationIds    = [];
    var accommodations      = $('#accommodations');
    var accommodationId     = $('#accommodations>.accommodationForm').size();

    var roomIds = [];
    var rooms   = $('#rooms');
    var roomId  = $('#rooms>.roomForm').size();

    accommodationIds.push(accommodationId);
    roomIds.push(roomId);


    var timeFormat = {
        format : "dd-mm-yyyy"
    };


    addAccommodation = function () {

        accommodationId++;

        var city;
        var hotel;
        var moveIn;
        var moveOut;

        city        = labelAcc + "_city_" + accommodationId;
        hotel       = labelAcc + "_hotel_" + accommodationId;
        moveIn      = labelAcc + "_moveIn_" + accommodationId;
        moveOut     = labelAcc + "_moveOut_" + accommodationId;

        var col1 = [
            '<div class="form-group">' +
                '<label>Город</label>' +
                '<br/>' +
                '<select id="'+ city +'" class="form-control">' +
                    '<option>Город</option>' +
                    '<option value="spb">Санкт-Петербург</option>' +
                    '<option value="msk">Москва</option>' +
                '</select>' +
            '</div>' +
            '<div class="form-group">' +
                '<label>Гостиница</label>' +
                '<br/>' +
                '<input id="'+ hotel +'" type="text" placeholder="Гостиница" class="form-control"/>' +
            '</div>' +
            '<div class="form-group">' +
                '<label >Дата заселения</label>' +
                '<br/>' +
                '<input id="'+ moveIn +'" type="text" placeholder="dd-mm-yyyy" class="form-control"/>' +
            '</div>' +
            '<div class="form-group">' +
                '<label>Дата выезда</label>' +
                '<br/>' +
                '<input id="'+ moveOut +'" type="text" placeholder="dd-mm-yyyy" class="form-control"/>' +
            '</div>'
        ].join();

        var form = [
            '<div class="row accommodationForm" id="accommodationForm_'+accommodationId+'">' +
                '<hr />' +
                '<div class="col-md-8">' +
                    col1 +
                '</div>' +
                '<div class="col-md-4">' +
                    '<div id="rooms"></div>' +
                    '<hr/>' +
                    '<a id="addRoom" onclick="addRoom('+accommodationId+')" class="btn btn-xs btn-primary">+ Добавить тип комнаты</a>' +
                '</div>' +
                '<div class="col-lg-12">' +
                    '<hr/>' +
                    '<a href="#" class="btn btn-xs btn-danger" onclick="removeAccommodation('+accommodationId+')">x Убрать вариант проживания</a>' +
                '</div>' +
            '</div>'
        ].join();

        $(form).appendTo(accommodations);
        accommodationIds.push(accommodationId);

        $('#' + moveIn).datepicker(timeFormat);
        $('#' + moveOut).datepicker(timeFormat);

        console.log("added " + accommodationId);

        return false;
    };

    removeAccommodation = function (accommodationIdd) {

        $('#accommodationForm_'+accommodationIdd).remove();

        var index   = accommodationIds.indexOf(accommodationIdd);
        var inList  = index > -1;
        if (inList) accommodationIds.splice(index, 1);

        return false;
    };



    addRoom = function (accId) {

        var roomType;
        var roomAmount;
        var anAccommodationId = accId;

        roomId++;

        roomType    = labelRoom + "_roomType_" + anAccommodationId + "_" +roomId;
        roomAmount  = labelRoom + "_roomAmount_" + anAccommodationId + "_" + roomId ;


        var form = [
            '<div class="roomForm" id="roomForm_'+roomId+'">' +
                '<div class="form-group">' +
                    '<label>Тип комнаты</label><br/>' +
                    '<input id="'+roomType+'" type="text" placeholder="Тип комнаты" class="form-control"/>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label>Кол-во номеров</label><br/>' +
                    '<input id="'+roomAmount+'" type="text" placeholder="Кол-во номеров" class="form-control"/>' +
                '</div>' +
                '<div class="form-group" style="padding:2px;padding-top:30px;">' +
                    '<a href="#" class="btn btn-xs btn-danger" onclick="removeRoom('+anAccommodationId+', '+roomId+')">x</a>' +
                '</div>' +
            '</div>'
        ].join();

        $(form).appendTo($('#accommodationForm_'+anAccommodationId+' #rooms'));
        roomIds.push(roomId);

        console.log("added " + anAccommodationId + " and " + roomId)

        return false;
    };

    removeRoom  = function (accIdd, roomIdd) {

        $('#'+labelRoom+'_roomType_'+accIdd+'_'+roomIdd).closest('.roomForm').remove();
        var index   = roomIds.indexOf(roomIdd);
        var inList  = index > -1;
        if (inList) roomIds.splice(index, 1);

        return false;
    };

});