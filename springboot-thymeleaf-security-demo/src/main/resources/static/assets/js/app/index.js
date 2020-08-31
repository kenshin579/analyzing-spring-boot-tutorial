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

        console.log('data', JSON.stringify(data));

        $.ajax({
            type: 'POST',
            url: '/admin/new',
            dataType: 'json',
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