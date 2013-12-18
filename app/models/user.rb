class User < ActiveRecord::Base
  has_secure_password validations: false

  has_many :user_goals
  has_many :goals, through: :user_goals

  validates :password, presence: true, length: { minimum: 5 }
  validates :email, presence: true,
                    uniqueness: true

end
