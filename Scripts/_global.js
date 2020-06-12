var modalId = "modal";

function btnAddClick(e) {
    createModalContainer();
    ajaxModalLoad(e.attr("myUrl"), modalId);
}

function btnEditClick(e) {
    createModalContainer();
    ajaxModalLoad(e.attr("myUrl") + "/" + e.val() + "/", modalId);
}
//btnDetailsClick
function btnDetailsClick(e) {
    createModalContainer();
    ajaxModalLoad(e.attr("myUrl") + "/" + e.val() + "/", modalId);
}

function btnDeleteClick(e) {
    createModalContainer();
    ajaxModalLoad(e.attr("myUrl") + "/" + e.val() + "/", modalId);
}

function checkModalContainer() {
    if ($('#modal-container').length === 1) {
        return true;
    } else {
        return false;
    }
}

function createModalContainer() {
    if (!checkModalContainer()) {
        $("<div id='modal-container'></div>").appendTo('body');
    }
}

function ajaxModalLoad(url, modalId) {    
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        success: function (data) {
            $('#modal-container').html(data);
            $('#' + modalId).modal();
        },
        error: function () {
            alert("ajaxModalLoad error");
        }
    });
}
function formValidSend() {
    var form = $('#' + modalId).find('form');

    $.validator.unobtrusive.parse(form);
    form.validate();
    $("#loader_view").show();
    if (form.valid()) {
        $.ajax({
            url: form.attr('ajaxPostUrl'),
            type: "POST",
            data: form.serialize(),
            async: false,
            success: function (data) {
                $("#loader_view").hide();
                $('#' + modalId).modal('hide');
                $('.mvc-grid').mvcgrid({ reload: true });
            },
            error: function () {
                alert('formValidSend - save data with ajax was failed !!! :(');
            }
        });
    } else {
        return false;
    }
}

function formValidSend1() {
    var form = $('#' + modalId).find('form');
    $(".validation-summary-valid ul").append("");
    $.validator.unobtrusive.parse(form);
    form.validate();
    $("#loader_view").show();
    if (form.valid()) {
        $.ajax({
            url: form.attr('ajaxPostUrl'),
            type: "POST",
            data: form.serialize(),
            async: false,
            success: function (data) {
                debugger;
                if (data == "true") {
                    $("#loader_view").hide();
                    $(".validation-summary-valid ul").append("");
                    $('#' + modalId).modal('hide');
                    $('.mvc-grid').mvcgrid({ reload: true });
                }else if (data.length > 0) {
                    $.each(data, function (key, val) {
                        
                        $(".validation-summary-valid ul").append("<li>" + val.ErrorMessage+"</li>");
                    });
                }
                $("#loader_view").hide();
            },
            error: function (data) {
                
                alert('formValidSend - save data with ajax was failed !!! :(');
                $("#loader_view").hide();
            }
        });
    } else {
        return false;
    }
}

$(document).on('keypress', function (e) {
    if (e.which === 13 && $('#' + modalId).is(':visible')) {
        formValidSend();
    }
});

$(document).ready(function () {
    //$('.mvc-grid').mvcgrid();
});