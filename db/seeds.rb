# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
goals = [ "Lose Weight", "Travel More", "Find a Girlfriend", "Graduate College" ]


goals.each do |key|
  Goal.create!(ind_goal: key)
end

User.create!(email: "adam@adam.com", password: "123456")