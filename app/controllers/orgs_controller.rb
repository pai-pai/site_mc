class OrgsController < ApplicationController
    def index
    end

    def show
        @org = Org.find(params[:id])
        @result = @org.results.find(params[:result_id])
    end
end
