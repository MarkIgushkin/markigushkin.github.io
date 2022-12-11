$(document).ready(function(){
    // Form custom validation
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }else{
                    event.preventDefault();
                    event.stopPropagation();
                    if($(form).attr('id') == 'subscription-form'){
                        new bootstrap.Modal($("#sub-modal")).toggle();
                    }
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


    //const map = new Map();

    //map.set('a', 1);

    $("#add-to-card").click(function(event){

        values = JSON.parse(window.sessionStorage.getItem('map'));

        if(values == null){
            map = new Map();
        }else{
            map = new Map(Object.entries(values));
        }

        productId = $("#product-info").attr("data-product-id");
        productPrice = $("#product-info").attr("data-price");
        prodcutName = $("h1").text();
        src = "../images/product" + productId + "-min.jpg";

        if(map.has(productId)){
            obj = map.get(productId);
            obj.quantity = obj.quantity + 1;
            console.log(obj);
            map.set(productId, obj);
            console.log(obj);
        }else{
            obj = new Order();
            obj.id = productId;
            obj.name = prodcutName;
            obj.src = src;
            obj.quantity = 1;
            obj.price = productPrice;
            map.set(productId, obj);
            console.log(obj);
        }

        window.sessionStorage.setItem('map', JSON.stringify(Object.fromEntries(map)));

        updateCard();

        new bootstrap.Modal($("#added")).toggle();
    }); 

    class Order {
        id;
        quantity;
        price;
        src;
        name;
    }

    $("#remove-app").click(function(){
        clearStorage();
    });


    updateCard();
    updateCheckoutPage();

    function clearStorage(){
        window.sessionStorage.setItem('map', '{}');
        location.reload();
    };

    function updateCard() {
        counter = 0;

        values = JSON.parse(window.sessionStorage.getItem('map'));

        if(values == null){
            return;
        }else{
            map = new Map(Object.entries(values));
        }

        map.forEach(value => {
            counter += value.quantity; 
        });

        $('#quantity').text(counter);
    }

    function updateCheckoutPage() {
        counter = 0;
        total = 0;

        if(jQuery.isEmptyObject(values)){
            $("#summary").append(
                "<div class=\"col-12 no-items\">No items have been added yet!</div>"
            );
            $("#remove-itm-btn").hide();
            $("#checkout-btn").prop("disabled", true);
            return;
        }else{
            map = new Map(Object.entries(values));

            map.forEach(value => {
                $("#summary").append("<div class=\"col-3 mb-4\"><img src=" + value.src + " alt=\"product\"></div>");
                $("#summary").append("<div class=\"col-3 mb-4\"><p>" + value.name + "</p></div>");
                $("#summary").append("<div class=\"col-2 mb-4\"><p>" + value.quantity + "</p></div>");
                $("#summary").append("<div class=\"col-2 mb-4\"><p>€ " + value.price + "</p></div>");
                $("#summary").append("<div class=\"col-2 mb-4\"><p>€ " + value.price * value.quantity + "</p></div>");
                total += value.price * value.quantity;
            });
            
            $("#summary").append("<div class=\"col-8 mb-4\" style=\"text-align: center;\"><button class=\"btn\" id=\"remove-itm-btn\">Remove items</button></div>");
            $("#summary").append("<div class=\"col-2 total mb-4\">Total:</div>");
            $("#summary").append("<div class=\"col-2 total mb-4\"><p>€ " + total.toFixed(2) + "</p></div>");

            $("#remove-itm-btn").click(function(event){
                new bootstrap.Modal($("#removed")).toggle();
            });
        }
    };

    $('#sub-modal').on('hidden.bs.modal', function (e) {
        location.reload();
    });
});