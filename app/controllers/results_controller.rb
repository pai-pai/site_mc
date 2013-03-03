class ResultsController < ApplicationController
    def index
        @results = Result.all
    end

    def new
        @result = Result.new
    end

    def create
        @result = Result.new(params[:result])
        if @result.save
            redirect_to success_path
        elsif params[:cancel_button]
            redirect_to root_path
        else
            render :new
        end
    end

    def show
        @result = Result.find(params[:id])
    end

    def get_terminals
        val = Org.find(params[:org_id])
        render :partial => "about_org", :locals => { :term_count => val.term,
                                                     :infomat_count => val.infomat,
                                                     :register_count => val.register }
    end
end
