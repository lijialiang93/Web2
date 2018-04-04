$(function () {
    const socket = io('http://localhost:3000');

    $('form').submit(function (e) {
        e.preventDefault();
        $(".alert-danger").attr('hidden', true);
        $(".alert-success").attr('hidden', true);
        let usernmae = $('#username').val();
        let searchQuery = $('#searchQuery').val();
        let message = $('#message').val();
        if (usernmae === '' || searchQuery === '' || message == '') {
            $(".alert-danger").attr('hidden', false);
            return;
        }
        else {
            $(".alert-success").attr('hidden', false);
        }
        socket.emit('data',
            data = {
                username: $('#username').val(),
                searchQuery: $('#searchQuery').val(),
                message: $('#message').val()
            }
        );
        $('#username').attr('readonly', true);
        $('#searchQuery').val('');
        $('#message').val('');
    });

    socket.on('reply', function (data) {
        let resultDiv = $("<div class='col-12 mt-4 alert alert-dark'></div>");
        let username = $("<h1></h1>").text("'" + data.username + "' search for '" + data.searchQuery + "'");
        let userMessage = $("<h2></h2>").text("message: " + data.userMessage);
        let userDiv = $("<div class='alert alert-primary'><div>");
        userDiv.append(username);
        userDiv.append(userMessage);
        resultDiv.append(userDiv);

        if (data.pictures.length !== 0) {
            data.pictures.forEach(element => {
                let imageDiv = $("<div class='col-3 d-inline'></div>");
                let imageHref = $("<a target='_blank'></a>").attr("href", element.webformat);
                let image = $("<img></img>").attr("src", element.preview);
                image.attr("alt",data.searchQuery);
                imageHref.append(image);
                imageDiv.append(imageHref);
                resultDiv.append(imageDiv);
            });
        }
        else {
           
            let errDiv = $("<div class='alert alert-danger'></div>");
            let resultNotFound = $("<h1></h1>").text("Result Not Found");
            errDiv.append(resultNotFound);
            resultDiv.append(errDiv);
        }

        $('#image-container').prepend(resultDiv);

    });
});