class AddReferencesToOrgs < ActiveRecord::Migration
    def up
        change_table :orgs do |t|
            t.references :area
        end
    end

    def down
        change_table :orgs do |t|
            t.remove_references :area
        end
    end
end
