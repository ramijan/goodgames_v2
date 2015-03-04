# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


25.times do

  user = User.create(username: Faker::Internet.user_name, email: Faker::Internet.safe_email, password: 'password', password_confirmation: 'password')

  user.reviews << Review.new(game_id: 3, rating: rand(1..5), text: Faker::Lorem.paragraph)

  user.user_game_links << UserGameLink.new(game_id: 3, shelf: 'played')

end

