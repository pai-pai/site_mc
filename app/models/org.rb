class Org < ActiveRecord::Base
    attr_accessible :infomat, :name, :register, :term

    validates_presence_of :infomat, :name, :register, :term

    has_many :results, :dependent => :destroy
end
