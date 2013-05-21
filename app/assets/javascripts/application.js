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
//= require bootstrap-modal
//= require bootstrap-tooltip
//= require bootstrap-dropdown


function centringLogin() {
    $(".layout").css("margin-left", ($(".img-container").width() - $(".layout").width())/2);
}

function fillForm() {
    if ($("#result_org_id").val()) { 
        $.ajax({
            dataType: "json",
            url: "/results/get_last_result?org_id=" + $('#result_org_id').val(),
            data: {},
            success: function(data) { 
                if (data) {
                    $("#result_used_term").val( data["used_term"] );
                    compareTerms();
                    if ( data["used_term_reason"] ) {
                        $("#result_used_term_reason").val( data["used_term_reason"] )
                    } else {
                        $("#result_used_term_reason").val( "" )
                    };
                    if ( data["cod_date_term"] ) {
                        $("#result_cod_date_term").val( data["cod_date_term"] )
                    } else {
                        $("#result_cod_date_term").val( "" )
                    };
                    if ( data["workers_term"] ) {
                        $("#result_workers_term").val( data["workers_term"] )
                    } else {
                        $("#result_workers_term").val( "" )
                    };
                    compareWorkers();
                    if ( data["workers_term_reason"] ) {
                        $("#result_workers_term_reason").val( data["workers_term_reason"] )
                    } else {
                        $("#result_workers_term_reason").val( "" )
                    };
                    if ( data["addition_volokno"] == 1 ) {
                        $("#result_addition_volokno").attr( 'checked', true )
                    } else {
                        $("#result_addition_volokno").attr( 'checked', false )
                    };
                    if ( data["addition_sks"] == 1 ) {
                        $("#result_addition_sks").attr( 'checked', true )
                    } else {
                        $("#result_addition_sks").attr( 'checked', false )
                    };
                    if ( data["addition_other"] == 1 ) {
                        $("#result_addition_other").attr( 'checked', true );
                        $("#result_addition_other_def").val( data["addition_other_def"] );
                    } else {
                        $("#result_addition_other").attr( 'checked', false );
                        $("#result_addition_other_def").val( "" );
                    };
                    isAdditionalCheck();
                    isVoloknoPick();
                    isSksPick();
                    /*********************************/
                    if ( data["emk_term"] === 0 || data["emk_term"] === 1 ) {
                        if ( data["emk_term"] === 1 ) {
                            $("#result_emk_term_1").prop( 'checked', true );
                            isEmkYes();
                        } else {
                            $("#result_emk_term_0").prop( 'checked', true );
                            isEmkNo();
                            if ( data["mis_inet"] === 1 ) {
                                $("#result_mis_inet_1").prop( 'checked', true );
                                isMisYes();
                            } else {
                                $("#result_mis_inet_0").prop( 'checked', true );
                                isMisNo();
                                $("#result_mis_emk_reason").val( data["mis_emk_reason"] );
                            };
                        }
                    };                    
                    /********************************/
                    if ( data["register"] === 0 || data["register"] === 1 ) {
                        if ( data["register"] === 1 ) {
                            $("#result_register_1").prop( 'checked', true );
                            isRegisterYes();
                            $("#result_record_inet").val( data["record_inet"] );
                        } else {
                            $("#result_register_0").prop( 'checked', true );
                            isRegisterNo();
                            $("#result_register_reason").val( data["register_reason"] );
                        }
                    };
                    /*******************************/
                    if ( data["doc_reg"] === 0 || data["doc_reg"] === 1 ) {
                        if ( data["doc_reg"] === 1 ) {
                            $("#result_doc_reg_1").prop( 'checked', true );
                            isDocYes();
                        } else {
                            $("#result_doc_reg_0").prop( 'checked', true );
                            isDocNo();
                            $("#result_doc_reg_reason").val( data["doc_reg_reason"] );
                        }
                    };
                    /******************************/
                    if ( data["used_infomat"] === 0 || data["used_infomat"] === 1 ) {
                        if ( data["used_infomat"] === 1 ) {
                            $("#result_used_infomat_1").prop( 'checked', true );
                            isInfomatYes();
                        } else {
                            $("#result_used_infomat_0").prop( 'checked', true );
                            isInfomatNo();
                            $("#result_used_infomat_reason").val( data["used_infomat_reason"] );
                        }
                    };
                    /******************************/
                    if ( data["info_pat"] === 0 || data["info_pat"] === 1 ) {
                        if ( data["info_pat"] === 1 ) {
                            $("#result_info_pat_1").prop( 'checked', true );
                            isInfoYes();
                        } else {
                            $("#result_info_pat_0").prop( 'checked', true );
                            isInfoNo();
                            $("#result_info_pat_reason").val( data["info_pat_reason"] );
                        }
                    };
                    /******************************/
                    if ( data["comments"] ) {
                        $("#result_comments").val( data["comments"] );
                    } else {
                        $("#result_comments").val( "" );
                    };
                    /*****************************/
                    $("#result_fio").val( data["fio"] );
                    $("#result_phone").val( data["phone"] );
                } else {
                    $(".no-one-last-result").toggle('slow');
                    $(".fill-form").hide();
                    $("#last-result").prop('checked', false);
                }
            }
        });
    }
}

