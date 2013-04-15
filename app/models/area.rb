class Area < ActiveRecord::Base
    attr_accessible :name

    has_many :orgs

    def sort_orgs
        self.orgs.order("id")
    end
end
