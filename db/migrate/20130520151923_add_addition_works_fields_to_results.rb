class AddAdditionWorksFieldsToResults < ActiveRecord::Migration
    def up
        add_column :results, :addition_volokno, :integer
        add_column :results, :addition_sks, :integer
        add_column :results, :addition_other, :integer
        add_column :results, :addition_other_def, :text
        add_column :results, :step_volokno, :integer
        add_column :results, :step_volokno_other_def, :text
        add_column :results, :step_sks, :integer
        add_column :results, :step_sks_other_def, :text
    end

    def down
        remove_column :results, :addition_volokno
        remove_column :results, :addition_sks
        remove_column :results, :addition_other
        remove_column :results, :addition_other_def
        remove_column :results, :step_volokno
        remove_column :results, :step_volokno_other_def
        remove_column :results, :step_sks
        remove_column :results, :step_sks_other_def
    end
end
