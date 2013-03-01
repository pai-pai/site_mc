class ResultsController < ApplicationController
    def index
        @results = Result.all
    end

    def new
        @result = Result.new
    end

    def create
        @result = Result.new(params[:result])
        if params[:cancel_button] || @result.save
            redirect_to pages_success_path
        else
            render :new
        end
    end

    def show
    end

    def get_terminals
        val = params[:org_id]
    end
end
