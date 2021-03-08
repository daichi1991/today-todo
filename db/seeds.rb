# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
3.times do |n|
    user = User.new(
        name:"testユーザー_#{n}",
        email:"test-#{n}@testmail.com",
    )
    user.boards.build(
        name:"ToDo",
        position: 1,
    )
    user.boards.build(
        name:"Doing",
        position: 2,
    )
    user.boards.build(
        name:"Done",
        position: 3,
    )

    user.save!
end
