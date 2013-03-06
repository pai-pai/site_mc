class PagesController < ApplicationController
    require "csv"

    before_filter :find_orgs

    def success
    end

    def statistic
        respond_to do |format|
            format.html
            format.xls
        end
    end

    def total
    end

    def stat_terminals
    end

    def stat_emk
    end

    def stat_register
    end

    def stat_docreg
    end

    def stat_infomat
    end

    def stat_infostand
    end

    def comments
    end

    def print
    end

    def get_comments
        val = Org.find(params[:id])
        render :text => "<h4>#{val.name}</h4><p>#{val.results.last.comments}</p>"
    end

    private
        def find_orgs
            @orgs = Org.order("id ASC").all
            @count = Result.count('org_id', :distinct => true)
        end
end
