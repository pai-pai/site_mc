# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :result do
    used_term 1
    used_term_reason "MyText"
    emk_term 1
    mis_inet 1
    mis_emk_reason "MyText"
    register 1
    register_reason "MyText"
    records_reg 1
    records_infomat 1
    record_inet 1
    doc_reg 1
    doc_reg_reason "MyText"
    used_infomat 1
    used_infomat_reason "MyText"
    info_pat 1
    info_pat_reason "MyText"
    comments "MyText"
    fio "MyString"
    phone "MyString"
  end
end
