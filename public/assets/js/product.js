
// ref: https://bootstrapious.com/p/how-to-build-a-working-bootstrap-contact-form
$(function () {
    // pull local storage data to get the user's name from firebase auth
    $('#form_myName').text(localStorage.getItem('name'));
    
    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "/api/users/contact";
            console.log('msg', $('#form_message'));
            // put form elements into a key-value pair structure. ref: https://stackoverflow.com/questions/2276463/how-can-i-get-form-data-with-javascript-jquery
            var formData = data = $('#contact-form').serializeArray().reduce(function(obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            // could add firebase user's idenifier to look up email on the server-side
            // or take the easy approach and pass all that info to node
            formData.name = localStorage.getItem('name');
            formData.email = localStorage.getItem('email');

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                success: function (data)
                {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});