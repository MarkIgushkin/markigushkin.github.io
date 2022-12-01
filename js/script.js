$(document).ready(function(){
    // Form custom validation
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
    });



    products = $('.catalog .product');


    $('input[type=radio][name=filter]').change(function() {
        
        duration = 500;

        if(this.value == 'all'){
            products.show(duration);
        }
        else if (this.value == 'option1') {
            products.each(function(){
                if($(this).hasClass('option1')){
                    $(this).show(duration);
                }else{
                    $(this).hide(duration);
                }
            });
        }
        else if(this.value == 'option2'){
            products.each(function(){
                if($(this).hasClass('option2')){
                    $(this).show(duration);
                }else{
                    $(this).hide(duration);
                }
            });
        }
        else if(this.value == 'option3'){
            products.each(function(){
                if($(this).hasClass('option3')){
                    $(this).show(duration);
                }else{
                    $(this).hide(duration);
                }
            });
        }
    });



});