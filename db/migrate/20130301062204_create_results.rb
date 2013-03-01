class CreateResults < ActiveRecord::Migration
    def up
        create_table :results do |t|
            t.integer :used_term
            t.text :used_term_reason
            t.integer :emk_term
            t.integer :mis_inet
            t.text :mis_emk_reason
            t.integer :register
            t.text :register_reason
            t.integer :records_reg
            t.integer :records_infomat
            t.integer :record_inet
            t.integer :doc_reg
            t.text :doc_reg_reason
            t.integer :used_infomat
            t.text :used_infomat_reason
            t.integer :info_pat
            t.text :info_pat_reason
            t.text :comments
            t.string :fio
            t.string :phone

            t.timestamps
        end
    end

    def down
        drop_table :results
    end
end
