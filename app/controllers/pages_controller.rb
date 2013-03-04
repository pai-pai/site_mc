class PagesController < ApplicationController
    before_filter :find_orgs

    def success
    end

    def statistic
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

    private
        def find_orgs
            @orgs = Org.all
        end
end
