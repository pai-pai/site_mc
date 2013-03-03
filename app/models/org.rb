class Org < ActiveRecord::Base
    attr_accessible :infomat, :name, :register, :term

    validates_presence_of :infomat, :name, :register, :term

    has_many :results, :dependent => :destroy

    def has_filled_forms?
        if Result.find_by_org_id(self.id)
            return true
        end
    end
end