function compareTerms() {
    if (parseInt($("#result_used_term").val()) < parseInt($("#org_term").val())) { 
        $("#not_cod").html( parseInt($("#org_term").val()) - parseInt($("#result_used_term").val()) );
        if ( $("#result_workers_term").val() ) { $("#no_workers").html( parseInt($("#result_used_term").val()) - parseInt($("#result_workers_term").val()) ); }
        $(".container-term-reason").slideDown(); 
        $(".container-cod-date").slideDown();
        $(".container-addition-works").slideDown();
    } else { 
        $(".container-term-reason").slideUp();
        $(".container-cod-date").slideUp();
        $(".container-addition-works").slideUp()
        $("#result_used_term_reason").val('');
        $("#result_cod_date_term").val('');
        $("#result_addition_volokno").attr('checked', false);
        $("#result_addition_sks").attr('checked', false);
        $("#result_addition_other").attr('checked', false);
        $("#result_addition_other_def").val('');
    };
    if (parseInt($("#result_used_term").val()) > 0) {
        $(".container-workers").slideDown();
    } else {
        $(".container-workers").slideUp();
        $("#result_workers_term").val('');
    }
}

function compareWorkers() {
    if (parseInt($("#result_used_term").val()) > parseInt($("#result_workers_term").val())) {
        $("#no_workers").html( parseInt($("#result_used_term").val()) - parseInt($("#result_workers_term").val()) );
        $(".container-not-workers").slideDown();
    } else {
        $(".container-not-workers").slideUp();
        $("#result_workers_term_reason").val('');
    }
}

function isAdditionalCheck() {
    if ( $("#result_addition_volokno").is(':checked') || $("#result_addition_sks").is(':checked') || $("#result_addition_other").is(':checked') ) {
        $(".container-term-reason").slideUp();
        $("#result_used_term_reason").val('');
    } else {
        if (parseInt($("#result_used_term").val()) < parseInt($("#org_term").val())) { 
            $(".container-term-reason").slideDown();
            $("#result_addition_other_def").val('');
        } else {
            $(".container-term-reason").slideUp();
            $("#result_used_term_reason").val('');
        }
    };
    if ( $("#result_addition_other").is(':checked') ) {
        $("#result_addition_other_def").slideDown();
    } else {
        $("#result_addition_other_def").slideUp();
    };
    if ( $("#result_addition_volokno").is(':checked') ) {
        $(".container-steps-volokno").slideDown();
    } else {
        $(".container-steps-volokno").slideUp();
    };
    if ( $("#result_addition_sks").is(':checked') ) {
        $(".container-steps-sks").slideDown();
    } else {
        $(".container-steps-sks").slideUp();
    };
}

