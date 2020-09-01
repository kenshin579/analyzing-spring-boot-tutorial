function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

var main = {

    init : function () {
        var _this = this;
        $('#btn-save').on('click', function () {
            _this.save();
        });

        $('#btn-all').on('click', function () {
            _this.all();
        });
    },
    save : function () {
        var data = {
            name: $('#name').val()
        };
        var token = getCookie('XSRF-TOKEN');
        console.log('token', token);

        console.log('data', JSON.stringify(data));

        $.ajax({
            type: 'POST',
            url: '/admin/new',
            dataType: 'json',
            beforeSend: function (request) {
                request.setRequestHeader("X-XSRF-TOKEN", token);
            },
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('글이 등록되었습니다.');
            window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },

    all : function () {
        // var data = {
        //     title: $('#name').val()
        // };

        $.ajax({
            type: 'GET',
            url: '/admin/all',
            dataType: 'json',
            contentType:'application/json; charset=utf-8'
        }).done(function(json) {
            console.log('json', JSON.stringify(json));
            // alert('글이 조회되었습니다.');
            // window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    }

};

main.init();