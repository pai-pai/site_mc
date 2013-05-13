# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130513191528) do

  create_table "areas", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "orgs", :force => true do |t|
    t.string   "name"
    t.integer  "term"
    t.integer  "infomat"
    t.integer  "register"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "area_id"
  end

  create_table "results", :force => true do |t|
    t.integer  "used_term"
    t.text     "used_term_reason"
    t.integer  "emk_term"
    t.integer  "mis_inet"
    t.text     "mis_emk_reason"
    t.integer  "register"
    t.text     "register_reason"
    t.integer  "records_reg"
    t.integer  "records_infomat"
    t.integer  "record_inet"
    t.integer  "doc_reg"
    t.text     "doc_reg_reason"
    t.integer  "used_infomat"
    t.text     "used_infomat_reason"
    t.integer  "info_pat"
    t.text     "info_pat_reason"
    t.text     "comments"
    t.string   "fio"
    t.string   "phone"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
    t.integer  "org_id"
    t.date     "start_date"
    t.string   "cod_date_term"
    t.integer  "workers_term"
    t.text     "workers_term_reason"
    t.text     "mis_inet_reason"
  end

  create_table "types", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "password_hash"
    t.string   "remember_token"
    t.datetime "created_at",                        :null => false
    t.datetime "updated_at",                        :null => false
    t.boolean  "admin",          :default => false
  end

  add_index "users", ["email"], :name => "index_users_on_email"
  add_index "users", ["remember_token"], :name => "index_users_on_remember_token"

end
