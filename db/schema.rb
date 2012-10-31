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

ActiveRecord::Schema.define(:version => 20121030154208) do

  create_table "achievements", :force => true do |t|
    t.integer  "achievement_id"
    t.integer  "user_id"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "answers", :force => true do |t|
    t.integer  "question_id"
    t.string   "content"
    t.boolean  "is_correct",  :default => false
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  create_table "comments", :force => true do |t|
    t.integer  "question_id"
    t.integer  "fact_id"
    t.integer  "user_id"
    t.text     "content"
    t.integer  "votes",       :default => 0
    t.string   "ancestry"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
    t.integer  "score",       :default => 0
  end

  create_table "facts", :force => true do |t|
    t.integer  "issue_id"
    t.integer  "question_id"
    t.string   "title"
    t.text     "description"
    t.integer  "user_id"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
    t.integer  "edit_id"
    t.integer  "score",       :default => 0
  end

  create_table "fedits", :force => true do |t|
    t.integer  "issue_id"
    t.integer  "question_id"
    t.integer  "fact_id"
    t.string   "title"
    t.text     "description"
    t.text     "urls"
    t.integer  "user_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "issues", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.string   "thumbnail"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
    t.integer  "score",       :default => 0
  end

  create_table "privileges", :force => true do |t|
    t.integer  "privilege_id"
    t.integer  "user_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "quedits", :force => true do |t|
    t.integer  "issue_id"
    t.integer  "question_id"
    t.string   "title"
    t.text     "description"
    t.integer  "user_id"
    t.string   "category"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "questions", :force => true do |t|
    t.integer  "issue_id"
    t.string   "title"
    t.integer  "user_id"
    t.string   "category"
    t.boolean  "has_quiz",   :default => false
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.integer  "edit_id"
    t.integer  "score",      :default => 0
  end

  create_table "reputations", :force => true do |t|
    t.integer  "issue_id"
    t.integer  "user_id"
    t.integer  "rep",        :default => 0
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "sources", :force => true do |t|
    t.integer  "fact_id"
    t.text     "url"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "tasks", :force => true do |t|
    t.integer  "question_id"
    t.integer  "user_id"
    t.boolean  "is_quiz",     :default => false
    t.integer  "answer_id"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "provider"
    t.string   "uid"
    t.string   "token"
    t.boolean  "is_temp_user", :default => true
    t.integer  "rep",          :default => 0
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  create_table "votes", :force => true do |t|
    t.integer  "question_id"
    t.integer  "fact_id"
    t.integer  "comment_id"
    t.integer  "value"
    t.integer  "user_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

end
