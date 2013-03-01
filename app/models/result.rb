class Result < ActiveRecord::Base
    attr_accessible :org_id, :comments, :doc_reg, :doc_reg_reason, :emk_term, :fio, :info_pat, :info_pat_reason, :mis_emk_reason, :mis_inet, :phone, :record_inet, :records_infomat, :records_reg, :register, :register_reason, :used_infomat, :used_infomat_reason, :used_term, :used_term_reason

    belongs_to :org

    validates_presence_of :org_id, :used_term, :doc_reg, :fio, :phone

    validates :used_term_reason, :presence => :true, :if => :less_term?

    validates :mis_inet, :presence => :true, :if => Proc.new { |a| a.emk_term == 0 }
    validates :mis_emk_reason, :presence => :true, :if => Proc.new { |a| a.mis_inet == 0 }

    validates :register_reason, :presence => :true, :if => Proc.new { |a| a.register == 0 }
    validates :record_inet, :records_infomat, :records_reg, :presence => :true, :if => Proc.new { |a| a.register == 1 }
    validates :record_inet, :records_infomat, :records_reg, :numericality => { :only_integer => true }, :if => Proc.new { |a| a.register == 1 }

    validates :doc_reg_reason, :presence => :true, :if => Proc.new { |a| a.doc_reg == 0 }

    validates :used_infomat_reason, :presence => :true, :if => Proc.new { |a| a.used_infomat == 0 }

    validates :info_pat_reason, :presence => :true, :if => Proc.new { |a| a.info_pat == 0 }

    validates :used_term, :numericality => { :only_integer => true }

    def less_term?
        plan_term = Org.find(self.org_id).term
        plan_term > used_term 
    end
end
