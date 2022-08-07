# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


puts "Seeding Data ..."

# Helper functions
def open_asset(file_name)
  File.open(Rails.root.join('db', 'seed_assets', file_name))
end

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

# Let's do this ...

puts "Finding or Creating initial users ..."

u = User.create!({
  first_name: "Jojo",
  last_name: "Pinto",
  username: "jojo",
  email: "jopinto@hotmail.com",
  avatar_url: open_asset('jojo.png'),
  age: 30,
  weight_kg: 70,
  height_cm: 175,
  city: 'Vancouver',
  province: 'BC',
  country: 'Canada',
  is_admin: true,
  message: "this is 'get' from test user: Jojo",
  password: "1234",
  password_confirmation: "1234"
})


puts "Done!"