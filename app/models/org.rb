class Org < ActiveRecord::Base
    attr_accessible :infomat, :name, :register, :term, :area_id

    validates_presence_of :infomat, :name, :register, :term

    belongs_to :area

    has_many :results, :dependent => :destroy

    def this_date_form(this_date)
        Result.where({ :start_date => this_date }).find(:last, :conditions => [ "org_id = ?", self.id ])
    end

    def self.to_csv(options = {})
        CSV.generate(options) do |csv|
            csv << column_names
            all.each do |org|
                csv << org.attributes.values_at(*column_names)
            end
        end
    end
end