function isVoloknoPick() {
    if ( $("#result_step_volokno_5").is(":checked") ) {
        $("#result_step_volokno_other_def").slideDown();
    } else {
        $("#result_step_volokno_other_def").slideUp();
        $("#result_step_volokno_other_def").val('');
    }
}

function isSksPick() {
    if ( $("#result_step_sks_5").is(":checked") ) {
        $("#result_step_sks_other_def").slideDown();
    } else {
        $("#result_step_sks_other_def").slideUp();
        $("#result_step_sks_other_def").val('');
    }
}

function isEmkYes() {
    if ($("#result_emk_term_1").is(":checked")) { 
        $(".container-mis").slideUp(); 
        $('input[name="result[mis_inet]"]').each( function() { $(this).prop('checked', false); });
        $(".container-emk-reason").slideUp();
        $("#result_mis_emk_reason").val('');
    }
}

function isEmkNo() { if ($("#result_emk_term_0").is(":checked")) $(".container-mis").slideDown() }

function isMisYes() { 
    if ($("#result_mis_inet_1").is(":checked")) { 
        $(".container-emk-reason").slideUp(); 
        $("#result_mis_emk_reason").val('');
        $(".container-mis-inet-reason").slideDown();
    } else {
        $(".container-mis-inet-reason").slideUp();
        $("#result_mis_inet_reason").val('');
    }
}

function isMisNo() { 
    if ($("#result_mis_inet_0").is(":checked")) {
        $(".container-emk-reason").slideDown();
        $(".container-mis-inet-reason").slideUp();
        $("#result_mis_inet_reason").val('');
    }
}

function isRegisterYes() { 
    if ($("#result_register_1").is(":checked")) { 
        $(".container-register-reason").slideUp(); 
        $("#result_register_reason").val('');
        $(".container-register-details").slideDown();
    }
}

function isRegisterNo() { 
    if ($("#result_register_0").is(":checked")) { 
        $(".container-register-reason").slideDown(); 
        $(".container-register-details").slideUp();
        $("#result_records_reg").val('');
        $("#result_records_infomat").val('');
        $("#result_record_inet").val('');container-addition-works
    } 
}

function isDocYes() { 
    if ($("#result_doc_reg_1").is(":checked")) { 
        $(".container-doc-reason").slideUp(); 
        $("#result_doc_reg_reason").val('');
    }
}

function isDocNo() { if ($("#result_doc_reg_0").is(":checked")) $(".container-doc-reason").slideDown() }

function isInfomatYes() { 
    if ($("#result_used_infomat_1").is(":checked")) { 
        $(".container-infomat-reason").slideUp(); 
        $("#result_used_infomat_reason").val('');
    }
}

function isInfomatNo() { if ($("#result_used_infomat_0").is(":checked")) $(".container-infomat-reason").slideDown() }

function isInfoYes() { 
    if ($("#result_info_pat_1").is(":checked")) { 
        $(".container-info-reason").slideUp(); 
        $("#result_info_pat_reason").val('');
    }
}

function isInfoNo() { if ($("#result_info_pat_0").is(":checked")) $(".container-info-reason").slideDown() }


