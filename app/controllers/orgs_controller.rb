class OrgsController < ApplicationController
    def index
    end

    def show
        @org = Org.find(params[:id])
    end
end
