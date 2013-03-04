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
                if ($("#org_infomat").val()=="1") { 
                    $(".infomat-group").slideDown(); 
                } else { 
                    $(".infomat-group").slideUp();
                };
                if ($("#org_register").val()=="1") { 
                    $(".register-group").slideDown();
                    $(".info-group").slideDown(); 
                } else { 
                    $(".register-group").slideUp();
                    $(".info-group").slideUp(); 
                };
                $(".buttons-group").slideDown();

                if (parseInt($("#result_used_term").val()) < parseInt($("#org_term").val())) { $(".container-term-reason").slideDown(); };
                if ($("#result_emk_term_0").is(":checked")) { $(".container-mis").slideDown(); };
                if ($("#result_mis_inet_0").is(":checked")) { $(".container-emk-reason").slideDown(); };
                if ($("#result_register_0").is(":checked")) { $(".container-register-reason").slideDown(); };
                if ($("#result_register_1").is(":checked")) { $(".container-register-details").slideDown(); };
                if ($("#result_doc_reg_0").is(":checked")) { $(".container-doc-reason").slideDown(); };
                if ($("#result_used_infomat_0").is(":checked")) { $(".container-infomat-reason").slideDown(); };
                if ($("#result_info_pat_0").is(":checked")) { $(".container-info-reason").slideDown(); };

                $(".field_with_errors").parent().children().each(function() { if ($(this).hasClass("head-label")) { $(this).addClass("error-label") }; });
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
        if ($("#result_org_id").val()!='') {
            $.ajax({
                url: url_path,
                dataType: "text",
                success: function(data) { 
                    $("#about-org").html(data);
                    $("#count-of-terms").html("<strong>" + $("#org_term").attr("value") + "</strong>");
                    $(".terms-pmz").slideDown();
                    if ($("#org_infomat").val()=="1") { 
                        $(".infomat-group").slideDown(); 
                    } else { 
                        $(".infomat-group").slideUp();
                        $('input[name="result[used_infomat]"]').each( function() { $(this).prop('checked', false); });
                    };
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
            $('input[name="result[used_infomat]"]').each( function() { $(this).prop('checked', false); });
        };

    });
    
    $(".hidden-start").each(function() { $(this).hide(); });

    $("#close-button").click(function() { $(".alert-error").hide(); });
    
    $("#result_used_term").change(function() {
        if (parseInt($(this).val()) < parseInt($("#org_term").val())) { 
            $(".container-term-reason").slideDown(); 
        } else { 
            $(".container-term-reason").slideUp();
            $("#result_used_term_reason").val('');
        };
    });

    $("#result_emk_term_1").change(function() { 
        if ($(this).is(":checked")) { 
            $(".container-mis").slideUp(); 
            $('input[name="result[mis_inet]"]').each( function() { $(this).prop('checked', false); });
            $(".container-emk-reason").slideUp();
            $("#result_mis_emk_reason").val('');
        };
    });
    $("#result_emk_term_0").change(function() { if ($(this).is(":checked")) { $(".container-mis").slideDown(); }; }); 

    $("#result_mis_inet_1").change(function() { 
        if ($(this).is(":checked")) { 
            $(".container-emk-reason").slideUp(); 
            $("#result_mis_emk_reason").val('');
        };
    });
    $("#result_mis_inet_0").change(function() { if ($(this).is(":checked")) { $(".container-emk-reason").slideDown(); }; });

    $("#result_register_1").change(function() { 
        if ($(this).is(":checked")) { 
            $(".container-register-reason").slideUp(); 
            $("#result_register_reason").val('');
            $(".container-register-details").slideDown();
        };
    });
    $("#result_register_0").change(function() { if ($(this).is(":checked")) { 
        $(".container-register-reason").slideDown(); 
        $(".container-register-details").slideUp();
        $("#result_records_reg").val('');
        $("#result_records_infomat").val('');
        $("#result_record_inet").val('');
    }; });

    $("#result_doc_reg_1").change(function() { 
        if ($(this).is(":checked")) { 
            $(".container-doc-reason").slideUp(); 
            $("#result_doc_reg_reason").val('');
        };
    });
    $("#result_doc_reg_0").change(function() { if ($(this).is(":checked")) { $(".container-doc-reason").slideDown(); }; });

    $("#result_used_infomat_1").change(function() { 
        if ($(this).is(":checked")) { 
            $(".container-infomat-reason").slideUp(); 
            $("#result_used_infomat_reason").val('');
        };
    });
    $("#result_used_infomat_0").change(function() { if ($(this).is(":checked")) { $(".container-infomat-reason").slideDown(); }; });

    $("#result_info_pat_1").change(function() { 
        if ($(this).is(":checked")) { 
            $(".container-info-reason").slideUp(); 
            $("#result_info_pat_reason").val('');
        };
    });
    $("#result_info_pat_0").change(function() { if ($(this).is(":checked")) { $(".container-info-reason").slideDown(); }; });

    $("#manual-link").click(function() { $(".manual").toggle('slow'); });
    $("#close-manual-button").click(function() { $(".manual").hide(); });
});