$(document).ready(function(){
    centringLogin();

    $("#last-result").change(function() { 
        if ($("#last-result").is(":checked")) {
            fillForm();
        } else {
            var orgName = $("#result_org_id").val();
            $("#new_result")[0].reset();
            $("#result_org_id").val( orgName );
            $(".hidden-start").each(function() { $(this).hide() });
            $("#result_org_id").trigger("change");
        }
    });

    $(".hidden-start").each(function() { $(this).hide() });

    var url_path = '/results/get_terminals?org_id=' + $("#result_org_id").val();
    if ($("#result_org_id").val()) {
        $(".fill-form").show();

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

                //if (parseInt($("#result_used_term").val()) < parseInt($("#org_term").val())) { $(".container-term-reason").slideDown(); };
                compareTerms();
                compareWorkers();
                isAdditionalCheck();
                isVoloknoPick();
                isSksPick();
                if ($("#result_emk_term_0").is(":checked")) { $(".container-mis").slideDown(); };
                if ($("#result_mis_inet_0").is(":checked")) { $(".container-emk-reason").slideDown(); };
                if ($("#result_mis_inet_1").is(":checked")) { $(".container-mis-inet-reason").slideDown(); };
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
        var orgName = $("#result_org_id").val();
        $("#new_result")[0].reset();
        $("#result_org_id").val( orgName );
        $(".hidden-start").each(function() { $(this).hide() });
        $(".fill-form").slideDown();

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
    
    $("#close-button").click(function() { $(".alert-error").hide() });
    
    $("#result_used_term").change(function() { compareTerms() });
    $("#result_workers_term").change(function() { compareWorkers() });

    $(".container-addition-works input[type='checkbox']").change(function() { isAdditionalCheck() });

    $(".container-steps-volokno input[type='radio']").change(function() { isVoloknoPick(); });
    $(".container-steps-sks input[type='radio']").change(function() { isSksPick(); });

    $("#result_emk_term_1").change(function() { isEmkYes() });
    $("#result_emk_term_0").change(function() { isEmkNo() }); 

    $("#result_mis_inet_1").change(function() { isMisYes() });
    $("#result_mis_inet_0").change(function() { isMisNo() });

    $("#result_register_1").change(function() { isRegisterYes() });
    $("#result_register_0").change(function() { isRegisterNo() });

    $("#result_doc_reg_1").change(function() { isDocYes() });
    $("#result_doc_reg_0").change(function() { isDocNo() });

    $("#result_used_infomat_1").change(function() { isInfomatYes() });
    $("#result_used_infomat_0").change(function() { isInfomatNo() });

    $("#result_info_pat_1").change(function() { isInfoYes() });
    $("#result_info_pat_0").change(function() { isInfoNo() });

    $("#manual-link").click(function() { $(".manual").toggle('slow') });
    $("#close-manual-button").click(function() { $(".manual").hide() });

    $("#close-warning-button").click(function() { $(".alert-block").hide() });

    $(".sender").hover(
        function() { $(this).siblings(".detail").fadeIn('fast'); }, 
        function() { $(this).siblings(".detail").fadeOut('fast'); }
    );

    $("a#modal-sender").click(function() {
        var url_path = '/pages/get_comments?id=' + $(this).parent().siblings(".org_num").text();
        $.ajax({
            url: url_path,
            dataType: "text",
            success: function(data) { dataPage = data; $("#modalComments div").html(data); }
        }).done(function() {
            console.log($("#modalComments div").html());
            $("#modalComments").modal('show'); 
        });
    });
    $("#close-modal").click(function() { $("#modalComments").modal('hide'); }); 
    $("#modalComments").on('hidden', function() { $("#modalComments div").html(); });

    $(".head-row").each(function() {
        if (!$(this).hasClass('active')) {
            $(this).next().find(".wrapper").slideUp();
            $(this).find(".toggler").html('<i class="icon-chevron-down"></i>');
        };

        var activetoggler;
        $(this).find(".toggler").click(function() { 
            activetoggler = $(this)
            $(this).parents("tr").next().find(".wrapper").toggle(0);
            $(this).parents("tr").next().find(".wrapper").each(function() {
                if ($(this).is(":hidden")) {
                    activetoggler.html('<i class="icon-chevron-down"></i>');
                } else {
                    activetoggler.html('<i class="icon-chevron-up"></i>');
                };
            });
        });
    });

    $("#body-wrapper").css('padding-top', $("#head-wrapper").height());

    $(window).resize(function() {
        centringLogin();
        $("#body-wrapper").css('padding-top', $("#head-wrapper").height());
    });

    $("#date-tooltip").tooltip();

    $("#date-dropdown").css( "right", "-" + ($("#date-dropdown").width() - 10) + "px" );
});
