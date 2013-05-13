class AddMisInetReasonToResults < ActiveRecord::Migration
    def up
        add_column :results, :mis_inet_reason, :text
    end

    def down
        remove_column :results, :mis_inet_reason
    end
end
