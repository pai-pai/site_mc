class AddFieldsToResults < ActiveRecord::Migration
    def up
        add_column :results, :cod_date_term, :string
        add_column :results, :workers_term, :integer
        add_column :results, :workers_term_reason, :text
    end

    def down
        remove_column :results, :cod_date_term
        remove_column :results, :workers_term
        remove_column :results, :workers_term_reason
    end
end
