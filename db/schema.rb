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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150227052344) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.string   "name"
    t.text     "deck"
    t.integer  "giant_bomb_id"
    t.string   "thumb_image"
    t.string   "medium_image"
    t.integer  "expected_release_year"
    t.integer  "expected_release_day"
    t.integer  "expected_release_month"
    t.integer  "expected_release_quarter"
    t.datetime "original_release_date"
    t.text     "platforms",                default: [],              array: true
    t.text     "developers",               default: [],              array: true
    t.text     "franchises",               default: [],              array: true
    t.text     "genres",                   default: [],              array: true
    t.text     "publishers",               default: [],              array: true
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.integer  "rating"
    t.text     "text"
    t.integer  "user_id"
    t.integer  "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "reviews", ["game_id"], name: "index_reviews_on_game_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "user_game_links", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "game_id"
    t.string   "shelf"
    t.text     "platforms",  default: [],              array: true
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "user_game_links", ["game_id"], name: "index_user_game_links_on_game_id", using: :btree
  add_index "user_game_links", ["user_id"], name: "index_user_game_links_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "reviews", "games"
  add_foreign_key "reviews", "users"
  add_foreign_key "user_game_links", "games"
  add_foreign_key "user_game_links", "users"
end
