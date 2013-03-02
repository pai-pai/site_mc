// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function(){
    var url_path = '/results/get_terminals?org_id=' + $("#result_org_id").val();
    if ($("#result_org_id").val()) {
        $.ajax({
            url: url_path,
            dataType: "text",
            success: function(data) { 
                $("#about-org").html(data);
                $("#count-of-terms").html("<strong>" + $("#org_term").attr("value") + "</strong>");
                $(".terms-pmz").slideDown();
                if ($("#org_infomat").val()=="1") { $(".infomat-group").slideDown(); } else { $(".infomat-group").slideUp(); };
                if ($("#org_register").val()=="1") { 
                    $(".register-group").slideDown();
                    $(".info-group").slideDown(); 
                } else { 
                    $(".register-group").slideUp();
                    $(".info-group").slideUp(); 
                };
                $(".buttons-group").slideDown();
            }
        });
    } else {   
        $("#count-of-terms").html("");
        $(".terms-pmz").slideUp();
        $(".infomat-group").slideUp();
        $(".register-group").slideUp();
        $(".info-group").slideUp();                    
        $(".buttons-group").slideUp();
    };
    $("#result_org_id").change(function() {
        var url_path = '/results/get_terminals?org_id=' + $("#result_org_id").val();
        if ($("#result_org_id").val()) {
            $.ajax({
                url: url_path,
                dataType: "text",
                success: function(data) { 
                    $("#about-org").html(data);
                    $("#count-of-terms").html("<strong>" + $("#org_term").attr("value") + "</strong>");
                    $(".terms-pmz").slideDown();
                    if ($("#org_infomat").val()=="1") { $(".infomat-group").slideDown(); } else { $(".infomat-group").slideUp(); };
                    if ($("#org_register").val()=="1") { 
                        $(".register-group").slideDown();
                        $(".info-group").slideDown(); 
                    } else { 
                        $(".register-group").slideUp();
                        $(".info-group").slideUp(); 
                    };
                    $(".buttons-group").slideDown();
                }
            });
        } else {   
            $("#count-of-terms").html("");
            $(".terms-pmz").slideUp();
            $(".infomat-group").slideUp();
            $(".register-group").slideUp();
            $(".info-group").slideUp();     
            $(".buttons-group").slideUp();            
        };

    });
    
    $(".hidden-start").each(function() { $(this).hide(); });
});
