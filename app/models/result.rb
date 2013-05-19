class Result < ActiveRecord::Base
    attr_accessible :org_id, :comments, :doc_reg, :doc_reg_reason, :emk_term, :fio, :info_pat, :info_pat_reason, :mis_emk_reason, :mis_inet, :phone, :record_inet, :records_infomat, :records_reg, :register, :register_reason, :used_infomat, :used_infomat_reason, :used_term, :used_term_reason, :start_date, :cod_date_term, :workers_term, :workers_term_reason, :mis_inet_reason

    belongs_to :org

    date_regex = /^(0?[1-9]|[12][0-9]|3[01])[\.](0?[1-9]|1[012])[\.](2013)$/

    validates_presence_of :org_id, :used_term, :doc_reg, :fio, :phone

    validates :used_term_reason, :presence => :true, :if => :less_term?
    validates :cod_date_term, :presence => :true, :if => :less_term?
    validates :cod_date_term, :format => { :with => date_regex, :message => ":#{I18n.t("activerecord.attributes.result.cod_date_term_format")}" }, :if => :less_term?
    validate :not_in_interval, :on => :create, :if => Proc.new { |a| !a.cod_date_term.blank? && date_regex =~ a.cod_date_term }

    validates :workers_term, :numericality => { :only_integer => true }, :presence => :true, :if => Proc.new { |a| !a.used_term.blank? && a.used_term > 0 }
    validates :workers_term_reason, :presence => :true, :if => Proc.new { |a| !a.used_term.blank? && !a.workers_term.blank? && a.used_term > a.workers_term }

    validates :emk_term, :presence => :true, :if => Proc.new { |a| Org.find(a.org_id).register == 1 }
    validates :mis_inet, :presence => :true, :if => Proc.new { |a| a.emk_term == 0 }
    validates :mis_inet_reason, :presence => :true, :if => Proc.new { |a| a.mis_inet == 1 && a.emk_term == 0 }
    validates :mis_emk_reason, :presence => :true, :if => Proc.new { |a| a.mis_inet == 0 && a.emk_term == 0 }

    validates :register, :presence => :true, :if => Proc.new { |a| Org.find(a.org_id).register == 1 }
    validates :register_reason, :presence => :true, :if => Proc.new { |a| a.register == 0 }
    validates :record_inet, :presence => :true, :if => Proc.new { |a| a.register == 1 }
    validates :record_inet, :numericality => { :only_integer => true }, :if => Proc.new { |a| a.register == 1 }

    validates :doc_reg_reason, :presence => :true, :if => Proc.new { |a| a.doc_reg == 0 }

    validates :used_infomat, :presence => :true, :if => Proc.new { |a| Org.find(a.org_id).infomat == 1 }
    validates :used_infomat_reason, :presence => :true, :if => Proc.new { |a| a.used_infomat == 0 }

    validates :info_pat, :presence => :true, :if => Proc.new { |a| Org.find(a.org_id).register == 1 }
    validates :info_pat_reason, :presence => :true, :if => Proc.new { |a| a.info_pat == 0 }

    validates :used_term, :numericality => { :only_integer => true }

    def less_term?
        plan_term = Org.find(self.org_id).term
        if used_term.blank?
            return false
        elsif plan_term > used_term
            return true
        else
            return false
        end
    end

    def not_in_interval
        date_s = self.cod_date_term.split('.')
        date_t = Time.new(date_s[2], date_s[1], date_s[0], 00, 00, 0, "+04:00")
        last_day = Time.new(2013, 12, 31, 00, 00, 0, "+04:00")
        if date_t <= Time.zone.today || date_t > last_day
            errors.add(:cod_date_term, ":#{I18n.t("activerecord.attributes.result.cod_date_term_period")}")
        end
    end

    def self.this_date_forms(this_date)
        self.find(:all, :conditions => [ "start_date = ?", this_date ])
    end

    def self.this_date_forms_count(this_date)
        self.count(:org_id, :conditions => [ "start_date = ?", this_date ], :distinct => true)
    end

    def self.get_form_with_phone(id)
        self.find(:last, :conditions => [ "fio <> '' AND org_id = ?", id ])
    end
end
