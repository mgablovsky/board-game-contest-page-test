var source = $("#card-template").html();
var cardTemplate = Handlebars.compile(source);

var gameData;
var categoriesSet = Object.create(null);



$(function () {
    $.getJSON("data.json", function (data) {
            gameData = data;
        
            $.each(data, function () {
                var cardHtml = cardTemplate(this);
                $("#gameDataView").append(cardHtml);
                                
                $.each(this.categories, function() {
                   categoriesSet[this] = true;
                });
            });
        
            $('.categories').popup();
        
            for (var property in categoriesSet) {
                $('#categories-filter').append('<option value="' + property + '">' + property + '</option>');
            }
        
            $('#categories-filter').dropdown({
                onChange: function(value, text, $selectedItem) {
                    $("#gameDataView").empty();
                    
                    $.each(gameData, function() {
                        var itemCategories = this.categories;
                        var containsAll = value.every(function (val) { return itemCategories.indexOf(val) >= 0; });
                        
                        if (containsAll) {
                            $("#gameDataView").append(cardTemplate(this));
                        }
                    });
                    
                    $('.categories').popup();
                }
            });
            
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
});


