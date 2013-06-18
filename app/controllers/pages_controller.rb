class PagesController < ApplicationController
    require "csv"

    caches_action :dashboard, :layout => false

    before_filter :autorization_check, :only => [ :statistic, :dashboard ]
    before_filter :find_orgs

    def success
        @active_result = session[:active_result]
        @active_result ? @title = t("shared.pages.success.its_true") : @title = t("shared.pages.success.its_false")
        reset_session
    end

    def statistic
        respond_to do |format|
            format.html
            format.xls
        end
    end

    def date_report
        @orgs = Org.order("id").all
        @date = params[:date]
        @title = I18n.t('shared.pages.title_for_date') + @date.to_date.strftime("%d.%m.%Y")
        @count = Result.count('org_id', :conditions => [ "start_date = ?", params[:date] ], :distinct => true)
        respond_to do |format|
            format.html
            format.xls {
                response.headers['Content-Disposition'] = "attachment; filename=\"Report_info_#{@date.to_date.strftime("%d_%m_%Y")}.xls\""
            }
        end
    end

    def total
        @public = Object.new if params[:type]
        autorization_check if @public.blank?
        @title = I18n.t("shared.pages.title_total") + params[:date]
        @filled = Result.find_by_sql "SELECT DISTINCT org_id FROM results r WHERE r.start_date = '#{params[:date]}' ORDER BY r.org_id"
        @filled = @filled.collect { |res| res.org_id }
        @orgs = Org.find(:all, :conditions => [ "id NOT IN (?)", @filled])
    end

    def print
        @results = Result.find_by_sql "SELECT * FROM results r WHERE r.start_date='#{params[:date]}' and r.created_at=(SELECT max(r2.created_at) FROM results r2 WHERE r.org_id=r2.org_id) ORDER BY org_id"
        @title = I18n.t("shared.pages.title_print") + params[:date]
    end

    def get_comments
        val = Org.find(params[:id])
        render :text => "<h4>#{val.name}</h4><p>#{val.results.last.comments}</p>"
    end

    def get_start_val
        render :partial => "table", :locals => { :start_val => params[:start_date] }
    end

    def dashboard
    end

    private
        def find_orgs
            @orgs = Org.order("id").all
            @dates = Result.select("DISTINCT start_date").where([ "start_date >= ? AND start_date < ?", Time.new(Time.now.year, Time.now.month, 1), Time.new(Time.now.year, Time.now.month + 1, 1) ]).order("start_date")
            @grouped_dates = Result.select("DISTINCT start_date").order("start_date").collect { |i| i.start_date }.group_by { |i| i.month if not i.blank? }
            Time.now.wday >= 1 ? @active_date = (Time.now - (86400 * (Time.now.wday - 2))).to_date : @active_date = (Time.now - (86400 * (5 + Time.now.wday))).to_date
            @count = Result.count('org_id', :distinct => true)
            @title = I18n.t("shared.pages.title")
        end
end
