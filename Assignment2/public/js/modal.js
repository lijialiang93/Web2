(function ($) {
   
    $('.btn-primary').click(function () {
        var id = $(this).data('id');
        var name = $('.card-title-' + id);
        var image = $('#image-'+id).attr('src');
        var credit = $('#image-'+id).attr("data-credit");
        var description = $('#image-'+id).attr('data-description');
        var price = $('.card-text-' + id).data('price');

        $('.modal-title').text(name.text());
        $('.modal-description').text(description);
        $('.modal-price').text("Price: "+price);
        $('#modal-image').attr('src',image);
        $('#modal-image').attr('alt',name.text());
        $('.image-credit').text('Image credit: '+credit);
        $('#exampleModalCenter').modal('show');
    });

})(jQuery);