class PagesController < ApplicationController
    require "csv"

    before_filter :find_orgs, :only => [:statistic, :total]

    def success
    end

    def statistic
        respond_to do |format|
            format.html
            format.xls
        end
    end

    def statistic_for_day
        @orgs = Org.order("id ASC").all
        @count = Result.this_date_forms(params[:date]).count('org_id', :distinct => true)
        @start_dates = Result.find(:all, :group => 'start_date')
        respond_to do |format|
            format.html
            format.xls
        end
    end

    def total
    end

    def print
        @results = Result.order("org_id ASC").where([ "start_date = ?", params[:date] ])
    end

    def get_comments
        val = Org.find(params[:id])
        render :text => "<h4>#{val.name}</h4><p>#{val.results.last.comments}</p>"
    end

    def get_start_val
        render :partial => "table", :locals => { :start_val => params[:start_date] }
    end

    private
        def find_orgs
            @orgs = Org.order("id ASC").all
            @dates = Result.find(:all, :conditions => [ "start_date >= ? AND start_date < ?", Time.new(Time.now.year, Time.now.month, 1), Time.new(Time.now.year, Time.now.month + 1, 1) ], :group => 'start_date')
            @dates_to_select = Result.find(:all, :group => 'start_date')
            Time.now.wday >= 1 ? @active_date = (Time.now - (86400 * (Time.now.wday - 2))).to_date : @active_date = (Time.now - (86400 * (5 + Time.now.wday))).to_date
            @grouped = Result.all.group_by { |res| @dates }
            @count = Result.count('org_id', :distinct => true)
        end
end
