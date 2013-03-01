class AddBelongsToOrgsInResults < ActiveRecord::Migration
    def up
        change_table :results do |t|
            t.belongs_to :org
        end
    end

    def down
        remove_column :results, :org_id
    end
end
