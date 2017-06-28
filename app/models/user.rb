class User < ActiveRecord::Base
  has_many :friendships_of_from_user, class_name: 'Friendship', foreign_key: 'from_user_id', dependent: :destroy
  has_many :friendships_of_to_user, class_name: 'Friendship', foreign_key: 'to_user_id', dependent: :destroy
  has_many :friends_of_from_user, through: :friendships_of_from_user, source: 'to_user'
  has_many :friends_of_to_user, through: :friendships_of_to_user, source: 'from_user'

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, uniqueness: true
end
