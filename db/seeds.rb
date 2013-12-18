# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
goals = { "Health" => ["Lose Wieght","Add Muscle", "Eat Healthier"],
          "Lifstyle" => ["Meet People"]
        }


goals.each do |key, value|
  value.each do |i|
    Goal.create!(goal_category: key, ind_goal: i)
  end
end