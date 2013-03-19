class AddColumnPeriodToResults < ActiveRecord::Migration
    def up
        add_column :results, :start_date, :date
    end

    def down
        remove_column :results, :start_date
    end
end
