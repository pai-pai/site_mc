class ResultsController < ApplicationController
    before_filter :start_date, :title

    def index
        @results = Result.order("id ASC").all
    end

    def new
        @result = Result.new
    end

    def create
        @result = Result.new(params[:result])
        if @result.save
            session[:active_result] = @result.id
            redirect_to success_path
        elsif params[:cancel_button]
            redirect_to root_path
        else
            render :new
        end
    end

    def show
        @result = Result.find(params[:id])
        @org = Org.find(:last, :conditions => [ "id = ?", @result.org_id ])
    end

    def get_terminals
        val = Org.find(params[:org_id])
        render :partial => "about_org", :locals => { :term_count => val.term,
                                                     :infomat_count => val.infomat,
                                                     :register_count => val.register }
    end

    def get_last_result
        result = Result.find(:last, :conditions => [ "org_id = ?", params[:org_id] ])
        render :json => result
    end

    def start_date
        date = Time.now
        if date.wday >= 1
            @start = date - (86400 * (date.wday - 2))
        else
            @start = date - (86400 * (5 + date.wday))
        end
    end

    def title
        @title = I18n.t("shared.result.title_on_date") + @start.strftime("%d.%m.%Y")
    end
end
