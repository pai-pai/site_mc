class CreateOrgs < ActiveRecord::Migration
    def up
        create_table :orgs do |t|
            t.string :name
            t.integer :term
            t.integer :infomat
            t.integer :register

            t.timestamps
        end
    end

    def down
        drop_table :orgs
    end
end
